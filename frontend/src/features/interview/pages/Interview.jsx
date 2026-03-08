import React, { useState } from "react";

const mockReport = {
  matchScore: 88,
  technicalQuestions: [
    {
      id: "q1",
      question:
        "Explain the Node.js event loop and how it handles asynchronous I/O operations.",
      intention:
        "To assess the candidate's understanding of Node.js internal architecture and non-blocking I/O.",
      answer:
        "A strong answer should walk through the phases of the event loop and how Node avoids blocking the main thread.",
    },
  ],
  behavioralQuestions: [
    {
      id: "b1",
      question:
        "Tell me about a time you had to quickly prepare for an important interview or presentation.",
      intention:
        "To understand planning and prioritization under time pressure.",
      answer: "Look for a clear STAR story with concrete actions and results.",
    },
  ],
  skillGaps: [
    {
      id: "s1",
      skill: "System design for large-scale services",
      severity: "high",
    },
    {
      id: "s2",
      skill: "Advanced React performance tuning",
      severity: "medium",
    },
    { id: "s3", skill: "Behavioral storytelling (STAR)", severity: "medium" },
    {
      id: "s4",
      skill: "Algorithms & data structures practice",
      severity: "low",
    },
  ],
};

const TABS = [
  { id: "technical", label: "Technical Questions" },
  { id: "behavioral", label: "Behavioral Questions" },
  { id: "skills", label: "Skill Gaps" },
];

const severityColors = {
  high: "bg-rose-500/20 text-rose-300 border border-rose-500/40",
  medium: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/40",
  low: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40",
};

const Interview = () => {
  const [activeTab, setActiveTab] = useState("technical");

  const renderTechnical = () =>
    mockReport.technicalQuestions.map((item, index) => (
      <article
        key={item.id}
        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-5 hover:border-pink-500 transition"
      >
        <div className="mb-2 text-xs text-gray-400">Question {index + 1}</div>

        <h3 className="text-sm font-semibold text-white">{item.question}</h3>

        <div className="mt-3 space-y-2 text-xs">
          <div className="bg-black/40 rounded-lg p-3">
            <p className="text-pink-400 mb-1 text-[10px] uppercase tracking-widest">
              Intention
            </p>
            <p className="text-gray-300">{item.intention}</p>
          </div>

          <div className="bg-emerald-500/10 rounded-lg p-3">
            <p className="text-emerald-400 mb-1 text-[10px] uppercase tracking-widest">
              Model Answer
            </p>
            <p className="text-gray-100">{item.answer}</p>
          </div>
        </div>
      </article>
    ));

  const renderBehavioral = () =>
    mockReport.behavioralQuestions.map((item, index) => (
      <article
        key={item.id}
        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-5 hover:border-pink-500 transition"
      >
        <div className="mb-2 text-xs text-gray-400">Question {index + 1}</div>

        <h3 className="text-sm font-semibold text-white">{item.question}</h3>

        <div className="mt-3 space-y-2 text-xs">
          <div className="bg-black/40 rounded-lg p-3">
            <p className="text-pink-400 mb-1 text-[10px] uppercase tracking-widest">
              Intention
            </p>
            <p className="text-gray-300">{item.intention}</p>
          </div>

          <div className="bg-emerald-500/10 rounded-lg p-3">
            <p className="text-emerald-400 mb-1 text-[10px] uppercase tracking-widest">
              Model Answer
            </p>
            <p className="text-gray-100">{item.answer}</p>
          </div>
        </div>
      </article>
    ));

  const renderSkillGaps = () =>
    mockReport.skillGaps.map((gap) => (
      <article
        key={gap.id}
        className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg p-4 hover:border-pink-500 transition"
      >
        <p className="text-sm text-white">{gap.skill}</p>

        <span
          className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider ${severityColors[gap.severity]}`}
        >
          {gap.severity}
        </span>
      </article>
    ));

  let content;
  if (activeTab === "technical") content = renderTechnical();
  else if (activeTab === "behavioral") content = renderBehavioral();
  else content = renderSkillGaps();

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#050b16] via-[#0b1324] to-[#020617] text-white px-6 py-10">
      {/* animated dots */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse"></div>
      </div>

      <div className="relative mx-auto flex max-w-7xl gap-8">
        {/* LEFT SIDEBAR */}
        <aside className="hidden w-56 flex-shrink-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-5 md:flex md:flex-col">
          <p className="mb-5 text-xs uppercase tracking-widest text-gray-400">
            Sections
          </p>

          <nav className="space-y-2">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white"
                      : "text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 space-y-4">{content}</main>

        {/* RIGHT SIDEBAR */}
        <aside className="hidden w-64 flex-shrink-0 flex-col gap-4 md:flex">
          {/* MATCH SCORE */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 text-center">
            <p className="text-xs uppercase tracking-widest text-gray-400">
              Match Score
            </p>

            <div className="mt-6 flex justify-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-green-400/30 to-transparent shadow-[0_0_60px_rgba(34,197,94,0.4)]">
                <span className="text-3xl font-bold text-green-300">
                  {mockReport.matchScore}
                </span>
              </div>
            </div>

            <p className="mt-4 text-green-400 text-sm">
              Strong match for this role
            </p>
          </div>

          {/* QUICK VIEW */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-4">
            <p className="mb-3 text-xs uppercase tracking-widest text-gray-400">
              Quick View — Skill Gaps
            </p>

            <div className="space-y-2">
              {mockReport.skillGaps.map((gap) => (
                <div
                  key={gap.id}
                  className="flex justify-between items-center bg-black/40 rounded-lg px-3 py-2"
                >
                  <span className="text-xs">{gap.skill}</span>

                  <span
                    className={`px-2 py-1 rounded-full text-[9px] ${severityColors[gap.severity]}`}
                  >
                    {gap.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Interview;
