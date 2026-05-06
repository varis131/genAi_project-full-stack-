import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useInterview } from "../hooks/useInterview";
import { Code2, MessageSquare, Send, Target, ShieldAlert, FileDown, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4 text-white">
          <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
          <p className="text-indigo-400 font-medium animate-pulse">Generating Detailed Report...</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white font-medium">
        No report found. Please try generating again.
      </div>
    );
  }

  const getMatchMessage = (score) => {
    if (score < 50) return { text: "Low match", color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" };
    if (score < 70) return { text: "Moderate match", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" };
    if (score < 90) return { text: "Strong match", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" };
    return { text: "Excellent match", color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" };
  };

  const match = getMatchMessage(report.matchScore);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans pt-28 pb-12 overflow-x-hidden selection:bg-indigo-500/30">
      {/* Background ambient glow */}
      <div className="fixed top-[-200px] right-[-200px] w-[600px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:grid lg:grid-cols-12 gap-8 relative z-10">
        
        {/* LEFT SIDEBAR (Navigation) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl sticky top-32">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-6">
              Report Sections
            </p>

            <div className="flex flex-row overflow-x-auto lg:flex-col gap-2 no-scrollbar pb-2 lg:pb-0">
              <button
                onClick={() => setActiveSection("technical")}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium whitespace-nowrap ${
                  activeSection === "technical"
                    ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 shadow-inner"
                    : "text-slate-400 hover:bg-white/5 border border-transparent"
                }`}
              >
                <Code2 size={18} className="shrink-0" /> Technical Questions
              </button>

              <button
                onClick={() => setActiveSection("behavioral")}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium whitespace-nowrap ${
                  activeSection === "behavioral"
                    ? "bg-purple-500/20 text-purple-400 border border-purple-500/20 shadow-inner"
                    : "text-slate-400 hover:bg-white/5 border border-transparent"
                }`}
              >
                <MessageSquare size={18} className="shrink-0" /> Behavioral Questions
              </button>

              <button
                onClick={() => setActiveSection("roadmap")}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium whitespace-nowrap ${
                  activeSection === "roadmap"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 shadow-inner"
                    : "text-slate-400 hover:bg-white/5 border border-transparent"
                }`}
              >
                <Send size={18} className="shrink-0" /> Preparation Roadmap
              </button>
            </div>

            {/* DOWNLOAD BUTTON */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                onClick={handleDownloadResume}
                disabled={isGeneratingResume}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-white shadow-md"
              >
                {isGeneratingResume ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating PDF...
                  </>
                ) : (
                  <><FileDown size={18} /> Download ATS Resume</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="lg:col-span-9 flex flex-col gap-8">
          
          {/* TOP SUMMARY DASHBOARD */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Match Score Card */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl flex items-center gap-6">
              <div className="relative flex-shrink-0">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                  <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="226" strokeDashoffset={226 - (226 * report.matchScore) / 100} className={`${match.color} transition-all duration-1000`} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-lg text-white">
                  {report.matchScore}%
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-400 font-medium mb-1">Overall Match</p>
                <div className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${match.bg} ${match.color} ${match.border}`}>
                  {match.text}
                </div>
              </div>
            </div>

            {/* Total Questions Card */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-500/20 rounded-lg"><Target className="w-5 h-5 text-indigo-400" /></div>
                <h3 className="text-slate-400 font-medium">Practice Qs</h3>
              </div>
              <p className="text-3xl font-bold text-white mt-1">
                {report.technicalQuestions.length + report.behavioralQuestions.length} <span className="text-sm font-normal text-slate-500">total</span>
              </p>
            </div>

            {/* Skill Gaps Card */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-pink-500/20 rounded-lg"><ShieldAlert className="w-5 h-5 text-pink-400" /></div>
                <h3 className="text-slate-400 font-medium">Identified Gaps</h3>
              </div>
              <p className="text-3xl font-bold text-white mt-1">
                {report.skillGaps.length} <span className="text-sm font-normal text-slate-500">skills</span>
              </p>
            </div>
          </div>

          {/* DYNAMIC CONTENT SECTION */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl min-h-[500px]">
            
            {/* TECHNICAL QUESTIONS */}
            {activeSection === "technical" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Code2 className="text-indigo-400" /> Technical Questions
                  </h2>
                </div>

                <div className="space-y-4">
                  {report.technicalQuestions.map((q, i) => (
                    <div key={i} className="bg-slate-950/50 border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-indigo-500/30">
                      <button
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        className="w-full text-left p-5 flex justify-between items-start gap-4 hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs font-bold border border-indigo-500/30">
                            Q{i + 1}
                          </span>
                          <span className="font-medium leading-relaxed text-slate-200 mt-1">{q.question}</span>
                        </div>
                        <span className="text-slate-400 mt-1 p-1 rounded-full bg-white/5 shrink-0">
                          {openIndex === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </span>
                      </button>

                      {openIndex === i && (
                        <div className="px-5 pb-5 pt-2 text-sm text-slate-400 animate-in fade-in zoom-in-95 duration-200">
                          <div className="p-5 bg-slate-900 rounded-xl border border-white/5 shadow-inner">
                            <p className="text-indigo-300 font-semibold mb-2 flex items-center gap-2 uppercase tracking-wide text-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Interviewer's Intention
                            </p>
                            <p className="mb-5 leading-relaxed text-slate-300">{q.intention}</p>
                            
                            <p className="text-emerald-400 font-semibold mb-2 flex items-center gap-2 uppercase tracking-wide text-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Recommended Answer Strategy
                            </p>
                            <p className="leading-relaxed text-slate-300">{q.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BEHAVIORAL QUESTIONS */}
            {activeSection === "behavioral" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <MessageSquare className="text-purple-400" /> Behavioral Questions
                  </h2>
                </div>

                <div className="space-y-4">
                  {report.behavioralQuestions.map((q, i) => (
                    <div key={i} className="bg-slate-950/50 border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-purple-500/30">
                      <button
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        className="w-full text-left p-5 flex justify-between items-start gap-4 hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 text-xs font-bold border border-purple-500/30">
                            Q{i + 1}
                          </span>
                          <span className="font-medium leading-relaxed text-slate-200 mt-1">{q.question}</span>
                        </div>
                        <span className="text-slate-400 mt-1 p-1 rounded-full bg-white/5 shrink-0">
                          {openIndex === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </span>
                      </button>

                      {openIndex === i && (
                        <div className="px-5 pb-5 pt-2 text-sm text-slate-400 animate-in fade-in zoom-in-95 duration-200">
                          <div className="p-5 bg-slate-900 rounded-xl border border-white/5 shadow-inner">
                            <p className="text-purple-300 font-semibold mb-2 flex items-center gap-2 uppercase tracking-wide text-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> Why they ask this
                            </p>
                            <p className="mb-5 leading-relaxed text-slate-300">{q.intention}</p>
                            
                            <p className="text-emerald-400 font-semibold mb-2 flex items-center gap-2 uppercase tracking-wide text-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> STAR Method Approach
                            </p>
                            <p className="leading-relaxed text-slate-300">{q.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ROADMAP & SKILL GAPS */}
            {activeSection === "roadmap" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Roadmap Column */}
                <div className="col-span-1 lg:col-span-2">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                    <Send className="text-emerald-400" /> Preparation Roadmap
                  </h2>
                  <div className="space-y-6">
                    {report.preparationPlan?.map((plan, i) => (
                      <div key={i} className="bg-slate-950/50 border border-white/5 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/50 group-hover:bg-emerald-400 transition-colors"></div>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg border border-emerald-500/30">
                            {plan.day}
                          </div>
                          <h3 className="text-lg font-semibold text-white">Day {plan.day} Focus</h3>
                        </div>
                        <p className="text-sm text-slate-300 mb-4 bg-slate-900 p-3 rounded-xl border border-white/5 leading-relaxed">{plan.focus}</p>
                        <ul className="space-y-3 pl-2">
                          {plan.tasks?.map((task, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-slate-400">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                              <span className="leading-relaxed">{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skill Gaps Sidebar inside Roadmap view */}
                <div className="col-span-1 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-8">
                  <h2 className="text-xl font-bold text-white flex items-center gap-3 mb-6">
                    <ShieldAlert className="text-pink-400 w-5 h-5" /> Skill Gaps
                  </h2>
                  <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                    These are areas where your profile doesn't completely align with the job description. Focus on these to improve your chances.
                  </p>
                  <div className="space-y-3">
                    {report.skillGaps.map((gap, i) => (
                      <div key={i} className="p-4 rounded-xl bg-pink-500/5 border border-pink-500/10 text-sm text-slate-300 hover:border-pink-500/30 transition-colors shadow-sm">
                        <span className="font-medium text-pink-400 block mb-1">Gap #{i + 1}</span>
                        {gap.skill}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
