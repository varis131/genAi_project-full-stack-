import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import {
  Bot,
  User,
  Send,
  Loader2,
  CheckCircle2,
  ShieldAlert,
  ClipboardCheck,
  Zap,
  Star,
} from "lucide-react";
import { useLiveInterview } from "../hooks/useLiveInterview";

const ScoreBadge = ({ score }) => {
  const color =
    score >= 8
      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
      : score >= 5
      ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
      : "text-pink-400 bg-pink-500/10 border-pink-500/20";

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${color}`}>
      <Star size={10} className="fill-current" />
      {score}/10
    </span>
  );
};

const LiveInterview = () => {
  const { interviewId } = useParams(); // this is the InterviewReport _id
  const {
    start,
    submitAnswer,
    transcript,
    currentQuestion,
    progress,
    status,
    finalReport,
    error,
  } = useLiveInterview();
  const [answer, setAnswer] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    if (interviewId) start(interviewId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interviewId]);

  // Auto-scroll to the latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript, currentQuestion, status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answer.trim() || status !== "asking") return;
    await submitAnswer(answer);
    setAnswer("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // ── COMPLETED SCREEN ──────────────────────────────────────────────────────
  if (status === "completed" && finalReport) {
    return (
      <div className="min-h-screen bg-slate-950 text-white pt-28 pb-16 px-4">
        {/* Ambient glow */}
        <div className="fixed top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-2.5 bg-indigo-500/20 rounded-xl border border-indigo-500/30">
              <ClipboardCheck className="text-indigo-400" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Interview Complete</h1>
              <p className="text-slate-400 text-sm">Here's how you performed across all 5 questions</p>
            </div>
          </div>

          {/* Score Card */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
            <p className="text-slate-400 text-sm mb-2 uppercase tracking-widest font-semibold">Overall Score</p>
            <div className="flex items-end gap-2">
              <span className="text-7xl font-black text-indigo-400 leading-none">
                {typeof finalReport.overallScore === "number"
                  ? finalReport.overallScore.toFixed(1)
                  : finalReport.overallScore}
              </span>
              <span className="text-2xl text-slate-500 mb-2">/10</span>
            </div>

            {/* Summary */}
            <p className="mt-6 text-slate-300 leading-relaxed text-sm bg-slate-950/50 rounded-2xl p-5 border border-white/5">
              {finalReport.summary}
            </p>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid sm:grid-cols-2 gap-6 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
              <h3 className="text-emerald-400 font-semibold mb-4 flex items-center gap-2 text-sm uppercase tracking-widest">
                <CheckCircle2 size={16} /> Strengths
              </h3>
              <ul className="space-y-2">
                {finalReport.strengths.map((s, i) => (
                  <li
                    key={i}
                    className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-3 text-sm text-slate-300 flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
              <h3 className="text-pink-400 font-semibold mb-4 flex items-center gap-2 text-sm uppercase tracking-widest">
                <ShieldAlert size={16} /> Areas to Improve
              </h3>
              <ul className="space-y-2">
                {finalReport.weaknesses.map((w, i) => (
                  <li
                    key={i}
                    className="bg-pink-500/5 border border-pink-500/10 rounded-xl p-3 text-sm text-slate-300 flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 shrink-0" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Transcript Review */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
            <h3 className="text-slate-300 font-semibold mb-5 flex items-center gap-2 text-sm uppercase tracking-widest">
              <Zap size={16} className="text-indigo-400" /> Question Breakdown
            </h3>
            <div className="space-y-4">
              {transcript.map((t, i) => (
                <div key={i} className="bg-slate-950/50 border border-white/5 rounded-2xl p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className="text-sm font-medium text-slate-200">{t.question}</p>
                    <ScoreBadge score={t.score} />
                  </div>
                  <p className="text-xs text-slate-400 mb-2 line-clamp-2">{t.answer}</p>
                  <p className="text-xs text-slate-500 italic">{t.feedback}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── INTERVIEW SCREEN ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-28 pb-44 px-4">
      {/* Ambient glow */}
      <div className="fixed top-[-200px] right-[-200px] w-[600px] h-[600px] bg-indigo-500/8 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Page title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-500/20 rounded-xl border border-indigo-500/30">
            <Bot size={18} className="text-indigo-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Live Mock Interview</h1>
            <p className="text-xs text-slate-500">AI-powered · Turn-based · Real-time feedback</p>
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm rounded-xl p-4 flex items-center gap-2">
            <ShieldAlert size={16} className="shrink-0" />
            {error}
          </div>
        )}

        {/* Progress bar */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700 ease-out"
              style={{ width: `${(progress.number / progress.total) * 100}%` }}
            />
          </div>
          <span className="text-xs text-slate-400 font-medium tabular-nums">
            {progress.number}/{progress.total}
          </span>
        </div>

        {/* Transcript */}
        <div className="space-y-6">
          {transcript.map((t, i) => (
            <div key={i} className="space-y-3 animate-in fade-in duration-300">
              {/* Agent question */}
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                  <Bot size={15} className="text-indigo-400" />
                </div>
                <div className="bg-slate-900/70 border border-white/10 rounded-2xl rounded-tl-sm p-4 text-sm text-slate-200 max-w-[85%] leading-relaxed shadow-sm">
                  {t.question}
                </div>
              </div>

              {/* User answer */}
              <div className="flex gap-3 items-start justify-end">
                <div className="bg-indigo-600/20 border border-indigo-500/20 rounded-2xl rounded-tr-sm p-4 text-sm text-slate-200 max-w-[85%] leading-relaxed shadow-sm">
                  {t.answer}
                </div>
                <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                  <User size={15} className="text-slate-300" />
                </div>
              </div>

              {/* Feedback row */}
              <div className="flex items-center gap-2 pl-11">
                <ScoreBadge score={t.score} />
                <p className="text-xs text-slate-500 leading-relaxed">{t.feedback}</p>
              </div>
            </div>
          ))}

          {/* Current question from agent */}
          {currentQuestion && (
            <div className="flex gap-3 items-start animate-in fade-in slide-in-from-bottom-3 duration-400">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                <Bot size={15} className="text-indigo-400" />
              </div>
              <div className="bg-slate-900/70 border border-white/10 rounded-2xl rounded-tl-sm p-4 text-sm text-slate-200 max-w-[85%] leading-relaxed shadow-sm">
                {currentQuestion.question}
                <span className={`ml-2 text-xs font-medium px-1.5 py-0.5 rounded-md ${
                  currentQuestion.type === "technical"
                    ? "bg-indigo-500/20 text-indigo-400"
                    : "bg-purple-500/20 text-purple-400"
                }`}>
                  {currentQuestion.type}
                </span>
              </div>
            </div>
          )}

          {/* Thinking indicator */}
          {status === "evaluating" && (
            <div className="flex items-center gap-2 text-slate-500 text-sm pl-11 animate-in fade-in duration-200">
              <Loader2 className="animate-spin" size={14} />
              <span>Thinking...</span>
            </div>
          )}

          {/* Initial loading */}
          {status === "idle" && (
            <div className="flex flex-col items-center justify-center py-16 gap-4 text-slate-500">
              <Loader2 className="animate-spin" size={28} />
              <p className="text-sm">Starting your interview session...</p>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Fixed answer bar */}
      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 p-4"
      >
        <div className="max-w-2xl mx-auto flex gap-3 items-end">
          <textarea
            id="live-interview-answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={status !== "asking"}
            placeholder={
              status === "evaluating"
                ? "Evaluating your answer..."
                : status === "idle"
                ? "Preparing interview..."
                : "Type your answer... (Enter to send, Shift+Enter for newline)"
            }
            rows={2}
            className="flex-1 bg-slate-900 border border-white/10 rounded-2xl p-3.5 text-sm resize-none focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 disabled:opacity-40 placeholder:text-slate-600 transition-all"
          />
          <button
            type="submit"
            id="live-interview-submit"
            disabled={status !== "asking" || !answer.trim()}
            className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed rounded-2xl px-5 py-3.5 flex items-center justify-center transition-all hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] active:scale-95"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default LiveInterview;
