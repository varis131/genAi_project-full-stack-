import React from "react";
import { useAuth } from "../features/auth/hooks/useAuth";
const Navbar = () => {
  const { handleLogout } = useAuth();
  return (
    <nav className="w-full flex justify-center pt-6 absolute top-0 left-0 z-50">
      <div
        className="flex items-center gap-8 px-8 py-3 
        border border-white/10 
        rounded-full 
        bg-white/5 backdrop-blur-md"
      >
        {/* Logo */}
        <span className="text-white font-extrabold ">AI Interview</span>

        {/* Menu */}
        <span className="text-gray-300 hover:text-white cursor-pointer">
          Home
        </span>

        <span className="text-gray-300 hover:text-white cursor-pointer">
          Interview
        </span>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center text-sm px-4 py-2
                     rounded-full
                   bg-pink-500/90 hover:bg-pink-500
                   text-white transition cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
