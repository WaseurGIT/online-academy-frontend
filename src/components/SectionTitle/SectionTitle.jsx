import React from "react";

const SectionTitle = ({ title }) => {
  return (
    <div className="text-center mb-14">
      {/* Small line */}
      <div className="flex justify-center mb-3">
        <span className="h-1 w-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"></span>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 capitalize">
        {title}
      </h1>
    </div>
  );
};

export default SectionTitle;
