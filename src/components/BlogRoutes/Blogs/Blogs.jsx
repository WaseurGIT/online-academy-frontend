import React, { useEffect, useState } from "react";
import SectionTitle from "../../SectionTitle/SectionTitle";
import Blog from "../Blog/Blog";
import axiosSecure from "../../../axios/AxiosSecure";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const blogCategories = [
    "All",
    "Artificial Intelligence",
    "Web Development",
    "Mobile App Development",
    "Data Science",
    "Cybersecurity",
    "Cloud Computing",
    "DevOps",
    "UI/UX Design",
    "Programming Languages",
    "Software Testing",
    "Game Development",
  ];

  useEffect(() => {
    axiosSecure.get("/blogs").then((res) => setBlogs(res.data));
  }, []);

  const handleBlogCategories = (category) => {
    setSelectedCategory(category);
    axiosSecure.get("/blogs").then((res) => {
      const filteredBlogs =
        category === "All"
          ? res.data || res.data.data
          : (res.data || res.data.data).filter(
              (blog) => blog.category === category,
            );
      setBlogs(filteredBlogs);
    });
  };

  return (
    <div className="py-24 bg-gray-50 min-h-screen">
      <SectionTitle title="Blogs" />

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Categories
              </h3>
              <div className="space-y-2">
                {blogCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleBlogCategories(category)}
                    className={`cursor-pointer w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-6">
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <div key={blog.id}>
                    <Blog blog={blog} />
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No blogs found in this category.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
