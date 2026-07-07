import React, { useState, useEffect } from "react";
import { useAuth } from "../features/auth/hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { user, handleLogout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onLogout = async () => {
    await handleLogout();
    navigate("/login");
  };

  const handleCTA = () => {
    if (!user) navigate("/login");
    else navigate("/home");
  };

  const isLanding = location.pathname === "/";

  return (
    <nav
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      role="navigation"
      aria-label="Primary navigation"
    >
      <div className="container-xl navbar-inner">
        {/* Logo */}
        <Link to="/" className="nav-logo" aria-label="IntelliView home">
          <div className="nav-logo-mark" aria-hidden="true">IV</div>
          <span className="nav-logo-text">IntelliView</span>
        </Link>

        {/* Center nav links (landing only) */}
        {isLanding && (
          <ul className="nav-links" role="list">
            <li>
              <a href="#features" className="nav-link">Features</a>
            </li>
            <li>
              <a href="#how-it-works" className="nav-link">How it works</a>
            </li>
            <li>
              <a href="#feedback" className="nav-link">AI Feedback</a>
            </li>
            <li>
              <a href="#report" className="nav-link">Reports</a>
            </li>
          </ul>
        )}

        {/* CTA */}
        <div className="nav-cta">
          {user ? (
            <>
              <Link to="/home" className="btn-ghost">Dashboard</Link>
              <button
                onClick={onLogout}
                className="btn-ghost"
                style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
              >
                <LogOut size={14} />
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost">Sign in</Link>
              <button onClick={handleCTA} className="btn-primary">
                Start free
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
