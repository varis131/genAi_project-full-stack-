const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { z } = require("zod");
const puppeteer = require("puppeteer");

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

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
});

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `You are an expert technical interviewer and career coach.
Generate a comprehensive interview preparation report based on the candidate's profile and the target job description.

Candidate resume:
"""${resume}"""

Self description:
"""${selfDescription}"""

Job description:
"""${jobDescription}"""

Generation rules:
- Fill all fields with concrete, helpful content based on the resume and job description.
- For technical and behavioral questions, include clear intentions and comprehensive answer guidance.
- Infer a meaningful title from the job description.`;

    const structuredModel = model.withStructuredOutput(interviewReportSchema);
    return await structuredModel.invoke(prompt);
}

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
        ],
    });

    try {
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: "networkidle0" });

        const pdfBuffer = await page.pdf({
            format: "A4",
            margin: {
                top: "20mm",
                bottom: "20mm",
                left: "15mm",
                right: "15mm"
            }
        });

        return pdfBuffer;
    } finally {
        await browser.close();
    }
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    const resumePdfSchema = z.object({
        html: z.string().describe("The complete HTML content of the tailored resume which can be converted to PDF using puppeteer")
    });

    const prompt = `Generate a resume for a candidate with the following details:
Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience.
The HTML content should be well-formatted, structured, modern, and professional.
The content should be ATS friendly, easily parsable by ATS systems without losing important information.
The resume should be 1-2 pages long when converted to PDF.`;

    const structuredModel = model.withStructuredOutput(resumePdfSchema);
    const result = await structuredModel.invoke(prompt);

    const pdfBuffer = await generatePdfFromHtml(result.html);
    return pdfBuffer;
}

module.exports = { generateInterviewReport, generateResumePdf };
