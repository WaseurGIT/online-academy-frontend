import React from "react";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const {
    id,
    title,
    description,
    image,
    author,
    authorProfile,
    publishedDate,
  } = blog;

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between h-64">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {description}
          </p>
        </div>

        {/* Author & Date */}
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <img
              src={authorProfile}
              alt={author}
              className="w-7 h-7 rounded-full object-cover border border-gray-300"
            />
            <span>By {author}</span>
          </div>
          <span className="text-gray-400 text-xs">{publishedDate}</span>
        </div>

        {/* Read More Button */}
        <Link
          to={`/blogs/${id}`}
          className="
            mt-4 
            w-full 
            inline-block
            text-center 
            bg-gradient-to-r from-blue-600 to-indigo-600 
            text-white 
            py-3 
            rounded-md 
            font-semibold 
            shadow-lg 
            hover:shadow-xl 
            hover:scale-105 
            transform 
            transition 
            duration-300
            uppercase
          "
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Blog;
