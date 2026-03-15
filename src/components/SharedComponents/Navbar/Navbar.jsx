import { useContext, useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import Swal from "sweetalert2";
import logo from '../../../../public/logo.png'

const Navbar = () => {
  const { user, logOutUser, role } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogs" },
    ...(user && role === "user"
      ? [
          { name: "Assignments", path: "/assignments" },
          { name: "Dashboard", path: "/dashboard/user" },
        ]
      : []),
    ...(user && role === "admin"
      ? [{ name: "Dashboard", path: "/dashboard/admin" }]
      : []),
  ];

  const handleLogout = async () => {
    try {
      await logOutUser();
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Logged out successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl flex items-center gap-2 font-bold text-blue-600 pacifico-regular"
          >
            <img src={logo} alt="Logo" className="h-10 w-10" />
            <h1>Online Academy</h1>
          </Link>
          

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-blue-600 transition text-sm"
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <>
                <div ref={menuRef} className="relative">
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    title={user.displayName}
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="w-8 h-8 rounded-full border-2 border-blue-500 cursor-pointer"
                  />

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-50">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="text-sm px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col items-center space-y-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-blue-600"
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
