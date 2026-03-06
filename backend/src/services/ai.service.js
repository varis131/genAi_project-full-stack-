const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question that can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).min(1).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question that can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).min(1).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).min(1).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).min(1).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

async function parseJsonFromResponse(response) {
    let text = typeof response.text === "function" ? await response.text() : response.text

    if (!text) {
        throw new Error("Empty response from model")
    }

    let trimmed = text.trim()

    // Handle ```json ... ``` style code fences if the model ever uses them
    if (trimmed.startsWith("```")) {
        const firstNewline = trimmed.indexOf("\n")
        if (firstNewline !== -1) {
            trimmed = trimmed.slice(firstNewline + 1)
        }
        if (trimmed.endsWith("```")) {
            trimmed = trimmed.slice(0, -3)
        }
        trimmed = trimmed.trim()
    }

    return JSON.parse(trimmed)
}

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `You are an expert technical interviewer and career coach.
Using ONLY the information below, generate a JSON interview report.

Candidate resume:
"""${resume}"""

Self description:
"""${selfDescription}"""

Job description:
"""${jobDescription}"""

The JSON MUST strictly follow this structure (field names and types):

{
  "matchScore": 88, // number between 0 and 100
  "technicalQuestions": [
    {
      "question": "Explain the concept of reconciliation in React and how the Virtual DOM facilitates this process.",
      "intention": "To assess the candidate's understanding of React's internal rendering mechanism and performance optimization strategies.",
      "answer": "A strong answer should explain that reconciliation is the algorithm React uses to diff the virtual DOM with the real DOM, updating only the necessary parts to ensure high performance, and describe how keys help React identify elements."
    }
  ],
  "behavioralQuestions": [
    {
      "question": "Tell me about a time you had to quickly learn a new technology to deliver a project.",
      "intention": "To evaluate adaptability, learning ability, and ownership.",
      "answer": "A strong answer should be structured using STAR (Situation, Task, Action, Result), clearly explaining what was learned, how, and the positive impact on the project."
    }
  ],
  "skillGaps": [
    {
      "skill": "System design for large-scale distributed systems",
      "severity": "high"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "Review core JavaScript and asynchronous programming concepts",
      "tasks": [
        "Revise closures, promises, async/await, and the event loop",
        "Solve 10 medium-level JavaScript coding problems"
      ]
    }
  ],
  "title": "Full Stack Developer"
}

Generation rules:
- Fill ALL fields with concrete, helpful content based on the resume and job description.
- Every item in "technicalQuestions" and "behavioralQuestions" MUST include a detailed "intention" and a practical, step-by-step "answer".
- Always infer a meaningful "title" from the job description.
- Do NOT add any extra fields or text outside the JSON.`

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    })

    const parsed = await parseJsonFromResponse(response)

    return interviewReportSchema.parse(parsed)
}

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4", margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    })

    await browser.close()

    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.

                        Return ONLY valid JSON with this exact structure:
                        {
                          "html": "<!doctype html>...."
                        }
                    `

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    })

    const parsed = await parseJsonFromResponse(response)

    const jsonContent = resumePdfSchema.parse(parsed)

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer

}

module.exports = { generateInterviewReport, generateResumePdf }
