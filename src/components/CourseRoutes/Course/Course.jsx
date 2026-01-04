import React from "react";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  const { course_id, course_name, course_image, course_price, stacks } = course;

  return (
    <div className="group relative bg-white/70 backdrop-blur-lg border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={course_image}
          alt={course_name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>

        {/* Price */}
        <span className="absolute top-4 right-4 bg-white/50 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow">
          ${course_price}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
          {course_name}
        </h3>

        {/* Stacks */}
        <div className="flex flex-wrap gap-2 mb-5">
          {stacks.slice(0, 4).map((stack, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium"
            >
              {stack}
            </span>
          ))}
          {stacks.length > 4 && (
            <span className="text-xs text-gray-500">
              +{stacks.length - 4} more
            </span>
          )}
        </div>

        {/* Button */}
        <Link
          to={`/course/${course_id}`}
          className="w-full inline-block text-center rounded-md
             bg-gradient-to-r from-blue-600 to-indigo-600
             text-white py-2.5 font-medium hover:opacity-90 transition"
        >
          View Details
        </Link>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-transparent group-hover:ring-blue-300 transition pointer-events-none"></div>
    </div>
  );
};

export default Course;
