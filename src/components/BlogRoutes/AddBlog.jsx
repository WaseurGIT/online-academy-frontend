import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Upload, AlertCircle, Loader2, Send } from "lucide-react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axiosSecure from "../../axios/AxiosSecure";

const AddBlog = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/email/${user.email}`)
        .then((res) => setUserInfo(res.data))
        .catch((err) => console.error(err));
    }
  }, [user?.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = userInfo?.email
    const title = form.title.value;
    const content = form.content.value;
    const author = form.author.value;
    const authorProfile = form.authorProfile.value;
    const date = form.date.value;
    const category = form.category.value;
    const image = form.image.value;

    try {
      setLoading(true);
      const blogData = {
        title,
        email,
        content,
        author,
        authorProfile,
        date,
        category,
        image,
      };

      const response = await axiosSecure.post("/blogs", blogData);

      if (response.data.success) {
        Swal.fire("Success!", "Blog added successfully", "success");
        form.reset();
        navigate('/blogs');
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Error adding blog:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message ||
          "Failed to add blog. Please try again.",
        "error",
      );
    }
  };

  const categories = [
    "Technology",
    "Artificial Intelligence",
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Cloud Computing",
    "Cybersecurity",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12 sm:px-6 sm:py-12 md:px-8 md:py-16">
      <div className="max-w-3xl mx-auto mt-6 sm:mt-8 md:mt-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Add New Blog
          </h1>
          <p className="text-sm sm:text-base text-gray-600">Share your knowledge and expertise</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8"
        >
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                Blog Title <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter blog title"
                className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                Content <span className="text-red-600">*</span>
              </label>
              <textarea
                name="content"
                type="text"
                placeholder="Write your blog content here..."
                rows="6"
                className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Author Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="author"
                  value={userInfo?.name}
                  placeholder="Enter author name"
                  className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Author Profile URL
                </label>
                <input
                  type="url"
                  name="authorProfile"
                  value={userInfo?.photoURL || ""}
                  placeholder="https://example.com/profile.jpg"
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Publication Date <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={new Date().toISOString().split("T")[0]}
                  className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                Blog Image
              </label>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1">
                  <label className="flex items-center justify-center w-full px-3 sm:px-4 py-3 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:bg-blue-50 transition">
                    <div className="flex flex-col sm:flex-row items-center gap-2 text-center">
                      <Upload className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-gray-700">
                        Click to upload or paste URL
                      </span>
                    </div>
                    <input type="file" accept="image/*" className="hidden" />
                  </label>
                </div>

                {imagePreview && (
                  <div className="flex justify-center sm:justify-start">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border-2 border-blue-300"
                    />
                  </div>
                )}
              </div>

              <div className="mt-3 sm:mt-4">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Or enter image URL
                </label>
                <input
                  type="url"
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                />
              </div>
            </div>

            <div className="pt-4 sm:pt-6 border-t">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 sm:py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2 font-semibold text-sm sm:text-base ${
                  loading
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 sm:w-5 h-4 sm:h-5 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 sm:w-5 h-4 sm:h-5" />
                    Publish Blog
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
