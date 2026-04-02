import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { IoMdLogOut } from "react-icons/io";
import { MdMiscellaneousServices, MdNoteAlt } from "react-icons/md";
import { FaCar, FaUsers } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { AuthContext } from "../context/AuthProvider";
import axiosSecure from "../../axios/axiosSecure";

const AdminSidebar = ({ onClose }) => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/email/${user.email}`)
        .then((res) => setUserInfo(res.data))
        .catch((err) => console.error(err));
    }
  }, [user?.email]);

  return (
    <aside className="w-full h-full bg-blue-100 p-3 sm:p-4 overflow-y-auto">
      {onClose && (
        <button
          onClick={onClose}
          className="md:hidden block text-right w-full mb-4 text-lg font-semibold text-gray-600"
        >
          ✕
        </button>
      )}

      <div className="flex flex-col items-center py-4 md:py-6 md:mt-12">
        <img
          src={
            userInfo?.photoURL ||
            "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
          }
          alt="avatar"
          className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-blue-500"
        />
        <h1 className="text-sm md:text-base font-semibold text-gray-800 mt-2 text-center">
          {userInfo?.name}
        </h1>
      </div>

      <div className="flex flex-col space-y-2 md:space-y-5 mt-6 md:mt-8">
        <Link
          to="/dashboard/admin"
          onClick={onClose}
          className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-2.5 rounded hover:bg-blue-200 transition"
        >
          <CiUser className="text-lg md:text-xl text-blue-500 flex-shrink-0" />
          <span className="text-xs md:text-base text-blue-500 font-medium">
            Profile
          </span>
        </Link>

        <Link
          to="/"
          onClick={onClose}
          className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-2.5 rounded hover:bg-blue-200 transition"
        >
          <AiFillHome className="text-lg md:text-xl text-blue-500 flex-shrink-0" />
          <span className="text-xs md:text-base text-blue-500 font-medium hover:text-blue-700">
            Home
          </span>
        </Link>

        <Link
          to="/dashboard/admin/manageUsers"
          onClick={onClose}
          className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-2.5 rounded hover:bg-blue-200 transition"
        >
          <FaUsers className="text-lg md:text-xl text-blue-500 flex-shrink-0" />
          <span className="text-xs md:text-base text-blue-500 font-medium hover:text-blue-700">
            All Users
          </span>
        </Link>

        <Link
          to="/addBlogs"
          onClick={onClose}
          className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-2.5 rounded hover:bg-blue-200 transition"
        >
          <MdNoteAlt className="text-lg md:text-xl text-blue-500 flex-shrink-0" />
          <span className="text-xs md:text-base text-blue-500 font-medium hover:text-blue-700">
            Add Blogs
          </span>
        </Link>

        <Link
          to="/dashboard/admin/manageBlogs"
          onClick={onClose}
          className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-2.5 rounded hover:bg-blue-200 transition"
        >
          <MdNoteAlt className="text-lg md:text-xl text-blue-500 flex-shrink-0" />
          <span className="text-xs md:text-base text-blue-500 font-medium hover:text-blue-700">
            Manage Blogs
          </span>
        </Link>

        <Link
          to="/dashboard/admin/allAssignments"
          onClick={onClose}
          className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-2.5 rounded hover:bg-blue-200 transition"
        >
          <FaCar className="text-lg md:text-xl text-blue-500 flex-shrink-0" />
          <span className="text-xs md:text-base text-blue-500 font-medium hover:text-blue-700">
            All Assignments
          </span>
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
