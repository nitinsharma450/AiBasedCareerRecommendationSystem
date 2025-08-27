import { NavLink } from "react-router";



export default function Header() {
  return (
    <header className="bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-extrabold italic tracking-wide">
          <NavLink to="/" className="hover:text-blue-400 transition-colors">
            Vision-Path
          </NavLink>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-8 text-lg font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-400" : "hover:text-blue-300 transition"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="hover:text-blue-300 transition"
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            className="hover:text-blue-300 transition"
          >
            Services
          </NavLink>
          <NavLink
            to="/contact"
            className="hover:text-blue-300 transition"
          >
            Contact
          </NavLink>
        </nav>

        {/* Auth Buttons */}
        <div className="flex gap-4">
          <NavLink
            to="/login"
            className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition"
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 transition shadow-lg"
          >
            Sign Up
          </NavLink>
        </div>
      </div>
    </header>
  );
}
