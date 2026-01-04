import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50 pt-16">
      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 top-0 left-0 h-screen w-64 bg-white shadow-lg transform
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300`}
      >
        <div className="p-6 border-b text-center">
          <img
            src={user?.photoURL}
            alt="profile"
            className="w-20 h-20 rounded-full mx-auto"
          />
          <h1 className="text-md font-bold mt-2">
            <span className="text-orange-400">
              {user?.displayName || user?.email?.split("@")[0]}
            </span>
          </h1>
        </div>

        <nav className="p-4 space-y-3">
          <Link to="/dashboard" className="block px-4 py-2 rounded-lg hover:bg-blue-50">
            Home
          </Link>
          <Link
            to="/dashboard/myCourses"
            className="block px-4 py-2 rounded-lg hover:bg-blue-50"
          >
            My Courses
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10">
        <Outlet />   {/* 🔥 THIS WAS MISSING */}
      </main>
    </div>
  );
};

export default Dashboard;
