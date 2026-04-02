import React, { useState, useContext, useEffect } from "react";
import axiosSecure from "../../axios/AxiosSecure";
import Swal from "sweetalert2";
import { Upload, AlertCircle, Loader2, Send } from "lucide-react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const AddAssignment = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    assignment_title: "",
    author: "",
    email: "",
    description: "",
    marks: "",
    deadline: "",
    image: "",
  });

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

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

    try {
      setLoading(true);

      const response = await axiosSecure.post("/assignments", formData);

      if (response.data.success || response.status === 201) {
        Swal.fire("Success!", "Assignment created successfully", "success");
        setFormData({
          assignment_title: "",
          author: "",
          email: "",
          description: "",
          marks: "",
          deadline: "",
          image: "",
        });
        navigate("/assignments");
      }
    } catch (error) {
      console.error("Error creating assignment:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message ||
          "Failed to create assignment. Please try again.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-3xl mt-12 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Create New Assignment
          </h1>
          <p className="text-gray-600">
            Design and publish a new assignment for your students
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Assignment Title <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="assignment_title"
                value={formData.assignment_title}
                onChange={(e) =>
                  setFormData({ ...formData, assignment_title: e.target.value })
                }
                placeholder="Enter assignment title"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Author Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="author"
                  defaultValue={userInfo?.name || ""}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Author Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={userInfo?.email}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Assignment Description <span className="text-red-600">*</span>
              </label>
              <textarea
                type="text"
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe the assignment requirements and details..."
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total Marks <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  name="marks"
                  value={formData.marks}
                  onChange={(e) =>
                    setFormData({ ...formData, marks: e.target.value })
                  }
                  placeholder="Enter total marks"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deadline <span className="text-red-600">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="deadline"
                  value={formData.deadline}
                  onChange={(e) =>
                    setFormData({ ...formData, deadline: e.target.value })
                  }
                  placeholder="Select deadline"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assignment Image <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
              />
            </div>

            <div className="pt-6 border-t">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2 font-semibold ${
                  loading
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Create Assignment
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

export default AddAssignment;
