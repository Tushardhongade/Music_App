import React from "react";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { MdOutlineExplore, MdExplore } from "react-icons/md";
import { MdOutlineLibraryMusic, MdLibraryMusic } from "react-icons/md";
import { FiUser, FiMusic } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Song from "../MusicPlayer";

const FooterNav = () => {
  const location = useLocation();

  const navItems = [
    {
      path: "/",
      icon:
        location.pathname === "/" ? (
          <AiFillHome size={24} />
        ) : (
          <AiOutlineHome size={24} />
        ),
      label: "Home",
      active: location.pathname === "/",
    },
    {
      path: "/explore",
      icon:
        location.pathname === "/explore" ? (
          <MdExplore size={24} />
        ) : (
          <MdOutlineExplore size={24} />
        ),
      label: "Explore",
      active: location.pathname === "/explore",
    },
    {
      path: "/playlists",
      icon:
        location.pathname === "/playlists" ? (
          <MdLibraryMusic size={24} />
        ) : (
          <MdOutlineLibraryMusic size={24} />
        ),
      label: "Library",
      active: location.pathname === "/playlists",
    },
    {
      path: "/profile",
      icon:
        location.pathname === "/profile" ? (
          <FaUser size={24} />
        ) : (
          <FiUser size={24} />
        ),
      label: "Profile",
      active: location.pathname === "/profile",
    },
  ];

  return (
    <div className="fixed bottom-0 right-0 left-0 flex flex-col z-50">
      <Song />

      <div className="relative">
        {/* Floating Music Player Button */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
          <button className="w-16 h-16 bg-[#6594B1] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300">
            <FiMusic className="w-8 h-8 text-white" />
          </button>
        </div>

        {/* Navigation Bar */}
        <nav className="bg-[#213C51] border-t border-[#6594B1]/20 h-16 px-6">
          <div className="flex justify-between items-center h-full max-w-2xl mx-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center w-16 py-2 transition-all duration-200 group"
              >
                <div
                  className={`relative ${
                    item.active
                      ? "text-[#6594B1]"
                      : "text-gray-400 group-hover:text-[#6594B1]"
                  }`}
                >
                  {item.icon}
                  {item.active && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#6594B1] rounded-full animate-pulse"></div>
                  )}
                </div>

                <span
                  className={`text-xs mt-1 font-medium ${
                    item.active
                      ? "text-[#6594B1]"
                      : "text-gray-400 group-hover:text-[#6594B1]"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default FooterNav;
