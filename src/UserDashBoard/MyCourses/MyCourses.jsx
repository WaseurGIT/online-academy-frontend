import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import axiosSecure from "../../axios/AxiosSecure";

const MyCourses = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = () => {
    if (!user?.email) return;
    setLoading(true);
    axiosSecure
      .get(`http://localhost:5000/my-courses?email=${user.email}`)
      .then((res) => setCourses(res.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCourses();
  }, [user?.email]);

  const handleComplete = async (course) => {
    try {
      await axiosSecure.patch("http://localhost:5000/enrollments/complete", {
        userEmail: user.email,
        courseId: course.course_id,
      });

      // refresh data
      fetchCourses();
      alert("Marked as completed!");
    } catch (error) {
      console.error(error);
      alert("Failed to mark complete.");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">My Enrolled Courses</h2>

      {loading ? (
        <p className="text-gray-600">Loading courses...</p>
      ) : courses.length === 0 ? (
        <p className="text-gray-600">No enrolled courses yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {courses.map((c) => (
            <div key={c._id} className="bg-gray-50 p-4 rounded-xl shadow">
              <img
                src={c.course_image}
                alt={c.course_name}
                className="h-40 w-full object-cover rounded-lg"
              />
              <h3 className="font-semibold mt-3 text-lg">{c.course_name}</h3>
              <p className="text-gray-600">${c.course_price}</p>

              <button
                className={`mt-3 w-full py-2 ${
                  c.completed
                    ? "bg-green-400 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                } rounded-lg font-semibold transition`}
                disabled={c.completed}
                onClick={() => handleComplete(c)}
              >
                {c.completed ? "Completed" : "Mark as Completed"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
