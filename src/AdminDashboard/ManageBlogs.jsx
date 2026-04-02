import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  Trash2,
  AlertCircle,
  Loader2,
  Calendar,
  User,
  Tag,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import axiosSecure from "../axios/AxiosSecure";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get("/blogs");
      setBlogs(
        Array.isArray(response.data) ? response.data : response.data.data || [],
      );
      setError(null);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to load blogs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (blogId, blogTitle) => {
    Swal.fire({
      title: "Delete Blog",
      text: `Are you sure you want to delete "${blogTitle}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setDeleting(blogId);
          const response = await axiosSecure.delete(`/blogs/${blogId}`);
          if (response.data.deletedCount === 1 || response.data.success) {
            setBlogs(blogs.filter((blog) => blog._id !== blogId));
            Swal.fire(
              "Deleted!",
              `"${blogTitle}" has been deleted successfully.`,
              "success",
            );
          }
        } catch (err) {
          console.error("Error deleting blog:", err);
          Swal.fire(
            "Error",
            "Failed to delete blog. Please try again.",
            "error",
          );
        } finally {
          setDeleting(null);
        }
      }
    });
  };

  // Get unique categories
  const categories = [
    "All",
    ...new Set(blogs.map((blog) => blog.category).filter(Boolean)),
  ];

  // Filter blogs by category
  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Manage Blogs
          </h1>
          <p className="text-gray-600">
            Total Blogs:{" "}
            <span className="font-semibold text-blue-600">{blogs.length}</span>
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
              onClick={fetchBlogs}
              className="ml-auto px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {categories.length > 1 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">
                Filter by Category
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`cursor-pointer px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {filteredBlogs.length === 0 && !error && (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500 text-lg">No blogs found.</p>
          </div>
        )}

        {filteredBlogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <div
                
                key={blog._id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 flex flex-col h-full"
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 h-48">
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${blog.title}&background=0D8ABC&color=fff&size=300`;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-500">
                      <Eye className="w-16 h-16 text-white opacity-50" />
                    </div>
                  )}
                </div>

                <div className="p-5 flex-grow flex flex-col">
                  {blog.category && (
                    <div className="mb-2">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                        {blog.category}
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {blog.title || "Untitled Blog"}
                  </h3>

                  {/* Description */}
                  {blog.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {blog.description}
                    </p>
                  )}

                  {/* Meta Information */}
                  <div className="space-y-2 mb-4 text-sm text-gray-600 border-t pt-3 mt-auto">
                    {blog.author && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="truncate">{blog.author}</span>
                      </div>
                    )}
                    {blog.date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{new Date(blog.date).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Content Preview */}
                  {blog.content && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200 max-h-24 overflow-hidden">
                      <p className="text-xs text-gray-600 line-clamp-3">
                        {typeof blog.content === "string"
                          ? blog.content.substring(0, 150) + "..."
                          : JSON.stringify(blog.content).substring(0, 150) +
                            "..."}
                      </p>
                    </div>
                  )}

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteBlog(blog._id, blog.title)}
                    disabled={deleting === blog._id}
                    className={`w-full py-2 rounded-lg transition duration-200 flex items-center justify-center gap-2 font-medium ${
                      deleting === blog._id
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                    {deleting === blog._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBlogs;
