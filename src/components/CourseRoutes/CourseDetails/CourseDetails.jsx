import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import Swal from "sweetalert2";

const CourseDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/courses/${id}`)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((error) => {
        console.error("Error fetching course:", error);
      });
  }, [id]);

  if (!course) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-medium">
        Loading course details...
      </div>
    );
  }

  const handleEnroll = async () => {
    if (!user?.email) {
      alert("Please login first!");
      return;
    }

    console.log("Enrolling with:", {
      userEmail: user.email,
      courseId: course.course_id,
      courseName: course.course_name,
    });

    try {
      const enrollData = {
        userEmail: user.email,
        courseId: course.course_id,
      };

      const response = await axios.post(
        "http://localhost:5000/enrollments",
        enrollData
      );
      console.log("Enrollment response:", response.data);

      Swal.fire({
        title: "Enrolled Successfully",
        icon: "success",
        draggable: true,
      });

      // Refresh courses after enrolling
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Enrollment error:", error);
      console.error("Error details:", error.response?.data);

      if (error.response?.status === 409) {
        alert("You are already enrolled in this course.");
      } else {
        alert("Enroll failed! Check console for details.");
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-26 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Image Section */}
        <div className="relative h-72">
          <img
            src={course.course_image}
            alt={course.course_name}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

          {/* Price */}
          <span className="absolute top-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg">
            ${course.course_price}
          </span>
        </div>

        {/* Content */}
        <div className="p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {course.course_name}
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed">
            Master modern frontend development by building real-world projects
            using industry-standard tools and best practices.
          </p>

          {/* Tech Stack */}
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Technologies You’ll Learn
          </h3>

          <div className="flex flex-wrap gap-3 mb-8">
            {course.stacks.map((stack, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-medium"
              >
                {stack}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleEnroll}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition cursor-pointer"
            >
              Enroll Now
            </button>

            <Link
              to="/courses"
              className="flex-1 text-center border border-gray-300 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition"
            >
              Back to Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
