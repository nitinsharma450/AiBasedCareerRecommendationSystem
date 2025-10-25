import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { ApiConfigs } from "../lib/ApiConfigs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<any>({});
  const [loginForm, setLoginForm] = useState<any>({ email: "", password: "" });
  let navigate=useNavigate()

  async function submit(e: any) {
    e.preventDefault(); // prevent page refresh

    let errors: any = {};

    // validations
    if (!loginForm.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
      errors.email = "Enter a valid email address";
    }

    if (!loginForm.password) {
      errors.password = "Password is required";
    } else if (loginForm.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    // if errors, set state
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    setError({}); // clear errors if valid

    // --- API Call Example ---
    try {
      const res = await fetch(`${ApiConfigs.Endpoint}user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });

      const jsonResponse = await res.json();

      if (jsonResponse.status==200) {
       toast.success('login sucessfully')
       let usableToken={
        token:jsonResponse.data.token,
        user_id:jsonResponse.data.user_id
       }
       localStorage.setItem(ApiConfigs.userLocalStorage,JSON.stringify(usableToken))
       navigate('/')
      } else {
        toast.error('login failed');
      }
    } catch (err) {
      console.error("Error:", err);
   toast.error('login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-6">
          Sign in to continue your career journey
        </p>

        {/* Form */}
        <form className="space-y-4" onSubmit={submit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, email: e.target.value })
                }
                type="email"
                placeholder="Enter your email"
                className="w-full outline-none"
              />
            </div>
            {error.email && (
              <p className="text-red-500 text-sm mt-1">{error.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <FaLock className="text-gray-400 mr-2" />
              <input
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 ml-2"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {error.password && (
              <p className="text-red-500 text-sm mt-1">{error.password}</p>
            )}
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Forgot your password?
            </a>
          </div>

          {/* API error */}
          {error.api && (
            <p className="text-red-500 text-center text-sm">{error.api}</p>
          )}

          {/* Sign In button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">New to CareerAI?</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Create account button */}
        <button
          type="button"
          className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition"
        >
          Create your account
        </button>
      </div>
    </div>
  );
}
