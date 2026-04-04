import React from "react";
import { useAuth } from "../features/auth/hooks/useAuth";
import { Link, useLocation } from "react-router";

const Navbar = () => {
  const { handleLogout } = useAuth();
  const location = useLocation();

  const navItem =
    "relative text-sm md:text-base text-gray-300 transition duration-300 ease-in-out transform hover:scale-110 hover:text-white whitespace-nowrap shrink-0";

  return (
    <nav className="w-full flex justify-center pt-6 absolute top-0 left-0 z-50">
      <div
        className="flex items-center justify-between gap-4 md:gap-10 px-5 md:px-10 py-3 
        border border-white/10 
        rounded-full 
        bg-white/5 backdrop-blur-md shadow-lg max-w-[95vw] overflow-x-auto no-scrollbar"
      >
        {/* Logo */}
        <Link
          to="/"
          className="text-white font-extrabold text-base md:text-lg tracking-wide hover:scale-105 transition duration-300 whitespace-nowrap shrink-0"
        >
          Home
        </Link>

        {/* Menu */}
        <Link
          to="/home"
          className={`${navItem} ${
            location.pathname === "/home" ? "text-white" : ""
          }`}
        >
          Plan Interview
        </Link>

        <Link
          to="/interview/123"
          className={`${navItem} ${
            location.pathname.includes("/interview") ? "text-white" : ""
          }`}
        >
          Report
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="ml-2 md:ml-4 px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-medium
                     bg-gradient-to-r from-pink-500 to-rose-500
                     hover:from-pink-600 hover:to-rose-600
                     text-white shadow-md
                     transform hover:scale-105 transition duration-300 cursor-pointer whitespace-nowrap shrink-0"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
