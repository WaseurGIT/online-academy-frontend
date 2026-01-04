import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error("Error fetching blog:", err));
  }, [id]);

  if (!blog) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-medium">
        Loading blog...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-26 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Blog Image */}
        <div className="relative h-64 md:h-96 overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Blog Content */}
        <div className="p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            {blog.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center gap-3 mb-6">
            <img
              src={blog.authorProfile}
              alt={blog.author}
              className="w-10 h-10 rounded-full object-cover border border-gray-300"
            />
            <div className="text-gray-500 text-sm">
              <p>By {blog.author}</p>
              <p>Published on {blog.publishedDate}</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            {blog.description}
          </p>

          <Link
            to="/blogs"
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-6 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform transition duration-300"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
