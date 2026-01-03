import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-gray-900 to-black text-gray-300">
      <div className="max-w-7xl mx-auto px-6 pt-30 pb-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & Description */}
          <div>
            <h2 className="text-3xl font-extrabold text-white tracking-wide">
              EduLogo
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Empowering students with smart learning tools, interactive
              assignments, and modern education management systems.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Courses", path: "/courses" },
                { name: "Assignments", path: "/assignments" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2 hover:text-white transition"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Connect With Us
            </h3>

            <div className="flex gap-4 mb-6">
              {[Facebook, Twitter, Linkedin, Github].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-3 rounded-full bg-gray-800 hover:bg-blue-600 hover:scale-110 transition transform shadow-lg"
                >
                  <Icon className="text-white" size={18} />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-400">
              <Mail size={18} />
              support@edulogo.com
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-12" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-white font-medium">EduLogo</span>. All rights
            reserved.
          </p>

          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
