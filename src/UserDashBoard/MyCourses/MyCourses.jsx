import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const MyCourses = () => {
  const { user } = useContext(AuthContext);
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    axios
      .get(`http://localhost:5000/my-courses?email=${user.email}`)
      .then((res) => {
        console.log("MyCourses API response:", res.data);
        console.log("Number of courses:", res.data.length);
        setCourses(res.data || []);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user?.email]);

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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses