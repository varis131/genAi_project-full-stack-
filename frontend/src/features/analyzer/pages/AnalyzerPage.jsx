import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import Navbar from "../../../components/Navbar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import { useAuth } from "../../auth/hooks/useAuth";

/* ──────────────────────────────────────────────────────────
   Reveal-on-scroll hook
────────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    document
      .querySelectorAll(".reveal, .reveal-stagger")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ──────────────────────────────────────────────────────────
   DATA
────────────────────────────────────────────────────────── */
const FEATURES = [
  {
    tag: "Core",
    tagColor: { bg: "rgba(79,116,255,0.1)", color: "var(--accent)", border: "rgba(79,116,255,0.2)" },
    icon: "📋",
    iconBg: "rgba(79,116,255,0.12)",
    title: "Full mock interview sessions",
    desc: "Not a quiz. IntelliView runs a complete interview loop — question, response, follow-up — adapting dynamically to what you say, just like a real interviewer.",
    wide: true,
  },
  {
    tag: "AI",
    tagColor: { bg: "rgba(34,211,165,0.1)", color: "var(--accent-3)", border: "rgba(34,211,165,0.2)" },
    icon: "✦",
    iconBg: "rgba(34,211,165,0.12)",
    title: "Gemini line-by-line feedback",
    desc: "Every sentence you say is evaluated. Filler words, weak claims, strong quantified outcomes — Gemini flags each one with a reason and a suggested rewrite.",
  },
  {
    tag: "Export",
    tagColor: { bg: "rgba(244,169,78,0.1)", color: "var(--warn)", border: "rgba(244,169,78,0.2)" },
    icon: "⬇",
    iconBg: "rgba(244,169,78,0.1)",
    title: "PDF report via Puppeteer",
    desc: "Download a beautifully formatted PDF containing your transcript, all AI annotations, and your performance breakdown by category.",
  },
  {
    tag: "Resume",
    tagColor: { bg: "rgba(124,92,252,0.1)", color: "var(--accent-2)", border: "rgba(124,92,252,0.2)" },
    icon: "📄",
    iconBg: "rgba(124,92,252,0.1)",
    title: "Resume + JD gap analysis",
    desc: "Paste a job description. IntelliView cross-references your resume, identifies missing skills, and tailors questions to expose real gaps before the interview does.",
  },
  {
    tag: "Strategy",
    tagColor: { bg: "rgba(244,112,112,0.1)", color: "var(--danger)", border: "rgba(244,112,112,0.2)" },
    icon: "🗺",
    iconBg: "rgba(244,112,112,0.1)",
    title: "Personalised prep roadmap",
    desc: "Based on your resume and target role, IntelliView generates a custom study roadmap — which topics to focus on, which to skip, in what order.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Upload your resume",
    desc: "Drop a PDF or DOCX. IntelliView parses your experience, skills, and role history automatically.",
  },
  {
    num: "02",
    title: "Paste the job description",
    desc: "IntelliView reads the JD and builds a tailored question bank mapped to what that company actually asks.",
  },
  {
    num: "03",
    title: "Run the mock interview",
    desc: "Answer questions in your own words. The AI adapts follow-ups in real time based on what you say.",
  },
  {
    num: "04",
    title: "Review annotated feedback",
    desc: "Get Gemini's line-by-line breakdown. Download your PDF report. Repeat until you nail it.",
  },
];

const INTERVIEW_TYPES = [
  {
    emoji: "💬",
    bg: "rgba(79,116,255,0.1)",
    name: "Behavioral",
    desc: "STAR-method responses, leadership, conflict resolution. Gemini flags vague answers and filler words.",
  },
  {
    emoji: "🧮",
    bg: "rgba(34,211,165,0.1)",
    name: "DSA / Technical",
    desc: "Data structures, algorithms, complexity analysis. Adaptive follow-ups probe your reasoning depth.",
  },
  {
    emoji: "🏗",
    bg: "rgba(244,169,78,0.1)",
    name: "System Design",
    desc: "Scalability, trade-offs, distributed systems. AI evaluates your architecture choices and pushes on assumptions.",
  },
];

const ANNOTATIONS = [
  {
    type: "bad",
    label: "Filler word removed",
    quote: '"Um, so… I was basically just trying to—"',
    suggestion: (
      <>
        Filler words signal uncertainty. Start with the action directly:{" "}
        <strong>"I led the migration of our authentication service…"</strong>
      </>
    ),
  },
  {
    type: "warn",
    label: "Vague quantifier",
    quote: '"…and it made the system a lot faster."',
    suggestion: (
      <>
        Replace with a measurable outcome:{" "}
        <strong>"reduced p95 API latency from 1.8s to 310ms."</strong>{" "}
        Numbers make claims credible.
      </>
    ),
  },
  {
    type: "good",
    label: "Strong STAR structure",
    quote: '"I identified the bottleneck, proposed the fix to the team lead, and shipped it solo in two days."',
    suggestion: (
      <>
        Excellent. This covers <strong>Action + Result + Ownership</strong> concisely.
        Adding a business-impact sentence would make it a 10/10 response.
      </>
    ),
  },
  {
    type: "info",
    label: "Follow-up opportunity",
    quote: '"We used Redis for caching."',
    suggestion: (
      <>
        The interviewer will likely probe <em>why Redis</em> over alternatives.
        Preemptively mention the trade-off:{" "}
        <strong>"Redis over Memcached because we needed sorted sets for our leaderboard."</strong>
      </>
    ),
  },
];

/* ──────────────────────────────────────────────────────────
   MAIN PAGE
────────────────────────────────────────────────────────── */
const AnalyzerPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useReveal();

  const handleCTA = () => {
    if (!user) navigate("/login");
    else navigate("/home");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--ink)",
        color: "var(--text-1)",
        fontFamily: "var(--font-body)",
        overflowX: "hidden",
      }}
    >
      <Navbar />

      {/* ── HERO ── */}
      <HeroSection onUploadClick={handleCTA} />

      {/* ── SECTION DIVIDER ── */}
      <div className="section-divider" />

      {/* ════════════════════════════════════════════════
          INTERVIEW TYPES
      ════════════════════════════════════════════════ */}
      <section
        id="features"
        className="section-pad-sm"
        aria-labelledby="interview-types-heading"
      >
        <div className="container-xl">
          <div className="reveal" style={{ marginBottom: "2.5rem" }}>
            <div className="section-label">Interview coverage</div>
            <h2 id="interview-types-heading" className="section-heading">
              Every format.<br />
              <em>One platform.</em>
            </h2>
          </div>

          <div className="interview-types reveal-stagger">
            {INTERVIEW_TYPES.map((t) => (
              <article key={t.name} className="itype-card" aria-label={`${t.name} interview type`}>
                <div
                  className="itype-icon"
                  style={{ background: t.bg }}
                  aria-hidden="true"
                >
                  {t.emoji}
                </div>
                <h3 className="itype-name">{t.name}</h3>
                <p className="itype-desc">{t.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ════════════════════════════════════════════════
          FEATURES GRID
      ════════════════════════════════════════════════ */}
      <section
        className="section-pad"
        aria-labelledby="features-heading"
      >
        <div className="container-xl">
          <div
            className="reveal"
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "3rem",
            }}
          >
            <div className="section-label">What's inside</div>
            <h2 id="features-heading" className="section-heading">
              Built around a real<br />
              <em>product, not a pitch.</em>
            </h2>
            <p className="section-sub" style={{ marginTop: "0.75rem" }}>
              Every capability here maps 1:1 to a real IntelliView feature.
              No filler, no vaporware.
            </p>
          </div>

          <div className="features-grid reveal">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className={`feature-cell${f.wide ? " feature-cell--wide" : ""}`}
              >
                <div
                  className="feature-tag"
                  style={{
                    background: f.tagColor.bg,
                    color: f.tagColor.color,
                    border: `1px solid ${f.tagColor.border}`,
                  }}
                >
                  {f.tag}
                </div>
                <div
                  className="feature-icon"
                  style={{ background: f.iconBg }}
                  aria-hidden="true"
                >
                  <span style={{ fontSize: "1.1rem" }}>{f.icon}</span>
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ════════════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════════════ */}
      <section
        id="how-it-works"
        className="section-pad"
        aria-labelledby="how-it-works-heading"
      >
        <div className="container-xl">
          <div className="reveal" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div className="section-label" style={{ justifyContent: "center" }}>
              Process
            </div>
            <h2 id="how-it-works-heading" className="section-heading" style={{ textAlign: "center" }}>
              From resume to <em>ready</em>,<br />in four steps.
            </h2>
          </div>

          <div style={{ position: "relative" }}>
            <div className="steps-connector" aria-hidden="true" />
            <div className="steps-grid reveal-stagger">
              {STEPS.map((s) => (
                <div key={s.num} className="step-item">
                  <div className="step-num" aria-hidden="true">
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {s.num}
                    </span>
                  </div>
                  <h3 className="step-title">{s.title}</h3>
                  <p className="step-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="reveal"
            style={{ textAlign: "center", marginTop: "3.5rem" }}
          >
            <button
              id="how-it-works-cta"
              className="btn-hero-primary"
              onClick={handleCTA}
              style={{ margin: "0 auto" }}
              aria-label="Start your mock interview"
            >
              Try it now — it's free
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ════════════════════════════════════════════════
          AI FEEDBACK DEEP-DIVE
      ════════════════════════════════════════════════ */}
      <section
        id="feedback"
        className="feedback-section section-pad"
        aria-labelledby="feedback-heading"
      >
        <div className="container-xl">
          <div className="feedback-layout">
            {/* Left: transcript */}
            <div className="reveal">
              <div className="feedback-transcript" aria-label="Sample annotated transcript">
                <div className="ft-header">
                  <span className="ft-file">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <rect x="2" y="1" width="9" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M5 5h5M5 8h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    session-transcript.txt
                  </span>
                  <span className="ft-badge">Gemini annotated</span>
                </div>

                <div className="ft-lines" aria-label="Interview transcript lines">
                  {[
                    { n: "1",  content: <span className="hi-neutral">Q: Walk me through your most impactful project.</span> },
                    { n: "2",  content: null },
                    { n: "3",  content: <span><span className="hi-filler">Um, so</span> at my previous role I <span className="hi-warn">worked on some infrastructure stuff</span>.</span> },
                    { n: "4",  content: <span>We had <span className="hi-warn">performance problems</span> and I was asked to fix them.</span> },
                    { n: "5",  content: null },
                    { n: "6",  content: <span><span className="hi-good">I profiled the API layer using py-spy, found three hot paths</span></span> },
                    { n: "7",  content: <span><span className="hi-good">accounting for 80% of CPU time, and rewrote them with async I/O.</span></span> },
                    { n: "8",  content: <span><span className="hi-good">Response time dropped from 2.1s to 280ms in production.</span></span> },
                    { n: "9",  content: null },
                    { n: "10", content: <span>The team was <span className="hi-filler">like</span>, really happy about it <span className="hi-filler">and stuff</span>.</span> },
                    { n: "11", content: <span><span className="hi-warn">It helped the company a lot.</span></span> },
                  ].map((line) => (
                    <div key={line.n} className="ft-line">
                      <span className="ft-linenum">{line.n}</span>
                      <span className="ft-content">{line.content ?? " "}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div
                style={{
                  display: "flex",
                  gap: "1.25rem",
                  marginTop: "0.85rem",
                  paddingLeft: "0.25rem",
                  flexWrap: "wrap",
                }}
              >
                {[
                  { color: "var(--danger)", label: "Filler word" },
                  { color: "var(--warn)", label: "Vague / unmeasured" },
                  { color: "var(--accent-3)", label: "Strong, quantified" },
                ].map(({ color, label }) => (
                  <span
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.67rem",
                      color: "var(--text-3)",
                    }}
                  >
                    <span
                      style={{
                        width: "8px", height: "8px",
                        borderRadius: "2px",
                        background: color,
                        flexShrink: 0,
                      }}
                    />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: copy + annotation cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div className="reveal">
                <div className="section-label">AI feedback engine</div>
                <h2 id="feedback-heading" className="section-heading">
                  Gemini reads<br />
                  <em>every line.</em>
                </h2>
                <p
                  className="section-sub"
                  style={{ marginTop: "0.75rem" }}
                >
                  Not a holistic score. Not generic tips. Every sentence gets an
                  annotation: what's wrong, why it's wrong, and exactly how to
                  rewrite it.
                </p>
              </div>

              <div className="annotation-list reveal-stagger">
                {ANNOTATIONS.map((a) => (
                  <div key={a.label} className="annotation-item">
                    <div className={`ann-type ${a.type}`}>{a.label}</div>
                    <div className="ann-quote">{a.quote}</div>
                    <p className="ann-suggestion">{a.suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ════════════════════════════════════════════════
          PDF REPORT SECTION
      ════════════════════════════════════════════════ */}
      <section
        id="report"
        className="section-pad"
        aria-labelledby="report-heading"
      >
        <div className="container-xl">
          <div className="report-section">
            {/* Left: copy */}
            <div className="reveal">
              <div className="section-label">Puppeteer PDF export</div>
              <h2 id="report-heading" className="section-heading">
                Walk into any<br />
                interview <em>with proof.</em>
              </h2>
              <p className="section-sub" style={{ marginTop: "0.75rem", marginBottom: "2rem" }}>
                After each session IntelliView generates a structured PDF containing
                your full annotated transcript, per-category scores, and a
                prioritised improvement checklist — shareable, printable, permanent.
              </p>
              <button
                id="report-cta-btn"
                className="btn-hero-primary"
                onClick={handleCTA}
                aria-label="Generate your interview report"
              >
                Generate your report
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Right: report mockup */}
            <div className="report-mockup reveal" aria-label="Sample performance report">
              <div className="report-header">
                <span className="report-title">Session Report · Round 1</span>
                <span className="report-date">July 2026</span>
              </div>
              <div className="report-body">
                {/* Score boxes */}
                <div className="report-score-row">
                  {[
                    { value: "74", label: "Overall", color: "var(--accent-3)" },
                    { value: "82", label: "Behavioral", color: "var(--accent)" },
                    { value: "66", label: "Technical", color: "var(--warn)" },
                  ].map((s) => (
                    <div key={s.label} className="report-score-box">
                      <div className="rsb-value" style={{ color: s.color }}>{s.value}</div>
                      <div className="rsb-label">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Bar chart */}
                <div className="report-bar-row">
                  {[
                    { label: "Communication", pct: 78 },
                    { label: "Answer structure", pct: 85 },
                    { label: "Quantified outcomes", pct: 60 },
                    { label: "Filler words", pct: 45 },
                    { label: "Technical depth", pct: 70 },
                  ].map((b) => (
                    <div key={b.label} className="report-bar-item">
                      <span className="report-bar-label">{b.label}</span>
                      <div className="report-bar-track">
                        <div
                          className="report-bar-fill"
                          style={{ width: `${b.pct}%` }}
                          role="progressbar"
                          aria-valuenow={b.pct}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${b.label}: ${b.pct}%`}
                        />
                      </div>
                      <span className="report-bar-pct">{b.pct}%</span>
                    </div>
                  ))}
                </div>

                {/* Priority actions */}
                <div
                  style={{
                    background: "var(--ink)",
                    borderRadius: "10px",
                    border: "1px solid var(--border)",
                    padding: "0.9rem 1rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      color: "var(--text-3)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: "0.6rem",
                    }}
                  >
                    Priority improvements
                  </p>
                  {[
                    { icon: "→", color: "var(--danger)", text: "Eliminate filler words (avg 4.2 per answer)" },
                    { icon: "→", color: "var(--warn)", text: "Add metrics to 3 behavioral answers" },
                    { icon: "→", color: "var(--accent)", text: "Deepen system design trade-off reasoning" },
                  ].map((item) => (
                    <div
                      key={item.text}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.5rem",
                        marginBottom: "0.4rem",
                        fontSize: "0.78rem",
                        color: "var(--text-2)",
                        lineHeight: "1.5",
                      }}
                    >
                      <span style={{ color: item.color, flexShrink: 0 }}>{item.icon}</span>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ════════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════════ */}
      <section className="final-cta reveal" aria-labelledby="final-cta-heading">
        <div className="final-cta-glow" aria-hidden="true" />
        <div className="container-xl" style={{ position: "relative", zIndex: 2 }}>
          <p className="final-cta-eyebrow">Ready when you are</p>
          <h2 id="final-cta-heading" className="final-cta-heading">
            Stop guessing.<br />
            Start <em>getting feedback</em>.
          </h2>
          <p className="final-cta-sub">
            Upload your resume, paste the JD, and IntelliView
            builds your first session in under 30 seconds.
          </p>
          <div className="final-cta-actions">
            <button
              id="final-cta-primary-btn"
              className="btn-hero-primary"
              onClick={handleCTA}
              aria-label="Start your free mock interview"
            >
              Start your first interview
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <a
              href="#how-it-works"
              className="btn-hero-secondary"
              id="final-cta-learn-link"
            >
              See the full walkthrough
            </a>
          </div>

          {/* Tech stack footnote */}
          <p
            style={{
              marginTop: "3rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              color: "var(--text-3)",
              letterSpacing: "0.04em",
            }}
          >
            Built on MERN · Powered by Gemini API · PDF via Puppeteer
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AnalyzerPage;
