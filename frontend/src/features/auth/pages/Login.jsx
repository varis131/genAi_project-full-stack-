import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { loading, handleLogin } = useAuth();

  const [formData, setFormData] = useState({
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
    await handleLogin(formData);
    navigate("/"); // Redirects back to AnalyzerPage which is the root
  };

  return (
    <div style={styles.page}>
      {/* Background grid */}
      <div style={styles.bgGrid} aria-hidden="true" />
      {/* Radial glow */}
      <div style={styles.glow} aria-hidden="true" />

      {/* Main Card */}
      <div style={styles.card}>

        {/* ── LEFT SIDE: Branding ── */}
        <div style={styles.leftPanel}>
          {/* inner glow accent */}
          <div style={styles.leftGlow} aria-hidden="true" />

          {/* Badge */}
          <div style={styles.badge}>
            <span style={styles.badgeDot} />
            Gemini AI · Resume Intelligence
          </div>

          {/* Logo / Brand */}
          <h1 style={styles.brandHeadline}>
            Intelli<em style={styles.brandEm}>View</em>
          </h1>

          <p style={styles.brandSub}>
            The next-generation AI Resume Analyzer. Discover your ATS score,
            skill gaps, and get personalized interview coaching.
          </p>

          {/* Feature list */}
          <ul style={styles.featureList}>
            {[
              "ATS Match Scoring",
              "Job Description Matching",
              "Skill Gap Analysis",
              "AI Interview Coach",
            ].map((item, i) => (
              <li key={i} style={styles.featureItem}>
                <span style={styles.featureDot} />
                {item}
              </li>
            ))}
          </ul>

          <p style={styles.tagline}>Secure your dream job today 🚀</p>
        </div>

        {/* ── RIGHT SIDE: Form ── */}
        <div style={styles.rightPanel}>
          <h2 style={styles.formHeading}>Sign in to your account</h2>
          <p style={styles.formSub}>
            Welcome back to{" "}
            <span style={{ color: "var(--accent)" }}>IntelliView</span>
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Email */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Email address</label>
              <input
                id="login-email"
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
              <div style={styles.labelRow}>
                <label style={styles.label}>Password</label>
                <span style={styles.forgotLink}>Forgot password?</span>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{ ...styles.input, paddingRight: "3rem" }}
                  onFocus={e => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={e => Object.assign(e.target.style, { borderColor: "var(--border-mid)", boxShadow: "none", paddingRight: "3rem" })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeBtn}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={loading}
              style={styles.submitBtn}
              onMouseEnter={e => {
                if (!loading) Object.assign(e.target.style, styles.submitBtnHover);
              }}
              onMouseLeave={e => {
                Object.assign(e.target.style, { background: "var(--accent)", transform: "translateY(0)", boxShadow: "0 2px 20px rgba(79,116,255,0.35), inset 0 1px 0 rgba(255,255,255,0.15)" });
              }}
            >
              {loading ? (
                <>
                  <span style={styles.spinner} />
                  Signing in…
                </>
              ) : (
                <>
                  Sign in
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Footer link */}
          <p style={styles.footerText}>
            Don't have an account?{" "}
            <Link to="/register" style={styles.footerLink}>
              Register
            </Link>
          </p>
        </div>
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
    background: "radial-gradient(ellipse, rgba(79,116,255,0.13) 0%, rgba(124,92,252,0.08) 40%, transparent 70%)",
    pointerEvents: "none",
  },
  card: {
    position: "relative",
    width: "100%",
    maxWidth: "900px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    borderRadius: "20px",
    overflow: "hidden",
    border: "1px solid var(--border-mid)",
    background: "rgba(17,24,39,0.7)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    boxShadow: "0 32px 80px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.07) inset",
    animation: "fadeSlideUp 0.45s ease both",
  },
  /* LEFT */
  leftPanel: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "3rem 2.5rem",
    background: "rgba(255,255,255,0.02)",
    borderRight: "1px solid var(--border)",
    overflow: "hidden",
  },
  leftGlow: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(79,116,255,0.09) 0%, transparent 70%)",
    pointerEvents: "none",
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
  brandHeadline: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
    fontWeight: 600,
    lineHeight: 1.1,
    letterSpacing: "-0.025em",
    color: "var(--text-1)",
    margin: "0 0 1rem",
  },
  brandEm: {
    fontStyle: "italic",
    fontWeight: 300,
    color: "var(--accent)",
  },
  brandSub: {
    fontSize: "0.875rem",
    color: "var(--text-2)",
    lineHeight: 1.75,
    margin: "0 0 1.75rem",
    maxWidth: "320px",
  },
  featureList: {
    listStyle: "none",
    margin: "0 0 1.75rem",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.7rem",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.65rem",
    fontSize: "0.875rem",
    color: "var(--text-2)",
    fontFamily: "var(--font-body)",
  },
  featureDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "var(--accent)",
    boxShadow: "0 0 10px rgba(79,116,255,0.7)",
    flexShrink: 0,
  },
  tagline: {
    fontSize: "0.8rem",
    color: "var(--text-3)",
    margin: 0,
    fontFamily: "var(--font-mono)",
    letterSpacing: "0.03em",
  },
  /* RIGHT */
  rightPanel: {
    padding: "3rem 2.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  formHeading: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.5rem, 2.5vw, 1.9rem)",
    fontWeight: 600,
    letterSpacing: "-0.02em",
    color: "var(--text-1)",
    margin: "0 0 0.4rem",
    textAlign: "center",
  },
  formSub: {
    fontSize: "0.875rem",
    color: "var(--text-2)",
    textAlign: "center",
    margin: "0 0 2rem",
    fontFamily: "var(--font-body)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.45rem",
  },
  labelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontFamily: "var(--font-body)",
    fontSize: "0.8125rem",
    fontWeight: 500,
    color: "var(--text-2)",
  },
  forgotLink: {
    fontFamily: "var(--font-body)",
    fontSize: "0.8125rem",
    color: "var(--accent)",
    cursor: "pointer",
    transition: "color 0.18s",
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
  eyeBtn: {
    position: "absolute",
    right: "0.85rem",
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "var(--text-3)",
    display: "flex",
    alignItems: "center",
    padding: 0,
    transition: "color 0.18s",
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
    marginTop: "0.25rem",
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
  footerText: {
    textAlign: "center",
    fontSize: "0.8125rem",
    color: "var(--text-3)",
    marginTop: "1.5rem",
    fontFamily: "var(--font-body)",
  },
  footerLink: {
    color: "var(--accent)",
    textDecoration: "none",
    fontWeight: 500,
    transition: "color 0.18s",
  },
};

export default Login;
