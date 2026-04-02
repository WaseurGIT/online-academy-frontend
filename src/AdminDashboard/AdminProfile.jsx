import React, { useState, useEffect, useContext } from "react";
import axiosSecure from "../../axios/axiosSecure";
import {
  Users,
  BookOpen,
  FileText,
  Edit2,
  LogOut,
  Mail,
  Calendar,
  Shield,
} from "lucide-react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";

const AdminProfile = () => {
  const { user, loading } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/email/${user.email}`)
        .then((res) => setUserInfo(res.data))
        .catch((err) => console.error(err));
    }
  }, [user?.email]);

  useEffect(() => {
    fetchUsers();
    fetchBlogs();
    fetchAssignments();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosSecure.get("/users");
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await axiosSecure.get("/blogs");
      setBlogs(
        Array.isArray(response.data) ? response.data : response.data.data || [],
      );
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  const fetchAssignments = async () => {
    try {
      const response = await axiosSecure.get("/assignments");
      setAssignments(
        Array.isArray(response.data) ? response.data : response.data.data || [],
      );
    } catch (err) {
      console.error("Error fetching assignments:", err);
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("adminEmail");
        window.location.href = "/login";
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

          <div className="px-6 md:px-8 pb-8">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 relative z-10 mb-8">
              <div className="flex-shrink-0">
                <img
                  src={userInfo?.image}
                  alt={userInfo?.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
              </div>

              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                    {userInfo?.name}
                  </h1>
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-lg text-gray-600 mb-3">{userInfo?.role}</p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span>{userInfo?.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>Joined {userInfo?.joinDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full md:w-auto">
                {/* <button
                  onClick={() => setIsEditMode(!isEditMode)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button> */}
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border-l-4 border-blue-600">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-700 font-semibold text-sm uppercase tracking-wide">
                Total Users
              </h3>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-4xl font-bold text-gray-800 mb-2">
              {users.length}
            </p>
            <p className="text-sm text-gray-500">Active members</p>
          </div>

          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border-l-4 border-purple-600">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-700 font-semibold text-sm uppercase tracking-wide">
                Total Blogs
              </h3>
              <BookOpen className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-4xl font-bold text-gray-800 mb-2">
              {blogs.length}
            </p>
            <p className="text-sm text-gray-500">Published Blogs</p>
          </div>

          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border-l-4 border-orange-600">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-700 font-semibold text-sm uppercase tracking-wide">
                Total Assignments
              </h3>
              <FileText className="w-8 h-8 text-orange-600" />
            </div>
            <p className="text-4xl font-bold text-gray-800 mb-2">
              {assignments.length}
            </p>
            <p className="text-sm text-gray-500">Created Assignments</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/dashboard/admin/manageUsers"
              className="block p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-md transition-shadow duration-200 group"
            >
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-800">Manage Users</h3>
              </div>
              <p className="text-sm text-gray-600">
                View and manage all student accounts
              </p>
            </a>

            <a
              href="/dashboard/admin/manageBlogs"
              className="block p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg border border-indigo-200 hover:shadow-md transition-shadow duration-200 group"
            >
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-6 h-6 text-indigo-600 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-800">Manage Blogs</h3>
              </div>
              <p className="text-sm text-gray-600">
                View and manage all blog posts
              </p>
            </a>
            
            <a
              href="/dashboard/admin/allAssignments"
              className="block p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200 hover:shadow-md transition-shadow duration-200 group"
            >
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-6 h-6 text-orange-600 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-800">Manage Assignments</h3>
              </div>
              <p className="text-sm text-gray-600">
                View and manage all assignments
              </p>
            </a>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            System Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                Admin Email
              </p>
              <p className="font-medium">{userInfo?.email || "N/A"}</p>
            </div>

            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                Last Updated
              </p>
              <p className="font-medium">{new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
