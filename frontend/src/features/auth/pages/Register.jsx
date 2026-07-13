import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { loading, handleRegister } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(formData);
    navigate("/");
  };

  return (
    <div style={styles.page}>
      {/* Background grid */}
      <div style={styles.bgGrid} aria-hidden="true" />
      {/* Radial glow */}
      <div style={styles.glow} aria-hidden="true" />
      {/* Corner accent glow */}
      <div style={styles.glowCorner} aria-hidden="true" />

      {/* Card */}
      <div style={styles.card}>



        {/* Heading */}
        <h1 style={styles.heading}>Create your account</h1>
        <p style={styles.sub}>
          Join{" "}
          <span style={{ color: "var(--accent)", fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400 }}>
            IntelliView
          </span>{" "}
          today 🚀
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Username */}
          <div style={styles.fieldGroup}>
            <label htmlFor="register-username" style={styles.label}>Username</label>
            <input
              id="register-username"
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              style={styles.input}
              onFocus={e => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={e => Object.assign(e.target.style, { borderColor: "var(--border-mid)", boxShadow: "none" })}
            />
          </div>

          {/* Email */}
          <div style={styles.fieldGroup}>
            <label htmlFor="register-email" style={styles.label}>Email address</label>
            <input
              id="register-email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
              onFocus={e => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={e => Object.assign(e.target.style, { borderColor: "var(--border-mid)", boxShadow: "none" })}
            />
          </div>

          {/* Password */}
          <div style={styles.fieldGroup}>
            <label htmlFor="register-password" style={styles.label}>Password</label>
            <input
              id="register-password"
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
              onFocus={e => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={e => Object.assign(e.target.style, { borderColor: "var(--border-mid)", boxShadow: "none" })}
            />
          </div>

          {/* Submit */}
          <button
            id="register-submit-btn"
            type="submit"
            disabled={loading}
            style={styles.submitBtn}
            onMouseEnter={e => {
              if (!loading) Object.assign(e.target.style, styles.submitBtnHover);
            }}
            onMouseLeave={e => {
              Object.assign(e.target.style, {
                background: "var(--accent)",
                transform: "translateY(0)",
                boxShadow: "0 2px 20px rgba(79,116,255,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
              });
            }}
          >
            {loading ? (
              <>
                <span style={styles.spinner} />
                Creating account…
              </>
            ) : (
              <>
                Create account
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Divider / trust line */}
        <div style={styles.divider}>
          <span style={styles.dividerLine} />
          <span style={styles.dividerText}>secure &amp; private</span>
          <span style={styles.dividerLine} />
        </div>

        {/* Footer link */}
        <p style={styles.footerText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.footerLink}>
            Sign in
          </Link>
        </p>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

/* ── Inline style objects ── */
const styles = {
  page: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1rem",
    background: "var(--ink)",
    overflow: "hidden",
    fontFamily: "var(--font-body)",
  },
  bgGrid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
    maskImage: "radial-gradient(ellipse 90% 70% at 50% 0%, black 30%, transparent 100%)",
    WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 0%, black 30%, transparent 100%)",
    pointerEvents: "none",
  },
  glow: {
    position: "absolute",
    top: "-180px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "900px",
    height: "600px",
    background: "radial-gradient(ellipse, rgba(79,116,255,0.12) 0%, rgba(124,92,252,0.07) 40%, transparent 70%)",
    pointerEvents: "none",
  },
  glowCorner: {
    position: "absolute",
    bottom: "-120px",
    right: "-80px",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(124,92,252,0.07) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  card: {
    position: "relative",
    width: "100%",
    maxWidth: "440px",
    borderRadius: "20px",
    border: "1px solid var(--border-mid)",
    background: "rgba(17,24,39,0.7)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    boxShadow: "0 32px 80px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.07) inset",
    padding: "2.5rem 2.25rem",
    display: "flex",
    flexDirection: "column",
    animation: "fadeSlideUp 0.45s ease both",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    fontFamily: "var(--font-mono)",
    fontSize: "0.68rem",
    fontWeight: 500,
    color: "var(--accent-3)",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    padding: "0.28rem 0.7rem",
    border: "1px solid rgba(34,211,165,0.25)",
    borderRadius: "4px",
    background: "rgba(34,211,165,0.07)",
    marginBottom: "1.5rem",
    width: "fit-content",
  },
  badgeDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "var(--accent-3)",
    boxShadow: "0 0 8px var(--accent-3)",
    display: "inline-block",
    flexShrink: 0,
  },
  heading: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.6rem, 2.5vw, 2rem)",
    fontWeight: 600,
    letterSpacing: "-0.022em",
    lineHeight: 1.15,
    color: "var(--text-1)",
    margin: "0 0 0.4rem",
    textAlign: "center",
  },
  sub: {
    fontSize: "0.875rem",
    color: "var(--text-2)",
    textAlign: "center",
    margin: "0 0 1.75rem",
    fontFamily: "var(--font-body)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.1rem",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
  },
  label: {
    fontFamily: "var(--font-body)",
    fontSize: "0.8125rem",
    fontWeight: 500,
    color: "var(--text-2)",
  },
  input: {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "10px",
    border: "1px solid var(--border-mid)",
    background: "rgba(11,15,26,0.6)",
    color: "var(--text-1)",
    fontFamily: "var(--font-body)",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.18s, box-shadow 0.18s",
    boxSizing: "border-box",
  },
  inputFocus: {
    borderColor: "var(--accent)",
    boxShadow: "0 0 0 3px rgba(79,116,255,0.18)",
  },
  submitBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.55rem",
    width: "100%",
    padding: "0.85rem 1.75rem",
    borderRadius: "10px",
    border: "none",
    background: "var(--accent)",
    color: "#fff",
    fontFamily: "var(--font-body)",
    fontSize: "0.9375rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 0.2s, transform 0.15s, box-shadow 0.2s",
    boxShadow: "0 2px 20px rgba(79,116,255,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
    marginTop: "0.5rem",
  },
  submitBtnHover: {
    background: "#6389ff",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 28px rgba(79,116,255,0.45)",
  },
  spinner: {
    display: "inline-block",
    width: "14px",
    height: "14px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
    flexShrink: 0,
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    margin: "1.5rem 0 0",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    background: "var(--border)",
  },
  dividerText: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.62rem",
    color: "var(--text-3)",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },
  footerText: {
    textAlign: "center",
    fontSize: "0.8125rem",
    color: "var(--text-3)",
    marginTop: "1rem",
    fontFamily: "var(--font-body)",
  },
  footerLink: {
    color: "var(--accent)",
    textDecoration: "none",
    fontWeight: 500,
    transition: "color 0.18s",
  },
};

export default Register;
