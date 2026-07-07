import React, { useEffect, useRef } from "react";

/* ──────────────────────────────────────────────────────────
   HERO SECTION
   Signature visual: annotated interview transcript card
────────────────────────────────────────────────────────── */
const HeroSection = ({ onUploadClick }) => {
  const heroRef = useRef(null);

  // Stagger animate-in children on mount
  useEffect(() => {
    const els = heroRef.current?.querySelectorAll(".animate-in");
    els?.forEach((el, i) => {
      el.style.animationDelay = `${i * 0.09 + 0.04}s`;
    });
  }, []);

  return (
    <section className="hero" ref={heroRef} aria-labelledby="hero-headline">
      {/* Background decoration */}
      <div className="hero-bg-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div className="container-xl">
        <div className="hero-inner">

          {/* ── LEFT COLUMN: Copy ── */}
          <div>
            {/* Badge */}
            <div className="hero-badge animate-in" aria-label="Powered by Gemini AI">
              Gemini AI · Line-by-line feedback
            </div>

            {/* Headline */}
            <h1 id="hero-headline" className="hero-headline animate-in animate-in-1">
              Your interview,<br />
              <em>annotated</em><br />
              by AI.
            </h1>

            {/* Sub */}
            <p className="hero-sub animate-in animate-in-2">
              Upload your resume, and IntelliView builds a real interview around it — behavioral, DSA, system design — then breaks down every answer you give. Not a score. A breakdown.
            </p>

            {/* CTAs */}
            <div className="hero-actions animate-in animate-in-3">
              <button
                id="hero-start-btn"
                className="btn-hero-primary"
                onClick={onUploadClick}
                aria-label="Start your free mock interview"
              >
                Start preparing
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <a
                href="#how-it-works"
                className="btn-hero-secondary"
                aria-label="Learn how IntelliView works"
              >
                See how it works
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            {/* Trust signal */}
            <div className="hero-trust animate-in animate-in-4" aria-label="Used by many candidates">
              <div className="hero-trust-avatars" aria-hidden="true">
                {["AR", "KP", "MJ", "TS", "DL"].map((init, i) => (
                  <div key={i} className="hero-trust-avatar">{init}</div>
                ))}
              </div>
              <span>Used by engineers preparing for FAANG, startups &amp; beyond</span>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Transcript card ── */}
          <div className="animate-in animate-in-3" aria-hidden="true" style={{ position: "relative" }}>
            {/* Score floating chip */}
            <div className="score-ring-wrap">
              <div>
                <div className="score-label">Session<br/>Score</div>
              </div>
              <div className="score-value">74<span style={{ fontSize: "1rem", color: "var(--text-3)" }}>/100</span></div>
            </div>

            <div className="transcript-card">
              {/* Toolbar */}
              <div className="transcript-toolbar">
                <div className="tc-dot tc-dot-r" />
                <div className="tc-dot tc-dot-y" />
                <div className="tc-dot tc-dot-g" />
                <span className="transcript-toolbar-title">mock-interview · round-1.txt</span>
              </div>

              {/* Transcript turns */}
              <div className="transcript-body">

                {/* Q1 */}
                <div className="t-turn">
                  <span className="t-label interviewer">Interviewer</span>
                  <p className="t-text" style={{ color: "var(--text-1)", margin: 0 }}>
                    Tell me about a time you improved system performance under tight deadlines.
                  </p>
                </div>

                {/* A1 — annotated */}
                <div className="t-turn">
                  <span className="t-label candidate">You</span>
                  <p className="t-text" style={{ margin: 0, lineHeight: 1.8 }}>
                    <span className="ann-filler">Um, so</span>{" "}
                    at my last job I was tasked with{" "}
                    <span className="ann-weak t-annotated" style={{ position: "relative" }}>
                      fixing some slow queries
                      {/* Margin note */}
                      <span
                        className="margin-note"
                        style={{ display: "block", top: "-10px", right: "-196px" }}
                      >
                        <span className="margin-note-label mn-warn">⚠ Vague</span>
                        Quantify: "reduced p95 latency from 2.1s → 340ms"
                      </span>
                    </span>
                    {" "}before the product launch.{" "}
                    <span className="ann-strong">
                      I added composite indexes on the orders table and rewrote
                      three N+1 loops using batch fetching
                    </span>
                    {", "}
                    which{" "}
                    <span className="ann-strong">
                      cut API response time by 68%
                    </span>
                    .{" "}
                    <span className="ann-filler">Like</span>, it was shipped on time.
                  </p>
                </div>

                {/* Q2 */}
                <div className="t-turn">
                  <span className="t-label interviewer">Interviewer</span>
                  <p className="t-text" style={{ color: "var(--text-1)", margin: 0 }}>
                    How did stakeholders respond?
                  </p>
                </div>

                {/* A2 */}
                <div className="t-turn">
                  <span className="t-label candidate">You</span>
                  <p className="t-text" style={{ margin: 0, lineHeight: 1.8, color: "var(--text-3)" }}>
                    <span style={{ fontStyle: "italic" }}>Typing…</span>
                    <span
                      style={{
                        display: "inline-block",
                        width: "2px",
                        height: "0.85em",
                        background: "var(--accent)",
                        marginLeft: "2px",
                        verticalAlign: "middle",
                        animation: "cursorBlink 1.1s step-end infinite"
                      }}
                    />
                  </p>
                </div>
              </div>

              {/* AI feedback pill at bottom */}
              <div className="ai-feedback-pill">
                <div className="ai-feedback-pill-icon">
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2l1.8 3.6L14 6.5l-3 2.9.7 4.1L8 11.4l-3.7 2.1.7-4.1L2 6.5l4.2-.9L8 2z" fill="white"/>
                  </svg>
                </div>
                <p className="ai-feedback-pill-text">
                  <strong>Gemini:</strong> Good structure. The "68% reduction" is a strong quantified outcome.
                  Remove filler words (<span style={{ color: "var(--danger)", fontFamily: "var(--font-mono)", fontSize: "0.72rem" }}>"um so", "like"</span>)
                  and expand the stakeholder impact for a more complete STAR response.
                </p>
              </div>
            </div>

            {/* Legend */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "0.75rem",
                paddingLeft: "0.25rem",
                flexWrap: "wrap"
              }}
            >
              {[
                { color: "var(--danger)", label: "Filler word" },
                { color: "var(--warn)", label: "Vague claim" },
                { color: "var(--accent-3)", label: "Strong answer" },
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
                      opacity: 0.9,
                      flexShrink: 0
                    }}
                  />
                  {label}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
