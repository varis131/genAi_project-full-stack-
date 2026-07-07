const interviewReportModel = require("../models/interviewReport.model");
const interviewSessionModel = require("../models/interviewSession.model");
const {
  pickNextQuestion,
  evaluateAnswer,
  generateFinalReport,
} = require("../services/interviewAgent.service");

const MAX_QUESTIONS = 5;

/**
 * @description Starts a new live interview session based on an existing interview report.
 */
async function startInterviewController(req, res) {
  try {
    const { interviewReportId } = req.params;

    const report = await interviewReportModel.findOne({
      _id: interviewReportId,
      user: req.user.id,
    });

    if (!report) {
      return res.status(404).json({ message: "Interview report not found." });
    }

    const first = await pickNextQuestion({
      resume: report.resume,
      jobDescription: report.jobDescription,
      technicalQuestions: report.technicalQuestions,
      behavioralQuestions: report.behavioralQuestions,
      askedQuestions: [],
    });

    if (!first) {
      return res.status(400).json({ message: "No questions available in this report." });
    }

    const session = await interviewSessionModel.create({
      user: req.user.id,
      interviewReport: report._id,
      turns: [{ question: first.question, type: first.type }],
    });

    res.status(201).json({
      sessionId: session._id,
      question: first.question,
      type: first.type,
      questionNumber: 1,
      total: MAX_QUESTIONS,
    });
  } catch (error) {
    console.error("startInterviewController error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

/**
 * @description Submits an answer for the current question, scores it, and either
 * returns the next question or (on the 5th answer) generates and saves the final report.
 */
async function submitAnswerController(req, res) {
  try {
    const { sessionId } = req.params;
    const { answer } = req.body;

    const session = await interviewSessionModel
      .findOne({ _id: sessionId, user: req.user.id })
      .populate("interviewReport");

    if (!session || session.status === "completed") {
      return res.status(404).json({ message: "Session not found or already completed." });
    }

    const currentTurn = session.turns[session.turns.length - 1];
    const report = session.interviewReport;

    const { score, feedback } = await evaluateAnswer({
      question: currentTurn.question,
      answer,
      resume: report.resume,
      jobDescription: report.jobDescription,
    });

    currentTurn.answer = answer;
    currentTurn.score = score;
    currentTurn.feedback = feedback;

    if (session.turns.length >= MAX_QUESTIONS) {
      const finalReport = await generateFinalReport({
        turns: session.turns,
        resume: report.resume,
        jobDescription: report.jobDescription,
      });

      session.status = "completed";
      session.finalReport = finalReport;
      await session.save();

      return res.status(200).json({
        done: true,
        currentTurnFeedback: { score, feedback },
        finalReport,
      });
    }

    const next = await pickNextQuestion({
      resume: report.resume,
      jobDescription: report.jobDescription,
      technicalQuestions: report.technicalQuestions,
      behavioralQuestions: report.behavioralQuestions,
      askedQuestions: session.turns.map((t) => t.question),
    });

    session.turns.push({ question: next.question, type: next.type });
    await session.save();

    res.status(200).json({
      done: false,
      currentTurnFeedback: { score, feedback },
      question: next.question,
      type: next.type,
      questionNumber: session.turns.length,
      total: MAX_QUESTIONS,
    });
  } catch (error) {
    console.error("submitAnswerController error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

/**
 * @description Fetches a single interview session (including final report if completed).
 */
async function getSessionByIdController(req, res) {
  try {
    const { sessionId } = req.params;

    const session = await interviewSessionModel.findOne({
      _id: sessionId,
      user: req.user.id,
    });

    if (!session) {
      return res.status(404).json({ message: "Session not found." });
    }

    res.status(200).json({ session });
  } catch (error) {
    console.error("getSessionByIdController error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

/**
 * @description Fetches all live interview sessions of the logged-in user.
 */
async function getAllSessionsController(req, res) {
  try {
    const sessions = await interviewSessionModel
      .find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select("-turns");

    res.status(200).json({ sessions });
  } catch (error) {
    console.error("getAllSessionsController error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = {
  startInterviewController,
  submitAnswerController,
  getSessionByIdController,
  getAllSessionsController,
};
