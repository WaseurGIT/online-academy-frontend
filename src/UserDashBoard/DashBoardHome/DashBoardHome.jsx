import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
import { FaBook, FaCheckCircle, FaClipboardList } from "react-icons/fa";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [totalEnrolled, setTotalEnrolled] = useState(0);
  const [completedCourses, setCompletedCourses] = useState(0);
  const [submittedAssignments, setSubmittedAssignments] = useState(0);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:5000/my-courses?email=${user.email}`)
      .then((res) => setTotalEnrolled(res.data?.length || 0));

    axios
      .get(`http://localhost:5000/completed-courses?email=${user.email}`)
      .then((res) => setCompletedCourses(res.data?.completedCount || 0));

    axios
      .get(`http://localhost:5000/submitted-assignments?email=${user.email}`)
      .then((res) => setSubmittedAssignments(res.data?.submittedCount || 0))
      .catch((err) => {
        console.error("Error loading submitted assignments:", err);
      });
  }, [user?.email]);

  return (
    <div className="max-w-full mx-auto bg-white shadow-xl rounded-2xl p-8 mt-6">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">
        Welcome, {user?.displayName || user?.email}!
      </h1>
      <p className="text-gray-600 mb-6">
        Here’s your personal dashboard — track your activity below:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Enrolled */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-2xl p-6 shadow-lg flex flex-col items-center">
          <FaBook className="text-4xl mb-3" />
          <h2 className="text-xl font-semibold">Enrolled Courses</h2>
          <p className="text-4xl font-bold">{totalEnrolled}</p>
        </div>

        {/* Completed */}
        <div className="bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-2xl p-6 shadow-lg flex flex-col items-center">
          <FaCheckCircle className="text-4xl mb-3" />
          <h2 className="text-xl font-semibold">Courses Completed</h2>
          <p className="text-4xl font-bold">{completedCourses}</p>
        </div>

        {/* Assignments Submitted */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl p-6 shadow-lg flex flex-col items-center">
          <FaClipboardList className="text-4xl mb-3" />
          <h2 className="text-xl font-semibold">Assignments Submitted</h2>
          <p className="text-4xl font-bold">{submittedAssignments}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
