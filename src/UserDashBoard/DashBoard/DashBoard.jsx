import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-26">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-4">
          Welcome, {user?.displayName || user?.email}
        </h1>

        <p className="text-gray-600 mb-6">
          Here’s your personal dashboard — track your activity below:
        </p>

        {/* Example stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg shadow">
            <h2 className="font-semibold text-xl">Courses Completed</h2>
            <p className="text-3xl font-bold text-blue-700">3</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg shadow">
            <h2 className="font-semibold text-xl">Assignments Submitted</h2>
            <p className="text-3xl font-bold text-green-700">7</p>
          </div>
        </div>

        {/* Add more as needed */}
      </div>
    </div>
  );
};

export default Dashboard;
