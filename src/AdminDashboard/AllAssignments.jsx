import React, { useState, useEffect } from "react";
import axiosSecure from "../../axios/axiosSecure";
import Swal from "sweetalert2";
import {
  Trash2,
  AlertCircle,
  Loader2,
  Calendar,
  BookOpen,
  Award,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

const AllAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get("/assignments");
      setAssignments(
        Array.isArray(response.data) ? response.data : response.data.data || [],
      );
      setError(null);
    } catch (err) {
      console.error("Error fetching assignments:", err);
      setError("Failed to load assignments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAssignment = async (assignmentId, assignmentTitle) => {
    Swal.fire({
      title: "Delete Assignment",
      text: `Are you sure you want to delete "${assignmentTitle}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setDeleting(assignmentId);
          const response = await axiosSecure.delete(
            `/assignments/${assignmentId}`,
          );
          if (response.data.deletedCount === 1 || response.data.success) {
            setAssignments(
              assignments.filter(
                (assignment) => assignment._id !== assignmentId,
              ),
            );
            Swal.fire(
              "Deleted!",
              `"${assignmentTitle}" has been deleted successfully.`,
              "success",
            );
          }
        } catch (err) {
          console.error("Error deleting assignment:", err);
          Swal.fire(
            "Error",
            "Failed to delete assignment. Please try again.",
            "error",
          );
        } finally {
          setDeleting(null);
        }
      }
    });
  };

  const isDeadlinePassed = (deadline) => {
    return new Date(deadline) < new Date();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading assignments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            All Assignments
          </h1>
          <p className="text-gray-600">
            Total Assignments:{" "}
            <span className="font-semibold text-blue-600">
              {assignments.length}
            </span>
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-800">Error</h3>
              <p className="text-red-700">{error}</p>
            </div>
            <button
              onClick={fetchAssignments}
              className="ml-auto px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {assignments.length === 0 && !error && (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No assignments found.</p>
          </div>
        )}

        {assignments.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments.map((assignment) => {
              const deadlinePassed = isDeadlinePassed(assignment.deadline);
              return (
                <Link
                  to={`/assignment/${assignment._id}`}
                  key={assignment._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 flex flex-col h-full"
                >
                  {/* Image Section */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600 h-48">
                    {assignment.image ? (
                      <img
                        src={assignment.image}
                        alt={assignment.assignment_title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${assignment.assignment_title}&background=FF9500&color=fff&size=300`;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-orange-500">
                        <BookOpen className="w-16 h-16 text-white opacity-50" />
                      </div>
                    )}
                    {/* Assignment ID Badge */}
                    {assignment.id && (
                      <div className="absolute top-2 left-2 bg-orange-600 text-white px-2 py-1 rounded text-xs font-semibold">
                        {assignment.id}
                      </div>
                    )}
                    {/* Deadline Status Badge */}
                    <div
                      className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold ${
                        deadlinePassed
                          ? "bg-red-600 text-white"
                          : "bg-green-600 text-white"
                      }`}
                    >
                      {deadlinePassed ? "Overdue" : "Active"}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-5 flex-grow flex flex-col">
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                      {assignment.assignment_title || "Untitled Assignment"}
                    </h3>

                    {/* Description */}
                    {assignment.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {assignment.description}
                      </p>
                    )}

                    {/* Marks Info */}
                    {assignment.marks && (
                      <div className="mb-3 p-3 bg-orange-50 rounded-lg border border-orange-200 flex items-center gap-2">
                        <Award className="w-5 h-5 text-orange-600" />
                        <span className="font-semibold text-gray-700">
                          Total Marks:{" "}
                          <span className="text-orange-600">
                            {assignment.marks}
                          </span>
                        </span>
                      </div>
                    )}

                    {/* Deadline Info */}
                    {assignment.deadline && (
                      <div
                        className={`mb-4 p-3 rounded-lg border flex items-center gap-2 ${
                          deadlinePassed
                            ? "bg-red-50 border-red-200"
                            : "bg-green-50 border-green-200"
                        }`}
                      >
                        <Clock
                          className={`w-5 h-5 ${deadlinePassed ? "text-red-600" : "text-green-600"}`}
                        />
                        <div className="flex-grow">
                          <p
                            className={`text-sm font-semibold ${deadlinePassed ? "text-red-700" : "text-green-700"}`}
                          >
                            Deadline:{" "}
                            {new Date(assignment.deadline).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Delete Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAssignment(
                          assignment._id,
                          assignment.assignment_title,
                        );
                      }}
                      disabled={deleting === assignment._id}
                      className={`w-full py-2 rounded-lg transition duration-200 flex items-center justify-center gap-2 font-medium ${
                        deleting === assignment._id
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                      }`}
                    >
                      <Trash2 className="w-4 h-4" />
                      {deleting === assignment._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAssignments;
