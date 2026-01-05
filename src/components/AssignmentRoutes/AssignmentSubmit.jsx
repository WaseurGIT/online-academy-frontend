import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import axiosSecure from "../../axios/AxiosSecure";

const AssignmentSubmit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    studentName: user?.displayName || "",
    studentEmail: user?.email || "",
    assignmentId: id,
    fileUrl: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axiosSecure.post(
        "http://localhost:5000/assignment-submissions",
        formData
      );
      alert("📨 Assignment submitted successfully!");
      navigate("/assignments");
    } catch (err) {
      console.error(err);
      alert("❌ Submission failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <h2 className="text-2xl font-bold">Submit Assignment</h2>
          <p className="mt-1 text-sm opacity-90">
            Assignment ID: <span className="font-semibold">{id}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Your Name
            </label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              disabled
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 bg-gray-50"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Your Email
            </label>
            <input
              type="email"
              name="studentEmail"
              value={formData.studentEmail}
              disabled
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 bg-gray-50"
            />
          </div>

          {/* Optional File URL */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              File URL (optional)
            </label>
            <input
              type="text"
              name="fileUrl"
              value={formData.fileUrl}
              onChange={handleChange}
              placeholder="Paste your file link here"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 rounded-lg text-white font-semibold text-lg ${
              submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } transition`}
          >
            {submitting ? "Submitting..." : "Submit Assignment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignmentSubmit;
