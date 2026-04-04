import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useInterview } from "../hooks/useInterview";
import { Code2, MessageSquare, Send } from "lucide-react";

const Interview = () => {
  const { interviewId } = useParams();
  const { report, loading, getReportById, downloadResumePdf } = useInterview();

  const [activeSection, setActiveSection] = useState("technical");
  const [openIndex, setOpenIndex] = useState(null);
  const [isGeneratingResume, setIsGeneratingResume] = useState(false);

  const handleDownloadResume = async () => {
    setIsGeneratingResume(true);
    await downloadResumePdf(report._id);
    setIsGeneratingResume(false);
  };

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
    <div className="min-h-screen lg:h-[100dvh] bg-[#0b0f19] text-white px-4 sm:px-6 pt-24 pb-6 overflow-y-auto lg:overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:h-full pt-4">
        {/* SIDEBAR */}
        <div className="order-2 lg:order-1 lg:col-span-3 bg-[#111827] border border-white/10 rounded-2xl p-6 flex flex-col lg:h-full shadow-lg">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-4 lg:mb-6 hidden lg:block">
            Sections
          </p>

          <div className="flex flex-row overflow-x-auto lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 pb-2 lg:pb-0 no-scrollbar">
            <button
              onClick={() => setActiveSection("technical")}
              className={`flex items-center gap-2 lg:gap-3 px-4 py-2 lg:py-3 rounded-lg transition whitespace-nowrap ${
                activeSection === "technical"
                  ? "bg-pink-500/20 text-pink-400"
                  : "text-gray-300 hover:bg-white/5"
              }`}
            >
              <Code2 size={18} className="shrink-0" />
              Technical Questions
            </button>

            <button
              onClick={() => setActiveSection("behavioral")}
              className={`flex items-center gap-2 lg:gap-3 px-4 py-2 lg:py-3 rounded-lg transition whitespace-nowrap ${
                activeSection === "behavioral"
                  ? "bg-pink-500/20 text-pink-400"
                  : "text-gray-300 hover:bg-white/5"
              }`}
            >
              <MessageSquare size={18} className="shrink-0" />
              Behavioral Questions
            </button>

            <button
              onClick={() => setActiveSection("roadmap")}
              className={`flex items-center gap-2 lg:gap-3 px-4 py-2 lg:py-3 rounded-lg transition whitespace-nowrap ${
                activeSection === "roadmap"
                  ? "bg-pink-500/20 text-pink-400"
                  : "text-gray-300 hover:bg-white/5"
              }`}
            >
              <Send size={18} className="shrink-0" />
              Road Map
            </button>
          </div>

          {/* DOWNLOAD BUTTON */}
          <div className="mt-auto pt-6">
            <button
              onClick={handleDownloadResume}
              disabled={isGeneratingResume}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 
              font-semibold hover:opacity-90 transition flex justify-center items-center gap-2 
              disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isGeneratingResume ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Generating Resume...
                </>
              ) : (
                "Download Resume PDF"
              )}
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="order-3 lg:order-2 lg:col-span-6 overflow-y-auto no-scrollbar pr-0 lg:pr-2 space-y-6 lg:pb-10">
          {/* TECHNICAL QUESTIONS */}
          {activeSection === "technical" && (
            <>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Technical Questions
                </h2>
                <span className="text-xs font-semibold bg-pink-500/10 text-pink-400 px-3 py-1.5 rounded-full border border-pink-500/20">
                  {report.technicalQuestions.length} questions
                </span>
              </div>

              {report.technicalQuestions.map((q, i) => (
                <div
                  key={i}
                  className="bg-[#111827] border border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:border-white/20"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full text-left p-5 flex justify-between items-start gap-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-pink-500/10 text-pink-400 text-xs font-bold border border-pink-500/20">
                        Q{i + 1}
                      </span>

                      <span className="font-medium leading-relaxed text-gray-200 mt-1">
                        {q.question}
                      </span>
                    </div>

                    <span className="text-gray-400 mt-1 flex items-center justify-center w-6 h-6 rounded-full bg-white/5 shrink-0">
                      {openIndex === i ? "-" : "+"}
                    </span>
                  </button>

                  {openIndex === i && (
                    <div className="px-5 pb-5 pt-2 text-sm text-gray-400 animate-in fade-in zoom-in-95 duration-200">
                      <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                        <p className="text-gray-300 font-medium mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                          Intention
                        </p>
                        <p className="mb-4 leading-relaxed">{q.intention}</p>
                        
                        <p className="text-gray-300 font-medium mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Sample Answer
                        </p>
                        <p className="leading-relaxed">{q.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {/* BEHAVIORAL QUESTIONS */}
          {activeSection === "behavioral" && (
            <>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Behavioral Questions
                </h2>
                <span className="text-xs font-semibold bg-purple-500/10 text-purple-400 px-3 py-1.5 rounded-full border border-purple-500/20">
                  {report.behavioralQuestions.length} questions
                </span>
              </div>

              {report.behavioralQuestions.map((q, i) => (
                <div
                  key={i}
                  className="bg-[#111827] border border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:border-white/20"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full text-left p-5 flex justify-between items-start gap-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20">
                        Q{i + 1}
                      </span>

                      <span className="font-medium leading-relaxed text-gray-200 mt-1">
                        {q.question}
                      </span>
                    </div>

                    <span className="text-gray-400 mt-1 flex items-center justify-center w-6 h-6 rounded-full bg-white/5 shrink-0">
                      {openIndex === i ? "-" : "+"}
                    </span>
                  </button>

                  {openIndex === i && (
                    <div className="px-5 pb-5 pt-2 text-sm text-gray-400 animate-in fade-in zoom-in-95 duration-200">
                      <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                        <p className="text-gray-300 font-medium mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                          Intention
                        </p>
                        <p className="mb-4 leading-relaxed">{q.intention}</p>
                        
                        <p className="text-gray-300 font-medium mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Sample Answer
                        </p>
                        <p className="leading-relaxed">{q.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {/* ROADMAP */}
          {activeSection === "roadmap" && (
            <>
              <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-4">
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Preparation Roadmap
                </h2>
              </div>

              {report.preparationPlan?.map((plan, i) => (
                <div
                  key={i}
                  className="bg-[#111827] border border-white/10 rounded-2xl p-6 shadow-lg hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 p-[2px]">
                      <div className="w-full h-full bg-[#111827] rounded-full flex items-center justify-center font-bold text-white">
                        {plan.day}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                      Day {plan.day} Focus
                    </h3>
                  </div>

                  <p className="text-md text-gray-200 mb-4 bg-white/5 p-3 rounded-lg border border-white/5">{plan.focus}</p>

                  <ul className="space-y-3">
                    {plan.tasks?.map((task, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-400">
                        <span className="w-2 h-2 rounded-full bg-pink-500 mt-1.5 shrink-0"></span>
                        <span className="leading-relaxed">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="order-1 lg:order-3 lg:col-span-3 overflow-y-auto no-scrollbar space-y-4 lg:space-y-6 lg:pb-10 flex flex-col sm:flex-row lg:flex-col gap-4 sm:gap-6 lg:gap-0">
          {/* MATCH SCORE */}
          <div className="flex-1 bg-[#111827] border border-white/10 rounded-2xl p-6 text-center shadow-lg relative overflow-hidden group hover:border-white/20 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30 group-hover:opacity-100 transition-opacity"></div>
            
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-6">
              Match Score
            </p>

            <div className="flex justify-center relative">
              <div
                className={`w-36 h-36 rounded-full border-[6px] ${match.border} flex items-center justify-center relative z-10 bg-[#0b0f19] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]`}
              >
                <span className={`text-4xl font-black ${match.color} drop-shadow-md`}>
                  {report.matchScore}%
                </span>
              </div>
              <div className={`absolute inset-0 m-auto w-36 h-36 rounded-full bg-current ${match.color} blur-2xl opacity-10 animate-pulse`}></div>
            </div>

            <p className={`font-medium ${match.color} mt-6 bg-white/5 inline-block px-4 py-2 rounded-full border border-current/10`}>
              {match.text}
            </p>
          </div>

          {/* SKILL GAPS */}
          <div className="flex-1 bg-[#111827] border border-white/10 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xs uppercase text-gray-400 font-semibold mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              Skill Gaps
            </h3>

            <div className="space-y-3">
              {report.skillGaps.map((gap, i) => (
                <div
                  key={i}
                  className="px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-sm text-gray-300 hover:bg-white/10 hover:border-white/10 transition-colors cursor-default"
                >
                  {gap.skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
