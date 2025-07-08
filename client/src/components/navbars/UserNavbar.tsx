import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { logout } from "../../features/auth/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiClock, FiBell, FiSettings, FiShield, FiLogOut } from "react-icons/fi";

const UserNavbar: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinkClass = "hover:text-[#FF5454] transition-colors relative";
  const activeClass = "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#FF5454]";
  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <nav className="w-full px-4 sm:px-10 py-4 flex flex-col sm:flex-row items-center justify-between relative">
      {/* Logo */}
      <div className="mb-4 sm:mb-0">
        <NavLink to="/" className="font-poppins text-3xl sm:text-5xl font-medium">
          Tech<span className="text-[#FF5454] italic">Ez</span>
        </NavLink>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 lg:gap-[90px] text-lg sm:text-2xl font-inter font-semibold">
        {/* Navigation Links */}
        <NavLink to="/" className={({ isActive }) => `${navLinkClass} ${isActive ? "text-[#FF5454] " + activeClass : ""}`}>
          Home
        </NavLink>
        <NavLink to="/bookings" className={({ isActive }) => `${navLinkClass} ${isActive ? "text-[#FF5454] " + activeClass : ""}`}>
          Booking
        </NavLink>
        <NavLink to="/services" className={({ isActive }) => `${navLinkClass} ${isActive ? "text-[#FF5454] " + activeClass : ""}`}>
          Services
        </NavLink>
        <NavLink to="/history" className={({ isActive }) => `${navLinkClass} ${isActive ? "text-[#FF5454] " + activeClass : ""}`}>
          History
        </NavLink>

        {/* User Menu */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-[#FF5454] hover:bg-[#ff3a3a] transition-colors w-10 h-10 rounded-full flex items-center justify-center"
            >
              <FiMenu className="text-white text-xl" />
            </button>

            {/* Enhanced Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#4169E1] rounded-lg shadow-xl py-2 z-50 border border-blue-700">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-blue-600">
                  <p className="font-semibold text-white text-lg">Saurav Pant</p>
                  <p className="text-sm text-blue-100">saurav@gmail.com</p>
                </div>

                {/* Menu Items */}
                <NavLink
                  to="/history"
                  className="flex items-center px-4 py-3 text-blue-50 hover:bg-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiClock className="mr-3 text-blue-200" />
                  <span>History</span>
                </NavLink>
                <NavLink
                  to="/notifications"
                  className="flex items-center px-4 py-3 text-blue-50 hover:bg-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiBell className="mr-3 text-blue-200" />
                  <span>Notifications</span>
                </NavLink>
                <NavLink
                  to="/settings"
                  className="flex items-center px-4 py-3 text-blue-50 hover:bg-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiSettings className="mr-3 text-blue-200" />
                  <span>Settings</span>
                </NavLink>
                <NavLink
                  to="/safety"
                  className="flex items-center px-4 py-3 text-blue-50 hover:bg-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiShield className="mr-3 text-blue-200" />
                  <span>Safety</span>
                </NavLink>

                {/* Sign Out */}
                <div className="px-4 py-3 border-t border-blue-600">
                  <button onClick={handleLogOut} className="flex items-center text-white hover:text-blue-100 transition-colors">
                    <FiLogOut className="mr-3" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <NavLink to="/auth/login" className="bg-[#FF5454] px-6 py-2 rounded-[20px] text-white hover:bg-[#ff3a3a] transition-colors">
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default UserNavbar;
