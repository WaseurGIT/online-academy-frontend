import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";

const About = () => {
  return (
    <div className="bg-gray-50 pt-20">

      {/* About Content */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="relative">
          <img src="/about.png" alt="About" className="rounded-3xl shadow-xl" />
          <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white px-6 py-4 rounded-2xl shadow-lg">
            <p className="text-lg font-bold">5+ Years</p>
            <p className="text-sm">Experience</p>
          </div>
        </div>

        {/* Text */}
        <div>
          <SectionTitle
            title="Who We Are"
            subtitle="Building future-ready skills for students"
          />

          <p className="text-gray-600 leading-relaxed mb-6">
            We are a modern learning platform focused on delivering high-quality
            courses, hands-on assignments, and real-world projects. Our goal is
            to bridge the gap between academic knowledge and industry
            requirements.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Whether you are a beginner or an advanced learner, we provide
            structured learning paths to help you grow with confidence.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Students Enrolled", value: "10K+" },
            { label: "Expert Instructors", value: "50+" },
            { label: "Courses Available", value: "120+" },
            { label: "Success Rate", value: "95%" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-6 text-center shadow hover:shadow-lg transition"
            >
              <h3 className="text-3xl font-bold text-blue-600">{stat.value}</h3>
              <p className="mt-2 text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
          <p className="text-gray-600 leading-relaxed">
            To make quality education accessible, affordable, and practical for
            everyone by leveraging modern technology and expert instructors.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
          <p className="text-gray-600 leading-relaxed">
            To become a global learning platform that helps students build
            real-world skills and achieve career success.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
