import React, { useContext, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import axios from "axios";

const Register = () => {
  const { createUser } = useContext(AuthContext);

  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    // Validations
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setError("Password must contain one special character.");
      return;
    } else {
      setError("");
    }

    try {
      const result = await createUser(email, password);
      const user = result.user;

      // Update Firebase profile
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      const userData = {
        name: name,
        photoURL: photoURL,
        email: email,
        password: password,
      };

      await axios.post("http://localhost:5000/users", userData);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Account Created Successfully",
        showConfirmButton: false,
        timer: 2000,
      });

      form.reset();
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-4 relative overflow-hidden pt-20">
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
                required
                placeholder="Ana de Armas"
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
                placeholder="profile.png"
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
                required
                placeholder="ana@gmail.com"
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
                required
                placeholder="******"
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

            <div className="flex justify-center">
              <h1 className="text-md text-red-500">{error}</h1>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Sign Up
            </button>
          </form>

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
