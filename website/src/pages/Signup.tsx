import { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ApiConfigs } from "../lib/ApiConfigs";

export default function Signup() {
let navigate=useNavigate()

  const [errors, setError] = useState<any>({});
  const [signupForm, setSignupForm] = useState<any>({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  async function onHandleSubmit() {
    let newErrors: any = {};

    if (!signupForm.fname) {
      newErrors.fname = "First name is required";
    }

    if (!signupForm.lname) {
      newErrors.lname = "Last name is required";
    }

    if (!signupForm.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(signupForm.email)
    ) {
      newErrors.email = "Invalid email format";
    }

    if (!signupForm.password) {
      newErrors.password = "Password is required";
    } else if (signupForm.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!signupForm.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (signupForm.password !== signupForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setError(newErrors);

     
    if (Object.keys(newErrors).length > 0) return;

   
    try {
      let response = await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupForm),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
     let jsonResponse= await  response.json()
     if(jsonResponse.status==200){
        toast.success('signup successfully')
        navigate('/login')
     }
     else{
       toast.error('signup failed')
     }


    } catch (error) {
      console.error("Signup error:", error);
     toast.error('something went wrong')
    }
  }

  // 🔹 Clear errors when user types
  useEffect(() => {
    setError({});
  }, [signupForm]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-blue-800 to-black px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Create Account
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Join and start your AI-powered journey 🚀
        </p>

        {/* Signup Form */}
        <form className="space-y-4">
          {/* First & Last Name */}
          <div className="flex gap-3">
            <div className="w-1/2">
              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  value={signupForm.fname}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, fname: e.target.value })
                  }
                  type="text"
                  placeholder="First Name"
                  className="w-full outline-none"
                />
              </div>
              {errors.fname && (
                <span className="text-red-500 text-sm">{errors.fname}</span>
              )}
            </div>

            <div className="w-1/2">
              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  value={signupForm.lname}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, lname: e.target.value })
                  }
                  type="text"
                  placeholder="Last Name"
                  className="w-full outline-none"
                />
              </div>
              {errors.lname && (
                <span className="text-red-500 text-sm">{errors.lname}</span>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                value={signupForm.email}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, email: e.target.value })
                }
                type="email"
                placeholder="Email"
                className="w-full outline-none"
              />
            </div>
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                value={signupForm.password}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, password: e.target.value })
                }
                type="password"
                placeholder="Password"
                className="w-full outline-none"
              />
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                value={signupForm.confirmPassword}
                onChange={(e) =>
                  setSignupForm({
                    ...signupForm,
                    confirmPassword: e.target.value,
                  })
                }
                type="password"
                placeholder="Confirm Password"
                className="w-full outline-none"
              />
            </div>
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={onHandleSubmit}
            type="button"
            className="w-full bg-black text-white font-semibold py-3 rounded-lg shadow-md hover:bg-gray-800 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Button */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign up with Google
        </button>
      </div>
    </div>
  );
}
