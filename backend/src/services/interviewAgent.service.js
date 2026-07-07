const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

async function parseJsonFromResponse(response) {
  let text = typeof response.text === "function" ? await response.text() : response.text;

  if (!text) {
    throw new Error("Empty response from model");
  }

  let trimmed = text.trim();

  // Handle ```json ... ``` style code fences if the model ever uses them
  if (trimmed.startsWith("```")) {
    const firstNewline = trimmed.indexOf("\n");
    if (firstNewline !== -1) {
      trimmed = trimmed.slice(firstNewline + 1);
    }
    if (trimmed.endsWith("```")) {
      trimmed = trimmed.slice(0, -3);
    }
    trimmed = trimmed.trim();
  }

  return JSON.parse(trimmed);
}

/**
 * Picks the most relevant *unasked* question from the report's existing question pool,
 * grounded in resume + job description.
 */
async function pickNextQuestion({
  resume,
  jobDescription,
  technicalQuestions,
  behavioralQuestions,
  askedQuestions,
}) {
  const pool = [
    ...technicalQuestions.map((q) => ({ ...q, type: "technical" })),
    ...behavioralQuestions.map((q) => ({ ...q, type: "behavioral" })),
  ].filter((q) => !askedQuestions.includes(q.question));

  if (pool.length === 0) return null;

  const schema = z.object({
    question: z.string(),
    type: z.enum(["technical", "behavioral"]),
  });

  const prompt = `You are conducting a live mock interview.
Resume: """${resume}"""
Job description: """${jobDescription}"""
Already asked: ${JSON.stringify(askedQuestions)}
Candidate question pool (pick ONE, don't invent new ones): ${JSON.stringify(
    pool.map((q) => ({ question: q.question, type: q.type })),
  )}

Pick whichever question makes the most natural next step in a real interview (mix technical/behavioral where possible, don't ask two technical questions back to back if avoidable).
Return ONLY JSON: { "question": "...", "type": "technical" | "behavioral" }`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return schema.parse(await parseJsonFromResponse(response));
}

/**
 * Evaluates a candidate's answer to a question and returns a score + feedback.
 */
async function evaluateAnswer({ question, answer, resume, jobDescription }) {
  const schema = z.object({
    score: z.number().min(0).max(10),
    feedback: z.string().describe("One or two sentences, specific and actionable"),
  });

  const prompt = `Question asked: "${question}"
Candidate's answer: """${answer}"""
Resume context: """${resume}"""
Job description: """${jobDescription}"""

Score the answer 0-10 on correctness, structure, and relevance to the role. Give short, specific feedback (what was good, what to fix — no generic praise).
Return ONLY JSON: { "score": 7, "feedback": "..." }`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return schema.parse(await parseJsonFromResponse(response));
}

/**
 * Generates a final interview report after all turns are complete.
 */
async function generateFinalReport({ turns, resume, jobDescription }) {
  const schema = z.object({
    overallScore: z.number().min(0).max(10),
    strengths: z.array(z.string()).min(1),
    weaknesses: z.array(z.string()).min(1),
    summary: z.string(),
  });

  const transcript = turns
    .map(
      (t, i) =>
        `Q${i + 1} (${t.type}): ${t.question}\nAnswer: ${t.answer}\nScore: ${t.score}/10 — ${t.feedback}`,
    )
    .join("\n\n");

  const prompt = `Here is a full mock interview transcript with per-question scores:
"""${transcript}"""
Job description: """${jobDescription}"""

Write a final interview report: overall score (avg-weighted, your judgement), 2-4 concrete strengths, 2-4 concrete weaknesses, and a short summary paragraph (3-4 sentences) on interview readiness.
Return ONLY JSON: { "overallScore": 7.2, "strengths": [...], "weaknesses": [...], "summary": "..." }`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return schema.parse(await parseJsonFromResponse(response));
}

module.exports = { pickNextQuestion, evaluateAnswer, generateFinalReport };
