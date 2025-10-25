import { NavLink } from "react-router";
import { AuthenticationService } from "../lib/AuthencationService";
import { useEffect, useState } from "react";
import { ApiConfigs } from "../lib/ApiConfigs";
import { Api } from "../lib/ApiService";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showUserDetails, setUserDetails] = useState<any>({});
  const [userId, setUserId] = useState<number | null>(null);
  const [userDetailsModel, setUserDetailsModel] = useState<boolean>(false);

  // ✅ Check authentication
  async function authencationCheck() {
    if (await AuthenticationService.isAuthenticated()) {
      setIsAuthenticated(true);
    }
  }

  // ✅ Get userId from localStorage
  function loadUserIdFromStorage() {
    let res = localStorage.getItem(ApiConfigs.userLocalStorage);
    if (res) {
      try {
        const parsed = JSON.parse(res);
        if (parsed.user_id) {
          setUserId(parsed.user_id); // update state
        }
      } catch (e) {
        console.error("Error parsing localStorage data:", e);
      }
    }
  }

  // ✅ Fetch user details (only after userId is set)
  async function fetchUserDetails() {
    try {
      if (await AuthenticationService.isAuthenticated()) {
        let response = await Api("user/details", { userId });
        console.log(response);
        if (response) {
          setUserDetails(response.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  // 1️⃣ Run on mount
  useEffect(() => {
    authencationCheck();
    loadUserIdFromStorage();
  }, []);

  // 2️⃣ When userId changes, fetch details
  useEffect(() => {
    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

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
          <div className="hover:text-blue-300 transition">About</div>
          <NavLink to="/services" className="hover:text-blue-300 transition">
            Services
          </NavLink>
          <NavLink to="/contact" className="hover:text-blue-300 transition">
            Contact
          </NavLink>
        </nav>

        {/* Auth Buttons */}
        <div className="flex gap-4">
          {isAuthenticated ? (
            <NavLink
              to="/logout"
              className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition"
            >
              Logout
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition"
            >
              Login
            </NavLink>
          )}

          <NavLink
            to="/signup"
            className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 transition shadow-lg"
          >
            Sign Up
          </NavLink>
          {isAuthenticated &&(<div className="relative">
            {/* Avatar Circle */}
            <div
              className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold cursor-pointer shadow-md"
              onMouseEnter={() => setUserDetailsModel(true)}
              onMouseLeave={() => setUserDetailsModel(false)}
            >
              {showUserDetails?.first_name
                ? showUserDetails.first_name.charAt(0).toUpperCase()
                : "U"}
            </div>

            {/* Dropdown Card */}
            {userDetailsModel && (
              <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
                {/* User Info */}
                <div className="p-4 flex items-center gap-3">
                  <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                    {showUserDetails?.first_name
                      ? showUserDetails.first_name.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {showUserDetails.first_name} {showUserDetails.last_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {showUserDetails.email}
                    </p>
                  </div>
                </div>

                <hr className="border-gray-200" />
              </div>
            )}
          </div>)}
        </div>
      </div>
    </header>
  );
}
