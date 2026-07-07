import React from "react";
import { Link } from "react-router";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container-xl footer-inner">
        {/* Brand */}
        <Link to="/" className="footer-brand" aria-label="IntelliView home">
          <div
            style={{
              width: "22px",
              height: "22px",
              background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              fontWeight: "600",
              color: "#fff",
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            IV
          </div>
          <span className="footer-brand-text">IntelliView</span>
        </Link>

        {/* Links */}
        <ul className="footer-links" role="list">
          <li><a href="#features">Features</a></li>
          <li><a href="#how-it-works">How it works</a></li>
          <li><a href="#feedback">AI Feedback</a></li>
          <li><Link to="/login">Sign in</Link></li>
        </ul>

        {/* Copyright */}
        <p className="footer-copy">
          © {year} IntelliView
        </p>
      </div>
    </footer>
  );
};

export default Footer;
