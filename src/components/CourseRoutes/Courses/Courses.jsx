import React, { useEffect, useState } from "react";
import SectionTitle from "../../SectionTitle/SectionTitle";
import axios from "axios";
import Course from "../Course/Course";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("/course_data.json").then((res) => {
      setCourses(res.data);
    });
  }, []);

  return (
    <div className="py-30 bg-gray-50">
      <SectionTitle title="Courses" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          xl:grid-cols-3 
          gap-8
        ">
          {courses.map((course) => (
            <Course key={course.course_id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
