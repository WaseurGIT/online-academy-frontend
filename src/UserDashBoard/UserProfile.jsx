import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import {
  Mail,
  Phone,
  ShieldCheck,
  Calendar,
  FileText,
  BookOpen,
  CheckCircle,
  Trash2,
  Calendar as CalendarIcon,
} from "lucide-react";
import axiosSecure from "../axios/AxiosSecure";

const UserProfile = () => {
  const { user, role, loading } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [stats, setStats] = useState({
    assignmentsCreated: 0,
    blogsCreated: 0,
    submissionsCount: 0,
    statsLoading: true,
  });

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/email/${user.email}`)
        .then((res) => setUserInfo(res.data))
        .catch((err) => console.error(err));

      setBlogsLoading(true);
      axiosSecure
        .get(`/blogs/email/${user.email}`)
        .then((res) => setBlogs(res.data || []))
        .catch((err) => {
          console.error("Error fetching blogs:", err);
          setBlogs([]);
        })
        .finally(() => setBlogsLoading(false));

      // Fetch statistics
      Promise.all([
        axiosSecure
          .get(`/assignments/byEmail/${user.email}`)
          .catch(() => ({ data: [] })),
        axiosSecure.get(`/blogs/email/${user.email}`).catch(() => ({ data: [] })),
        axiosSecure
          .get(`/assignment-submissions/by-student?email=${user.email}`)
          .catch(() => ({ data: { data: [] } })),
      ])
        .then(([assignmentsRes, blogsRes, submissionsRes]) => {
          setStats({
            assignmentsCreated: assignmentsRes.data?.length || 0,
            blogsCreated: blogsRes.data?.length || 0,
            submissionsCount: submissionsRes.data?.data?.length || 0,
            statsLoading: false,
          });
        })
        .catch((err) => {
          console.error("Error fetching stats:", err);
          setStats((prev) => ({ ...prev, statsLoading: false }));
        });
    }
  }, [user?.email]);

  const handleDeleteBlog = async (blogId, blogTitle) => {
    Swal.fire({
      title: "Delete Blog?",
      text: `Are you sure you want to delete "${blogTitle}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/blogs/${blogId}`);

          if (response.data.deletedCount > 0) {
            // Remove blog from state
            setBlogs((prevBlogs) =>
              prevBlogs.filter((blog) => blog._id !== blogId)
            );

            // Update stats
            setStats((prevStats) => ({
              ...prevStats,
              blogsCreated: prevStats.blogsCreated - 1,
            }));

            Swal.fire({
              title: "Deleted!",
              text: "Your blog has been deleted successfully.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
          }
        } catch (error) {
          console.error("Error deleting blog:", error);
          Swal.fire({
            title: "Error",
            text: error.response?.data?.message || "Failed to delete blog. Please try again.",
            icon: "error",
          });
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="h-40 bg-gradient-to-r from-indigo-500 to-blue-600"></div>
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 gap-6">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-300 flex items-center justify-center text-4xl font-bold text-white">
                {userInfo?.photoURL ? (
                  <img
                    src={userInfo.photoURL}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  userInfo?.name?.charAt(0)?.toUpperCase()
                )}
              </div>

              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-800">
                  {userInfo?.name || "User Name"}
                </h1>

                {role && (
                  <span className="inline-block mt-2 px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium capitalize">
                    {role}
                  </span>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-10">
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Mail className="text-blue-500" size={22} />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold">{userInfo?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Phone className="text-blue-500" size={22} />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold">
                    {userInfo?.phone || "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                  Assignments Created
                </p>
                <h3 className="text-4xl font-bold text-blue-600 mt-2">
                  {stats.statsLoading ? "..." : stats.assignmentsCreated}
                </h3>
              </div>
              <FileText className="text-blue-500" size={48} strokeWidth={1.5} />
            </div>
            <p className="text-gray-500 text-xs mt-4">
              Total assignments you've created
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                  Blogs Created
                </p>
                <h3 className="text-4xl font-bold text-green-600 mt-2">
                  {stats.statsLoading ? "..." : stats.blogsCreated}
                </h3>
              </div>
              <BookOpen
                className="text-green-500"
                size={48}
                strokeWidth={1.5}
              />
            </div>
            <p className="text-gray-500 text-xs mt-4">
              Total blogs you've published
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                  Submitted Assignments
                </p>
                <h3 className="text-4xl font-bold text-purple-600 mt-2">
                  {stats.statsLoading ? "..." : stats.submissionsCount}
                </h3>
              </div>
              <CheckCircle
                className="text-purple-500"
                size={48}
                strokeWidth={1.5}
              />
            </div>
            <p className="text-gray-500 text-xs mt-4">
              Total assignments you've submitted
            </p>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            Account Information
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <ShieldCheck className="text-green-600" size={22} />
              <p>
                Email Verified:{" "}
                {user?.emailVerified ? (
                  <span className="text-green-600 font-semibold">Yes</span>
                ) : (
                  <span className="text-red-500 font-semibold">No</span>
                )}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Calendar className="text-blue-500" size={22} />
              <p>
                Account Created:{" "}
                {user?.metadata?.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Calendar className="text-purple-500" size={22} />
              <p>
                Last Sign In:{" "}
                {user?.metadata?.lastSignInTime
                  ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* My Blogs Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <BookOpen className="text-green-600" size={28} />
            My Blogs
          </h2>

          {blogsLoading ? (
            <div className="flex justify-center items-center py-12">
              <p className="text-gray-500 text-lg">Loading blogs...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <BookOpen className="text-gray-300 mb-4" size={64} />
              <p className="text-gray-500 text-lg">No blogs published yet</p>
              <p className="text-gray-400 text-sm mt-2">
                Start sharing your knowledge by creating a blog
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="border rounded-lg overflow-hidden hover:shadow-lg transition"
                >
                  {blog.image && (
                    <div className="h-40 bg-gray-200 overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover hover:scale-105 transition"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                      {blog.content}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded">
                        {blog.category || "Uncategorized"}
                      </span>
                      <div className="flex items-center gap-1">
                        <CalendarIcon size={14} />
                        {blog.date
                          ? new Date(blog.date).toLocaleDateString()
                          : "N/A"}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <span className="text-xs font-semibold text-gray-700">
                        By {blog.author || "Anonymous"}
                      </span>
                      <button
                        onClick={() => handleDeleteBlog(blog._id, blog.title)}
                        className="text-red-500 hover:text-red-700 transition hover:scale-110"
                        title="Delete blog"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
