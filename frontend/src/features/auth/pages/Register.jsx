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
    <div
      className="relative min-h-screen flex items-center justify-center px-4 text-white overflow-hidden
      bg-slate-950"
    >
      {/* Glow Effects */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] top-[-100px] left-[-100px] rounded-full"></div>
      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-[120px] bottom-[-100px] right-[-100px] rounded-full"></div>

      {/* Card */}
      <div
        className="relative w-full max-w-md 
        bg-slate-900/60 backdrop-blur-xl 
        border border-white/10 
        rounded-3xl p-10 shadow-2xl"
      >
        {/* Heading */}
        <h1 className="text-3xl font-semibold text-center mb-2">
          Create your account
        </h1>

        <p className="text-center text-slate-400 text-sm mb-8">
          Join <span className="text-indigo-400 font-medium">IntelliView</span> today 🚀
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
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
            <label className="block text-sm text-slate-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
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

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white
              bg-gradient-to-r from-indigo-500 to-purple-600
              hover:from-indigo-400 hover:to-purple-500
              hover:scale-[1.02] active:scale-95
              transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.2)]
              disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating account...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-slate-400 text-sm mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
