import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useInterview } from "../hooks/useInterview";
import { Code2, MessageSquare, Send } from "lucide-react";

const Interview = () => {
  const { interviewId } = useParams();
  const { report, loading, getReportById, downloadResumePdf } = useInterview();

  const [activeSection, setActiveSection] = useState("technical");
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0f19]">
        <div className="flex flex-col items-center gap-4 text-white">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          <p>Generating Interview Report...</p>
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

  //match score calculation
  const getMatchMessage = (score) => {
    if (score < 50) {
      return {
        text: "Low match for this role",
        color: "text-red-400",
        border: "border-red-500",
      };
    }

    if (score < 70) {
      return {
        text: "Moderate match for this role",
        color: "text-yellow-400",
        border: "border-yellow-500",
      };
    }

    if (score < 90) {
      return {
        text: "Strong match for this role",
        color: "text-green-400",
        border: "border-green-500",
      };
    }

    return {
      text: "Excellent match for this role",
      color: "text-emerald-400",
      border: "border-emerald-500",
    };
  };

  const match = getMatchMessage(report.matchScore);

  return (
    <div className="h-screen bg-[#0b0f19] text-white px-6 py-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-8 h-full">
        {/* SIDEBAR */}
        <div className="bg-[#111827] border border-white/10 rounded-xl p-6 flex flex-col">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-6">
            Sections
          </p>

          <div className="space-y-2">
            <button
              onClick={() => setActiveSection("technical")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeSection === "technical"
                  ? "bg-pink-500/20 text-pink-400"
                  : "text-gray-300 hover:bg-white/5"
              }`}
            >
              <Code2 size={18} />
              Technical Questions
            </button>

            <button
              onClick={() => setActiveSection("behavioral")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeSection === "behavioral"
                  ? "bg-pink-500/20 text-pink-400"
                  : "text-gray-300 hover:bg-white/5"
              }`}
            >
              <MessageSquare size={18} />
              Behavioral Questions
            </button>

            <button
              onClick={() => setActiveSection("roadmap")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeSection === "roadmap"
                  ? "bg-pink-500/20 text-pink-400"
                  : "text-gray-300 hover:bg-white/5"
              }`}
            >
              <Send size={18} />
              Road Map
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="lg:col-span-2 overflow-y-auto no-scrollbar pr-2 space-y-6">
          {/* TECHNICAL QUESTIONS */}
          {activeSection === "technical" && (
            <>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                Technical Questions
                <span className="text-xs bg-white/10 px-3 py-1 rounded">
                  {report.technicalQuestions.length} questions
                </span>
              </h2>

              {report.technicalQuestions.map((q, i) => (
                <div
                  key={i}
                  className="bg-[#111827] border border-white/10 rounded-xl"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full text-left p-5 flex justify-between items-start"
                  >
                    <div className="flex items-start gap-3">
                      <span className="bg-pink-500/20 text-pink-400 text-xs font-bold px-3 py-1 rounded">
                        Q{i + 1}
                      </span>

                      <span className="font-medium leading-relaxed">
                        {q.question}
                      </span>
                    </div>

                    <span className="text-gray-400">
                      {openIndex === i ? "-" : "+"}
                    </span>
                  </button>

                  {openIndex === i && (
                    <div className="px-5 pb-5 text-sm text-gray-400">
                      <p className="mb-3">{q.intention}</p>
                      <p>{q.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {/* BEHAVIORAL QUESTIONS */}
          {activeSection === "behavioral" && (
            <>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                Behavioral Questions
                <span className="text-xs bg-white/10 px-3 py-1 rounded">
                  {report.behavioralQuestions.length} questions
                </span>
              </h2>

              {report.behavioralQuestions.map((q, i) => (
                <div
                  key={i}
                  className="bg-[#111827] border border-white/10 rounded-xl"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full text-left p-5 flex justify-between items-start"
                  >
                    <div className="flex items-start gap-3">
                      <span className="bg-purple-500/20 text-purple-400 text-xs font-bold px-3 py-1 rounded">
                        Q{i + 1}
                      </span>

                      <span className="font-medium leading-relaxed">
                        {q.question}
                      </span>
                    </div>

                    <span className="text-gray-400">
                      {openIndex === i ? "-" : "+"}
                    </span>
                  </button>

                  {openIndex === i && (
                    <div className="px-5 pb-5 text-sm text-gray-400">
                      <p className="mb-3">{q.intention}</p>
                      <p>{q.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {/* ROADMAP */}
          {activeSection === "roadmap" && (
            <>
              <h2 className="text-2xl font-bold mb-4">Preparation Roadmap</h2>

              {report.preparationPlan?.map((plan, i) => (
                <div
                  key={i}
                  className="bg-[#111827] border border-white/10 rounded-xl p-5"
                >
                  <h3 className="text-lg font-semibold text-pink-400 mb-2">
                    Day {plan.day}
                  </h3>

                  <p className="text-sm text-gray-300 mb-3">{plan.focus}</p>

                  <ul className="list-disc ml-5 text-sm text-gray-400 space-y-1">
                    {plan.tasks?.map((task, idx) => (
                      <li key={idx}>{task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="overflow-y-auto no-scrollbar space-y-6">
          {/* MATCH SCORE */}
          <div className="bg-[#111827] border border-white/10 rounded-xl p-6 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider">
              Match Score
            </p>

            <div className="mt-4 flex justify-center">
              <div
                className={`w-32 h-32 rounded-full border-4 ${match.border} flex items-center justify-center`}
              >
                <span className={`text-3xl font-bold ${match.color}`}>
                  {report.matchScore}%
                </span>
              </div>
            </div>

            <p className={`${match.color} text-sm mt-3`}>{match.text}</p>
          </div>

          {/* SKILL GAPS */}
          <div className="bg-[#111827] border border-white/10 rounded-xl p-6">
            <h3 className="text-sm uppercase text-gray-400 mb-4">Skill Gaps</h3>

            <div className="space-y-2">
              {report.skillGaps.map((gap, i) => (
                <div
                  key={i}
                  className="px-3 py-2 rounded-lg bg-black/40 text-sm"
                >
                  {gap.skill}
                </div>
              ))}
            </div>
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
