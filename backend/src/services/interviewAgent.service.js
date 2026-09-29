const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { z } = require("zod");

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

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
    question: z.string().describe("The selected question from the candidate question pool"),
    type: z.enum(["technical", "behavioral"]).describe("Whether the question is technical or behavioral"),
  });

  const prompt = `You are conducting a live mock interview.
Resume: """${resume}"""
Job description: """${jobDescription}"""
Already asked: ${JSON.stringify(askedQuestions)}
Candidate question pool (pick ONE, don't invent new ones): ${JSON.stringify(
    pool.map((q) => ({ question: q.question, type: q.type })),
  )}

Pick whichever question makes the most natural next step in a real interview (mix technical/behavioral where possible, don't ask two technical questions back to back if avoidable).`;

  const structuredModel = model.withStructuredOutput(schema);
  return await structuredModel.invoke(prompt);
}

/**
 * Evaluates a candidate's answer to a question and returns a score + feedback.
 */
async function evaluateAnswer({ question, answer, resume, jobDescription }) {
  const schema = z.object({
    score: z.number().min(0).max(10).describe("Score between 0 and 10 based on correctness and clarity"),
    feedback: z
      .string()
      .describe("One or two sentences, specific and actionable"),
  });

  const prompt = `Question asked: "${question}"
Candidate's answer: """${answer}"""
Resume context: """${resume}"""
Job description: """${jobDescription}"""

Score the answer 0-10 on correctness, structure, and relevance to the role. Give short, specific feedback (what was good, what to fix — no generic praise).`;

  const structuredModel = model.withStructuredOutput(schema);
  return await structuredModel.invoke(prompt);
}

/**
 * Generates a final interview report after all turns are complete.
 */
async function generateFinalReport({ turns, resume, jobDescription }) {
  const schema = z.object({
    overallScore: z.number().min(0).max(10).describe("Overall average-weighted score between 0 and 10"),
    strengths: z.array(z.string()).min(1).describe("2-4 concrete strengths observed during the interview"),
    weaknesses: z.array(z.string()).min(1).describe("2-4 concrete weaknesses observed during the interview"),
    summary: z.string().describe("Short summary paragraph (3-4 sentences) on candidate's interview readiness"),
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
Candidate resume: """${resume}"""

Write a final interview report: overall score (avg-weighted, your judgement), 2-4 concrete strengths, 2-4 concrete weaknesses, and a short summary paragraph (3-4 sentences) on interview readiness.`;

  const structuredModel = model.withStructuredOutput(schema);
  return await structuredModel.invoke(prompt);
}

module.exports = { pickNextQuestion, evaluateAnswer, generateFinalReport };
