import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "My Dashboard", path: "/dashboard" },
  { name: "Submissions", path: "/dashboard/submissions" },
  { name: "Assignments", path: "/assignments" },
  { name: "Blogs", path: "/blogs" },
  { name: "Courses", path: "/myCourses" },
];

const LeftSideBar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-white shadow-lg h-screen transition-all duration-300">
      {/* collapse button for mobile */}
      <div className="flex justify-end p-2 sm:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-700 focus:outline-none"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      <div
        className={`${
          open ? "block" : "hidden"
        } sm:block w-56 p-6 space-y-3`}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Dashboard
        </h2>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg font-medium transition ${
                isActive
                  ? "bg-blue-200 text-blue-900"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-800"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default LeftSideBar;
