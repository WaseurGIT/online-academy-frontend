import React, { useState, useEffect } from "react";
import axiosSecure from "../../axios/axiosSecure";
import Swal from "sweetalert2";
import { Trash2, AlertCircle, Loader2 } from "lucide-react";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get("/users");
      if (response.data.success) {
        setUsers(response.data.data);
        setError(null);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    Swal.fire({
      title: "Delete User",
      text: `Are you sure you want to delete ${userName}? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setDeleting(userId);
          const response = await axiosSecure.delete(`/users/${userId}`);
          if (response.data.success) {
            setUsers(users.filter((user) => user._id !== userId));
            Swal.fire(
              "Deleted!",
              `${userName} has been deleted successfully.`,
              "success",
            );
          }
        } catch (err) {
          console.error("Error deleting user:", err);
          Swal.fire(
            "Error",
            "Failed to delete user. Please try again.",
            "error",
          );
        } finally {
          setDeleting(null);
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 my-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            All Users
          </h1>
          <p className="text-gray-600">
            Total Users:{" "}
            <span className="font-semibold text-blue-600">{users.length}</span>
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
              onClick={fetchUsers}
              className="ml-auto px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {users.length === 0 && !error && (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500 text-lg">No users found.</p>
          </div>
        )}

        {users.length > 0 && (
          <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Joined Date
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 transition duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-600">
                            {user.name?.charAt(0) || "U"}
                          </div>
                          <span className="text-gray-800 font-medium">
                            {user.name || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {user.email || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-800"
                              : user.role === "teacher"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {user.role || "student"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDeleteUser(user._id, user.name)}
                          disabled={deleting === user._id}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition duration-200 ${
                            deleting === user._id
                              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                              : "bg-red-50 text-red-600 hover:bg-red-100"
                          }`}
                        >
                          <Trash2 className="w-4 h-4" />
                          {deleting === user._id ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {users.length > 0 && (
          <div className="md:hidden space-y-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-lg shadow p-4 border border-gray-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-600">
                      {user.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {user.name || "N/A"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {user.email || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Role:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : user.role === "teacher"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {user.role || "student"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Joined:</span>
                    <span className="text-gray-700 text-sm font-medium">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteUser(user._id, user.name)}
                  disabled={deleting === user._id}
                  className={`w-full py-2 rounded-lg transition duration-200 flex items-center justify-center gap-2 ${
                    deleting === user._id
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-red-50 text-red-600 hover:bg-red-100"
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                  {deleting === user._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
