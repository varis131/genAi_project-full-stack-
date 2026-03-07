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
    console.log(formData);
    navigate("/login");
  };

  return (
    <div
      className="hero-bg relative min-h-screen flex items-center justify-center 
                    overflow-hidden px-4 text-white"
    >
      {/* Card */}
      <div
        className="relative w-full max-w-md 
                      bg-white/5 backdrop-blur-2xl 
                      border border-white/10 
                      rounded-2xl p-10 shadow-2xl"
      >
        {/* Heading */}
        <h1 className="text-3xl font-semibold text-center mb-8">
          Create your account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg 
                         bg-white/5 border border-white/10 
                         text-white placeholder-gray-500
                         focus:outline-none focus:ring-2 
                         focus:ring-rose-400 focus:border-rose-400
                         transition"
            />
          </div>

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
                         focus:ring-rose-400 focus:border-rose-400
                         transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg 
                         bg-white/5 border border-white/10 
                         text-white placeholder-gray-500
                         focus:outline-none focus:ring-2 
                         focus:ring-rose-400 focus:border-rose-400
                         transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white
             bg-gradient-to-r from-rose-500 to-orange-500
             hover:from-rose-400 hover:to-orange-400
             transition duration-200 shadow-lg
             flex items-center justify-center gap-2
             disabled:opacity-60 disabled:cursor-not-allowed"
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
        <p className="text-center text-gray-400 text-sm mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-rose-300 hover:text-rose-200 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
