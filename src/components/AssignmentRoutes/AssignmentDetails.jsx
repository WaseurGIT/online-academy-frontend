import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosSecure from "../../axios/AxiosSecure";

const AssignmentDetails = () => {
  const { id } = useParams(); // id = assignment_id (like "A-101")
  const [assignment, setAssignment] = useState(null);

  useEffect(() => {
    axiosSecure
      .get(`/assignments/${id}`)
      .then((res) => setAssignment(res.data))
      .catch((err) => console.error("Error fetching assignment:", err));
  }, [id]);

  if (!assignment) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-medium">
        Loading assignment details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-26 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Image */}
        <div className="relative h-64 md:h-96 overflow-hidden">
          <img
            src={assignment.image}
            alt={assignment.assignment_title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {assignment.assignment_title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 text-gray-500 text-sm">
            <span>Marks: {assignment.marks}</span>
            <span>Deadline: {assignment.deadline}</span>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            {assignment.description}
          </p>

          <Link
            to="/assignments"
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-6 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform transition duration-300"
          >
            Back to Assignments
          </Link>
          <Link
            to={`/assignments/submit/${id}`}
            className="inline-block bg-gradient-to-r  text-blue-500 border-2 border-blue-500 py-2 px-6 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform transition duration-300 ml-5"
          >
            Submit Assignments
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetails;
