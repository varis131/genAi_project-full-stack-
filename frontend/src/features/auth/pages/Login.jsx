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
    navigate("/");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 text-white overflow-hidden
      bg-gradient-to-br from-[#1a0b2e] via-[#0b0f19] to-[#020617]">

      {/* Glow Effects */}
      <div className="absolute w-[500px] h-[500px] bg-pink-500/20 blur-[120px] top-[-100px] left-[-100px] rounded-full"></div>
      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-[120px] bottom-[-100px] right-[-100px] rounded-full"></div>

      {/* Card */}
      <div className="relative w-full max-w-md 
        bg-white/5 backdrop-blur-xl 
        border border-white/10 
        rounded-2xl p-10 shadow-2xl">

        {/* Heading */}
        <h1 className="text-3xl font-semibold text-center mb-2">
          Sign in to your account
        </h1>

        <p className="text-center text-gray-400 text-sm mb-8">
          Welcome back to <span className="text-pink-400">IntelliView</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
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
                bg-white/5 border border-white/10 
                text-white placeholder-gray-500
                focus:outline-none focus:ring-2 
                focus:ring-pink-500 focus:border-pink-500
                transition"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm text-gray-300">Password</label>
              <span className="text-sm text-pink-400 hover:text-pink-300 cursor-pointer">
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
                  bg-white/5 border border-white/10 
                  text-white placeholder-gray-500
                  focus:outline-none focus:ring-2 
                  focus:ring-pink-500 focus:border-pink-500
                  transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-400 transition"
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
              bg-gradient-to-r from-pink-500 to-purple-500
              hover:from-pink-400 hover:to-purple-400
              hover:scale-[1.02]
              transition flex items-center justify-center gap-2 cursor-pointer"
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
        <p className="text-center text-gray-400 text-sm mt-8">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-pink-400 hover:text-pink-300 font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
