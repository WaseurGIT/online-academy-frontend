import React, { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import axiosSecure from "../../axios/AxiosSecure";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    axiosSecure.get("/teachers").then((res) => {
      setTeachers(res.data.data);
    });
  }, []);

  return (
    <div className="py-16 bg-gray-50">
      <SectionTitle title="Our Teachers"></SectionTitle>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
          >
            <div className="relative h-60">
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {teacher.name}
              </h2>
              <p className="text-gray-600 italic mb-3">{teacher.email}</p>
              <p className="text-gray-500 font-medium">
                {teacher.educationQualification}
              </p>
              <p className="text-gray-500 font-medium">
                {teacher.graduationInstitute}
              </p>
              <p className="text-gray-500 font-medium">
                {teacher.graduationYear}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teachers;
