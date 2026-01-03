import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // your auth logic
    alert(`Email: ${email}\nPassword: ${password}`);
  };

  const handleGoogleLogin = () => {
    alert("Google login clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-4 pt-20">
      <div className="grid md:grid-cols-2 gap-10 max-w-5xl w-full">
        {/* Illustrative side */}
        <div className="hidden md:flex flex-col items-center justify-center">
          <img
            src="/login.png"
            alt="Login Illustration"
            className="w-3/4 animate-fadeIn"
          />
          <h2 className="mt-6 text-3xl font-bold text-indigo-700">
            Welcome Back!
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Log in to access your courses, manage progress, and continue
            learning.
          </p>
        </div>

        {/* Form side */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
            Sign In
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder=" "
                className="peer w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
              <label className="absolute left-4 -top-2 text-sm text-indigo-600 bg-white px-1 peer-focus:top-0 peer-focus:text-xs transition-all">
                Email
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder=" "
                className="peer w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
              <label className="absolute left-4 -top-2 text-sm text-indigo-600 bg-white px-1 peer-focus:top-0 peer-focus:text-xs transition-all">
                Password
              </label>
              <span
                className="absolute right-4 top-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
            </div>

            {/* Forgot Password */}
            <div className="text-right text-sm">
              <a
                href="/forgot-password"
                className="text-indigo-600 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Log In
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="mx-3 text-gray-500">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Social Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center py-3 border rounded-xl text-gray-700 hover:bg-gray-100 transition"
          >
            <FcGoogle size={24} className="mr-2" /> Continue with Google
          </button>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-gray-600 text-sm">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
