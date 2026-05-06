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
    <div
      className="relative min-h-screen flex items-center justify-center px-4 text-white overflow-hidden
      bg-slate-950"
    >
      {/* Glow Background */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] top-[-100px] left-[-100px] rounded-full"></div>
      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-[120px] bottom-[-100px] right-[-100px] rounded-full"></div>

      {/* Main Card */}
      <div className="relative w-full max-w-5xl flex rounded-3xl overflow-hidden border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-2xl">
        {/* 🔥 LEFT SIDE */}
        <div
          className="hidden md:flex flex-col justify-center w-1/2 p-12 
          bg-gradient-to-br from-white/5 to-transparent border-r border-white/10 relative"
        >
          {/* subtle glow */}
          <div className="absolute w-72 h-72 bg-indigo-500/10 blur-[100px] rounded-full -z-10"></div>

          <h1 className="text-4xl font-extrabold mb-6 tracking-wide flex items-center gap-2">
            Intelli<span className="text-indigo-400">View</span>
          </h1>

          <p className="text-slate-300 mb-8 leading-relaxed max-w-md">
            The next-generation AI Resume Analyzer. Discover your ATS score, skill gaps, and get personalized interview coaching.
          </p>

          <ul className="space-y-4 text-sm">
            {[
              "ATS Match Scoring",
              "Job Description Matching",
              "Skill Gap Analysis",
              "AI Interview Coach",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-300">
                <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-10 text-sm text-slate-500">
            Secure your dream job today 🚀
          </p>
        </div>

        {/* 🔐 RIGHT SIDE */}
        <div className="w-full md:w-1/2 p-12">
          <h1 className="text-3xl font-semibold text-center mb-2">
            Sign in to your account
          </h1>

          <p className="text-center text-slate-400 text-sm mb-8">
            Welcome back to <span className="text-indigo-400">IntelliView</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Email address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg 
                  bg-slate-950/50 border border-white/10 
                  text-white placeholder-slate-500
                  focus:outline-none focus:ring-2 
                  focus:ring-indigo-500 focus:border-indigo-500
                  transition"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-slate-300">Password</label>
                <span className="text-sm text-indigo-400 hover:text-indigo-300 cursor-pointer transition-colors">
                  Forgot password?
                </span>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pr-12 rounded-lg 
                    bg-slate-950/50 border border-white/10 
                    text-white placeholder-slate-500
                    focus:outline-none focus:ring-2 
                    focus:ring-indigo-500 focus:border-indigo-500
                    transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-400 transition"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-white
                bg-gradient-to-r from-indigo-500 to-purple-600
                hover:from-indigo-400 hover:to-purple-500
                hover:scale-[1.02] active:scale-95
                transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(99,102,241,0.2)]"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-slate-400 text-sm mt-8">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
