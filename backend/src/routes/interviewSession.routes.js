const express = require("express");
const authUser = require("../middlewares/auth.middleware");
const {
  startInterviewController,
  submitAnswerController,
  getSessionByIdController,
  getAllSessionsController,
} = require("../controllers/interviewSession.controller");

const router = express.Router();

/**
 * @route POST /api/interview-session/:interviewReportId/start
 * @description Start a new live interview session based on an existing report.
 * @access private
 */
router.post("/:interviewReportId/start", authUser, startInterviewController);

/**
 * @route POST /api/interview-session/:sessionId/answer
 * @description Submit an answer for the current question in a session.
 * @access private
 */
router.post("/:sessionId/answer", authUser, submitAnswerController);

/**
 * @route GET /api/interview-session/
 * @description Get all interview sessions of the logged-in user.
 * @access private
 */
router.get("/", authUser, getAllSessionsController);

/**
 * @route GET /api/interview-session/:sessionId
 * @description Get a single interview session (with final report if completed).
 * @access private
 */
router.get("/:sessionId", authUser, getSessionByIdController);

module.exports = router;
