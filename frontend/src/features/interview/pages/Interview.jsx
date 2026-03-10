import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useInterview } from "../hooks/useInterview";

const Interview = () => {
  const { interviewId } = useParams();

  const { report, loading, getReportById, downloadResumePdf } = useInterview();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black">
        <div className="flex flex-col items-center gap-4 text-white">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg">Generating Interview Report...</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        No report found
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-black via-slate-900 to-black px-6 py-10">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* LEFT SIDE QUESTIONS */}
        <div className="lg:col-span-2 space-y-8">
          {/* Technical Questions */}

          <div>
            <h2 className="text-2xl font-bold mb-4 text-pink-400">
              Technical Questions
            </h2>

            {report.technicalQuestions.map((q, i) => (
              <div
                key={i}
                className="bg-slate-900/60 backdrop-blur-lg border border-white/10 p-5 rounded-xl mb-4 hover:border-pink-500 transition"
              >
                <p className="font-semibold text-lg">
                  {i + 1}. {q.question}
                </p>

                <p className="text-sm text-gray-400 mt-2">{q.intention}</p>
              </div>
            ))}
          </div>

          {/* Behavioral Questions */}

          <div>
            <h2 className="text-2xl font-bold mb-4 text-purple-400">
              Behavioral Questions
            </h2>

            {report.behavioralQuestions.map((q, i) => (
              <div
                key={i}
                className="bg-slate-900/60 backdrop-blur-lg border border-white/10 p-5 rounded-xl mb-4 hover:border-purple-500 transition"
              >
                <p className="font-semibold text-lg">
                  {i + 1}. {q.question}
                </p>

                <p className="text-sm text-gray-400 mt-2">{q.intention}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE PANEL */}

        <div className="space-y-6">
          {/* MATCH SCORE CARD */}

          <div className="bg-slate-900/70 border border-white/10 rounded-xl p-6 text-center">
            <h3 className="text-sm uppercase text-gray-400 tracking-widest">
              Match Score
            </h3>

            <div className="mt-4 flex justify-center">
              <div className="w-32 h-32 rounded-full flex items-center justify-center bg-gradient-to-br from-green-400/20 to-green-600/10 border border-green-400 shadow-lg">
                <span className="text-4xl font-bold text-green-400">
                  {report.matchScore}
                </span>
              </div>
            </div>

            
          </div>

          {/* SKILL GAPS */}

          <div className="bg-slate-900/70 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">
              Skill Gaps
            </h3>

            {report.skillGaps.map((gap, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-black/40 rounded-lg px-4 py-3 mb-2"
              >
                <span className="text-sm">{gap.skill}</span>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    gap.severity === "high"
                      ? "bg-red-500/20 text-red-400"
                      : gap.severity === "medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {gap.severity}
                </span>
              </div>
            ))}
          </div>

          {/* DOWNLOAD BUTTON */}

          <button
            onClick={() => downloadResumePdf(report._id)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 font-semibold hover:opacity-90 transition"
          >
            Download Resume PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Interview;
