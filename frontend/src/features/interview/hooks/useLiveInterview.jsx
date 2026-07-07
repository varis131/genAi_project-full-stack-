import { useState } from "react";
import { startLiveInterview, submitInterviewAnswer } from "../services/interviewSession.api";

export const useLiveInterview = () => {
  const [sessionId, setSessionId] = useState(null);
  const [transcript, setTranscript] = useState([]); // [{question, type, answer, score, feedback}]
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [progress, setProgress] = useState({ number: 0, total: 5 });
  const [status, setStatus] = useState("idle"); // idle | asking | evaluating | completed
  const [finalReport, setFinalReport] = useState(null);
  const [error, setError] = useState(null);

  const start = async (interviewReportId) => {
    setStatus("evaluating");
    setError(null);
    try {
      const data = await startLiveInterview(interviewReportId);
      setSessionId(data.sessionId);
      setCurrentQuestion({ question: data.question, type: data.type });
      setProgress({ number: data.questionNumber, total: data.total });
      setStatus("asking");
    } catch (err) {
      console.error("Error starting live interview:", err);
      setError("Could not start the interview. Please try again.");
      setStatus("idle");
    }
  };

  const submitAnswer = async (answer) => {
    setStatus("evaluating");
    setError(null);
    try {
      const data = await submitInterviewAnswer(sessionId, answer);

      setTranscript((prev) => [
        ...prev,
        {
          ...currentQuestion,
          answer,
          score: data.currentTurnFeedback.score,
          feedback: data.currentTurnFeedback.feedback,
        },
      ]);

      if (data.done) {
        setFinalReport(data.finalReport);
        setCurrentQuestion(null);
        setStatus("completed");
      } else {
        setCurrentQuestion({ question: data.question, type: data.type });
        setProgress({ number: data.questionNumber, total: data.total });
        setStatus("asking");
      }
    } catch (err) {
      console.error("Error submitting answer:", err);
      setError("Could not submit your answer. Please try again.");
      setStatus("asking");
    }
  };

  return {
    start,
    submitAnswer,
    sessionId,
    transcript,
    currentQuestion,
    progress,
    status,
    finalReport,
    error,
  };
};
