import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/logo.png";
import search_icon from "../assets/search_icon.svg";
import bell_icon from "../assets/bell_icon.svg";
import profile_img from "../assets/profile_img.png";
import caret_icon from "../assets/caret_icon.svg";
import {
  FaUserEdit,
  FaExchangeAlt,
  FaUserCircle,
  FaQuestionCircle,
} from "react-icons/fa";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full p-4 transition-all duration-300 z-10 ${
        isScrolled ? "bg-black" : "bg-gradient-to-b from-black to-transparent"
      }`}
    >
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        <div className="flex items-center gap-8">
          <img src={Logo} alt="logo" className="w-24" />
          <ul className="hidden space-x-6 text-sm text-white md:flex">
            <li className="cursor-pointer hover:text-gray-300">Home</li>
            <li className="cursor-pointer hover:text-gray-300">TV Shows</li>
            <li className="cursor-pointer hover:text-gray-300">Movies</li>
            <li className="cursor-pointer hover:text-gray-300">
              New & Popular
            </li>
            <li className="cursor-pointer hover:text-gray-300">My List</li>
            <li className="cursor-pointer hover:text-gray-300">
              Browse by Languages
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <img src={search_icon} alt="Search" className="w-6 cursor-pointer" />
          <img
            src={bell_icon}
            alt="Notifications"
            className="w-6 cursor-pointer"
          />

          {isAuthenticated ? (
            <div className="relative">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  src={profile_img}
                  alt="Profile"
                  className="w-10 h-10 rounded-md"
                />
                <img src={caret_icon} alt="Caret" className="w-4" />
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 p-4 mt-3 text-white bg-black rounded-md shadow-lg w-52 bg-opacity-80">
                  <ul className="space-y-3 profile-list">
                    {["Profile 1", "Profile 2", "Profile 3", "Profile 4"].map(
                      (profile, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-3 text-white cursor-pointer hover:text-decoration:underline"
                        >
                          <img
                            src={profile_img}
                            alt={profile}
                            className="w-8 h-8 rounded"
                          />
                          <p className="transition-all duration-200 hover:underline">
                            {profile}
                          </p>
                        </li>
                      )
                    )}
                  </ul>

                  <ul className="mt-2 space-y-2 text-white">
                    <li className="flex items-center gap-3 cursor-pointer hover:underline">
                      <FaUserEdit className="text-lg" /> Manage Profiles
                    </li>
                    <li className="flex items-center gap-3 cursor-pointer hover:underline">
                      <FaExchangeAlt className="text-lg" /> Transfer Profile
                    </li>
                    <li className="flex items-center gap-3 cursor-pointer hover:underline">
                      <FaUserCircle className="text-lg" /> Account
                    </li>
                    <li className="flex items-center gap-3 cursor-pointer hover:underline">
                      <FaQuestionCircle className="text-lg" /> Help Center
                    </li>
                  </ul>

                  <hr className="my-2 border-gray-600" />
                  <ul>
                    <li
                      onClick={logout}
                      className="text-center cursor-pointer hover:underline"
                    >
                      Sign out of Netflix
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-4">
              <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                Login
              </button>
              <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
