import React, { useContext } from "react";
import { SidebarContext } from "../Context/SibebarContext";
import { Link, useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import {
  MdOutlineExplore,
  MdOutlineUpload,
  MdOutlinePlaylistPlay,
} from "react-icons/md";
import { FiMenu, FiLogOut, FiLogIn, FiUserPlus } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const sideBar = useContext(SidebarContext);
  const toggleMenu = () => {
    sideBar.setShowMenu(!sideBar.showMenu);
  };
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  const navItems = [
    { path: "/", icon: <GoHome />, label: "Home" },
    { path: "/explore", icon: <MdOutlineExplore />, label: "Explore" },
    { path: "/upload", icon: <MdOutlineUpload />, label: "Upload" },
    { path: "/playlists", icon: <MdOutlinePlaylistPlay />, label: "Playlists" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#213C51] shadow-lg">
      <div className="px-4 lg:px-8 py-3">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to={"/"} className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-full bg-[#6594B1] flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              Music<span className="text-[#6594B1]">Stream</span>
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg bg-[#6594B1] text-white hover:bg-opacity-80 transition-all"
            aria-label="Toggle Menu"
          >
            <FiMenu size={24} />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-2 text-white hover:text-[#6594B1] transition-colors group"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#6594B1] group-hover:w-full transition-all duration-300"></div>
              </Link>
            ))}

            {token ? (
              <button
                onClick={logOut}
                className="flex items-center space-x-2 bg-[#6594B1] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all font-medium shadow-md"
              >
                <FiLogOut />
                <span>Log Out</span>
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to={"/login"}
                  className="flex items-center space-x-2 bg-[#6594B1] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all font-medium shadow-md"
                >
                  <FiLogIn />
                  <span>Log In</span>
                </Link>
                <Link
                  to={"/register"}
                  className="flex items-center space-x-2 border-2 border-[#6594B1] text-[#6594B1] px-6 py-2 rounded-lg hover:bg-[#6594B1] hover:text-white transition-all font-medium"
                >
                  <FiUserPlus />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-screen w-64 bg-[#213C51] shadow-2xl transform transition-transform duration-300 z-50 ${
          sideBar.showMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Close Button */}
          <div className="flex justify-end mb-8">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full bg-[#6594B1] text-white hover:bg-opacity-80"
            >
              <AiOutlineClose size={24} />
            </button>
          </div>

          {/* Mobile Menu Items */}
          <div className="space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={toggleMenu}
                className="flex items-center space-x-3 text-white hover:text-[#6594B1] transition-colors p-2 rounded-lg hover:bg-white/5"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-lg font-medium">{item.label}</span>
              </Link>
            ))}

            <div className="pt-8 border-t border-white/10">
              {token ? (
                <button
                  onClick={() => {
                    logOut();
                    toggleMenu();
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-[#6594B1] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all font-medium"
                >
                  <FiLogOut />
                  <span>Log Out</span>
                </button>
              ) : (
                <div className="space-y-4">
                  <Link
                    to={"/login"}
                    onClick={toggleMenu}
                    className="w-full flex items-center justify-center space-x-2 bg-[#6594B1] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all font-medium"
                  >
                    <FiLogIn />
                    <span>Log In</span>
                  </Link>
                  <Link
                    to={"/register"}
                    onClick={toggleMenu}
                    className="w-full flex items-center justify-center space-x-2 border-2 border-[#6594B1] text-[#6594B1] px-6 py-3 rounded-lg hover:bg-[#6594B1] hover:text-white transition-all font-medium"
                  >
                    <FiUserPlus />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {sideBar.showMenu && (
        <div
          onClick={toggleMenu}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}
    </header>
  );
};

export default Navbar;
