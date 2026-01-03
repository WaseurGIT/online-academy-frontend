import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <img
        src="/errorpage.webp"
        alt="404 background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center text-white">
        <h1 className="text-8xl md:text-9xl font-extrabold animate-pulse">
          404
        </h1>

        <p className="mt-6 text-xl md:text-2xl font-semibold">
          Oops! Page not found.
        </p>

        <p className="mt-3 max-w-xl text-gray-200">
          The page you are looking for might have been removed, renamed, or is
          temporarily unavailable.
        </p>

        <Link
          to="/"
          className="mt-10 inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
