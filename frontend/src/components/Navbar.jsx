import React, { useState, useEffect } from "react";
import { useAuth } from "../features/auth/hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import { BrainCircuit, LogOut, LayoutDashboard, FileText } from "lucide-react";

const Navbar = () => {
  const { handleLogout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onLogout = async () => {
    await handleLogout();
    navigate('/login');
  };

  const navItem = "relative text-sm font-medium transition-colors hover:text-white flex items-center gap-2";

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/10 shadow-sm' : 'bg-transparent pt-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer group">
            <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg group-hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all">
              <BrainCircuit className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight">
              IntelliView
            </span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8 bg-slate-900/60 backdrop-blur-md border border-white/10 px-6 py-2.5 rounded-full shadow-lg">
            <Link
              to="/home"
              className={`${navItem} ${location.pathname === "/home" ? "text-indigo-400" : "text-slate-400"}`}
            >
              <LayoutDashboard className="w-4 h-4" /> Plan Interview
            </Link>

            <Link
              to="/home" 
              className={`${navItem} ${location.pathname.includes("/interview") ? "text-indigo-400" : "text-slate-400"}`}
            >
              <FileText className="w-4 h-4" /> Reports
            </Link>
          </div>

          {/* Logout Button */}
          <div className="flex items-center">
            <button
              onClick={onLogout}
              className="px-4 py-2 border border-white/10 bg-white/5 text-white text-sm font-semibold rounded-full hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
