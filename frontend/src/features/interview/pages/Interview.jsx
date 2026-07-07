import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview";
import {
  Code2,
  MessageSquare,
  Send,
  Target,
  ShieldAlert,
  FileDown,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Mic,
} from "lucide-react";

const SECTIONS = [
  { key: "technical", label: "Technical Questions", icon: Code2 },
  { key: "behavioral", label: "Behavioral Questions", icon: MessageSquare },
  { key: "roadmap", label: "Preparation Roadmap", icon: Send },
];

const SEVERITY_STYLE = {
  high: { label: "High priority", text: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" },
  medium: { label: "Medium priority", text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  low: { label: "Low priority", text: "text-slate-400", bg: "bg-slate-500/10", border: "border-slate-500/20" },
};

const Interview = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();
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
    if (interviewId) getReportById(interviewId);
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
  const totalQuestions = report.technicalQuestions.length + report.behavioralQuestions.length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans pt-28 pb-16 overflow-x-hidden selection:bg-indigo-500/30">
      <div className="fixed top-[-200px] right-[-200px] w-[600px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* PAGE HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 relative z-10">
        <p className="text-[11px] uppercase tracking-[0.2em] text-indigo-400 font-semibold mb-3">
          Interview Report
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight max-w-2xl">
            {report.title}
          </h1>
          <div
            className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${match.bg} ${match.color} ${match.border}`}
          >
            {match.text} · {report.matchScore}%
          </div>
        </div>
        <p className="text-slate-500 text-sm mt-2">
          Generated{" "}
          {new Date(report.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:grid lg:grid-cols-12 gap-8 relative z-10">
        {/* SIDEBAR */}
        <div className="lg:col-span-3">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl sticky top-32">
            <p className="text-[11px] text-slate-500 uppercase tracking-[0.2em] font-semibold mb-5 px-1">
              Sections
            </p>

            <nav className="flex flex-row overflow-x-auto lg:flex-col gap-1 no-scrollbar">
              {SECTIONS.map((s) => {
                const Icon = s.icon;
                const active = activeSection === s.key;
                return (
                  <button
                    key={s.key}
                    onClick={() => setActiveSection(s.key)}
                    className={`group flex items-center gap-3 pl-4 pr-3 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-colors border-l-2 ${
                      active
                        ? "border-indigo-500 bg-indigo-500/10 text-white"
                        : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    }`}
                  >
                    <Icon size={17} className={active ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"} />
                    {s.label}
                  </button>
                );
              })}
            </nav>

            <div className="mt-7 pt-6 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => navigate(`/live-interview/${report._id}`)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-shadow flex items-center justify-center gap-2"
              >
                <Mic size={16} /> Start Live Interview
              </button>

              <button
                onClick={handleDownloadResume}
                disabled={isGeneratingResume}
                className="w-full py-3.5 rounded-xl border border-white/10 text-slate-300 font-medium text-sm hover:border-white/20 hover:bg-white/5 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isGeneratingResume ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <FileDown size={16} /> Download ATS Resume
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          {/* SUMMARY — asymmetric */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
            <div className="sm:col-span-5 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl flex items-center gap-6">
              <div className="relative shrink-0">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray="226"
                    strokeDashoffset={226 - (226 * report.matchScore) / 100}
                    className={`${match.color} transition-all duration-1000`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-lg text-white">
                  {report.matchScore}%
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-400 font-medium mb-2">Overall Match</p>
                <div className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${match.bg} ${match.color} ${match.border}`}>
                  {match.text}
                </div>
              </div>
            </div>

            <div className="sm:col-span-7 grid grid-cols-2 gap-5">
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col justify-center">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="p-1.5 bg-indigo-500/20 rounded-lg">
                    <Target className="w-4 h-4 text-indigo-400" />
                  </div>
                  <h3 className="text-sm text-slate-400 font-medium">Practice Qs</h3>
                </div>
                <p className="text-2xl font-bold text-white tabular-nums">
                  {totalQuestions} <span className="text-sm font-normal text-slate-500">total</span>
                </p>
              </div>

              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col justify-center">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="p-1.5 bg-pink-500/20 rounded-lg">
                    <ShieldAlert className="w-4 h-4 text-pink-400" />
                  </div>
                  <h3 className="text-sm text-slate-400 font-medium">Gaps Found</h3>
                </div>
                <p className="text-2xl font-bold text-white tabular-nums">
                  {report.skillGaps.length} <span className="text-sm font-normal text-slate-500">skills</span>
                </p>
              </div>
            </div>
          </div>

          {/* DYNAMIC CONTENT */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl min-h-[500px]">
            {activeSection === "technical" && (
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-3 mb-6 tracking-tight">
                  <Code2 className="text-indigo-400" size={22} /> Technical Questions
                </h2>
                <div className="space-y-3">
                  {report.technicalQuestions.map((q, i) => (
                    <div key={i} className="bg-slate-950/50 border border-white/5 rounded-2xl overflow-hidden transition-colors hover:border-indigo-500/30">
                      <button
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        className="w-full text-left p-5 flex justify-between items-start gap-4 hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs font-bold border border-indigo-500/30 mt-0.5">
                            Q{i + 1}
                          </span>
                          <span className="font-medium leading-relaxed text-slate-200 text-[15px]">{q.question}</span>
                        </div>
                        <span className="text-slate-500 mt-1 shrink-0">
                          {openIndex === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </span>
                      </button>

                      {openIndex === i && (
                        <div className="px-5 pb-5 pt-1 text-sm text-slate-400">
                          <div className="p-5 bg-slate-900 rounded-xl border border-white/5 space-y-4">
                            <div>
                              <p className="text-slate-500 font-semibold mb-1.5 text-xs uppercase tracking-wider">
                                Interviewer's intention
                              </p>
                              <p className="leading-relaxed text-slate-300">{q.intention}</p>
                            </div>
                            <div>
                              <p className="text-indigo-400 font-semibold mb-1.5 text-xs uppercase tracking-wider">
                                Recommended answer strategy
                              </p>
                              <p className="leading-relaxed text-slate-300">{q.answer}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "behavioral" && (
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-3 mb-6 tracking-tight">
                  <MessageSquare className="text-indigo-400" size={22} /> Behavioral Questions
                </h2>
                <div className="space-y-3">
                  {report.behavioralQuestions.map((q, i) => (
                    <div key={i} className="bg-slate-950/50 border border-white/5 rounded-2xl overflow-hidden transition-colors hover:border-indigo-500/30">
                      <button
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        className="w-full text-left p-5 flex justify-between items-start gap-4 hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs font-bold border border-indigo-500/30 mt-0.5">
                            Q{i + 1}
                          </span>
                          <span className="font-medium leading-relaxed text-slate-200 text-[15px]">{q.question}</span>
                        </div>
                        <span className="text-slate-500 mt-1 shrink-0">
                          {openIndex === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </span>
                      </button>

                      {openIndex === i && (
                        <div className="px-5 pb-5 pt-1 text-sm text-slate-400">
                          <div className="p-5 bg-slate-900 rounded-xl border border-white/5 space-y-4">
                            <div>
                              <p className="text-slate-500 font-semibold mb-1.5 text-xs uppercase tracking-wider">
                                Why they ask this
                              </p>
                              <p className="leading-relaxed text-slate-300">{q.intention}</p>
                            </div>
                            <div>
                              <p className="text-indigo-400 font-semibold mb-1.5 text-xs uppercase tracking-wider">
                                STAR method approach
                              </p>
                              <p className="leading-relaxed text-slate-300">{q.answer}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "roadmap" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="col-span-1 lg:col-span-2">
                  <h2 className="text-xl font-bold text-white flex items-center gap-3 mb-6 tracking-tight">
                    <Send className="text-indigo-400" size={22} /> Preparation Roadmap
                  </h2>
                  <div className="space-y-4">
                    {report.preparationPlan?.map((plan, i) => (
                      <div key={i} className="bg-slate-950/50 border border-white/5 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/40"></div>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-9 h-9 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm border border-indigo-500/30">
                            {plan.day}
                          </div>
                          <h3 className="text-base font-semibold text-white">Day {plan.day} Focus</h3>
                        </div>
                        <p className="text-sm text-slate-300 mb-4 bg-slate-900 p-3 rounded-xl border border-white/5 leading-relaxed">
                          {plan.focus}
                        </p>
                        <ul className="space-y-2.5">
                          {plan.tasks?.map((task, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-slate-400">
                              <CheckCircle2 className="w-4 h-4 text-indigo-400/70 mt-0.5 shrink-0" />
                              <span className="leading-relaxed">{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-span-1 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-8">
                  <h2 className="text-lg font-bold text-white flex items-center gap-3 mb-5 tracking-tight">
                    <ShieldAlert className="text-pink-400 w-5 h-5" /> Skill Gaps
                  </h2>
                  <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                    Areas where your profile doesn't fully align with the job description.
                  </p>
                  <div className="space-y-2.5">
                    {report.skillGaps.map((gap, i) => {
                      const sev = SEVERITY_STYLE[gap.severity] || SEVERITY_STYLE.low;
                      return (
                        <div key={i} className={`p-4 rounded-xl border ${sev.bg} ${sev.border}`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-white text-sm">{gap.skill}</span>
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${sev.text}`}>
                              {sev.label}
                            </span>
                          </div>
                        </div>
                      );
                    })}
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