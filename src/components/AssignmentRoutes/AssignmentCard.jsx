import React from "react";
import { Link } from "react-router-dom";

const AssignmentCard = ({ assignment }) => {
  const { image, assignment_title, description, marks, deadline } = assignment;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="relative h-40 overflow-hidden">
        <img
          src={image}
          alt={assignment_title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {assignment_title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>

        <div className="flex justify-between items-center mt-auto text-gray-500 text-sm">
          <span>Marks: {marks}</span>
          <span>Deadline: {deadline}</span>
        </div>

        <Link
          to={`/assignments/${assignment.id}`}
          className="
    mx-auto               
    block                 
    bg-gradient-to-r
      from-blue-600
      to-indigo-600
    text-white 
    py-2 px-6 mt-4           
    rounded-md 
    font-medium 
    shadow
    hover:shadow-lg 
    hover:scale-105 
    transform 
    transition 
    duration-300
  "
        >
          View More
        </Link>
      </div>
    </div>
  );
};

export default AssignmentCard;
