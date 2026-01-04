import axios from "axios";
import React, { useEffect, useState } from "react";
import SectionTitle from "../../SectionTitle/SectionTitle";
import Blog from "../Blog/Blog";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/blogs").then((res) => setBlogs(res.data));
  }, []);

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <SectionTitle title="Blogs" />

      <div className="flex flex-col items-center gap-8 mt-10 px-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="w-full max-w-xl">
            <Blog blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
