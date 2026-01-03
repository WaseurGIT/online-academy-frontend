import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    photoURL: "",
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registered:", formData);
    alert("Registered Successfully 🚀");
    // Add your signup logic here (Firebase / Auth API / backend)
  };

  const handleGoogleSignup = () => {
    alert("Google signup clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-4 relative overflow-hidden py-20">
      {/* Background decorative blurred circles */}
      <div className="absolute -top-40 -left-40 w-72 h-72 bg-purple-400/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-72 h-72 bg-blue-500/40 rounded-full blur-3xl animate-pulse"></div>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl w-full">
        {/* Illustrative Side (desktop) */}
        <div className="hidden md:flex flex-col items-center justify-center">
          <img
            src="/register.webp"
            alt="Register Illustration"
            className="w-3/4 animate-fadeIn"
          />
          <h2 className="mt-6 text-3xl font-bold text-indigo-700">
            Join Us Today!
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Create your account to start learning and track your progress.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-12 relative z-10 animate-fadeIn">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
            Create Account
          </h2>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name */}
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
              <label className="absolute left-4 -top-2 text-sm text-indigo-600 bg-white px-1 peer-focus:top-0 peer-focus:text-xs transition">
                Full Name
              </label>
            </div>

            {/* Photo URL */}
            <div className="relative">
              <input
                type="text"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
              <label className="absolute left-4 -top-2 text-sm text-indigo-600 bg-white px-1 peer-focus:top-0 peer-focus:text-xs transition">
                Photo URL
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
              <label className="absolute left-4 -top-2 text-sm text-indigo-600 bg-white px-1 peer-focus:top-0 peer-focus:text-xs transition">
                Email
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
              <label className="absolute left-4 -top-2 text-sm text-indigo-600 bg-white px-1 peer-focus:top-0 peer-focus:text-xs transition">
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

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Sign Up
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="mx-3 text-gray-500">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Social Signup */}
          <button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center py-3 border rounded-xl text-gray-700 hover:bg-gray-100 transition"
          >
            <FcGoogle size={24} className="mr-2" />
            Continue with Google
          </button>

          {/* Already Have Account */}
          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
