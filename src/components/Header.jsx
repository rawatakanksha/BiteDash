import React, { useContext, useState } from "react";
import logo from "../assets/cat-image.png";
import { NavLink } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

function Header() {
  const [loginBtn, setLoginBtn] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);

  // Subscribing to store
  const cartItems = useSelector((store) => store.cart.items) || [];

  const handleLogin = () => {
    setLoginBtn((prev) => (prev === "Login" ? "Logout" : "Login"));
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-orange-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Location */}
          <div className="flex items-center space-x-6">
            <NavLink to="/" className="flex items-center space-x-3 group">
              <div className="relative overflow-hidden rounded-full p-1 bg-gradient-to-tr from-orange-500 to-amber-400 shadow-md group-hover:scale-105 transition-transform duration-300">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-12 h-12 rounded-full object-cover border-2 border-white"
                />
              </div>
              <div>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent tracking-tight">
                  Swiggy
                </span>
                <span className="block text-[10px] font-semibold tracking-widest text-amber-600 uppercase -mt-1">
                  Food Delivery
                </span>
              </div>
            </NavLink>

            {/* Location & Status Badge */}
            <div className="hidden md:flex items-center space-x-2 pl-4 border-l border-gray-200 text-xs text-gray-600">
              <span className="flex items-center gap-1.5 font-medium bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full border border-orange-200/60 shadow-2xs">
                <svg className="w-3.5 h-3.5 text-orange-500 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>Bengaluru, KA</span>
              </span>

              <span className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-medium ${
                onlineStatus ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                <span className={`w-2 h-2 rounded-full ${onlineStatus ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                {onlineStatus ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-1 lg:space-x-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                    : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                }`
              }
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                    : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                }`
              }
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>About</span>
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                    : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                }`
              }
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span>Contact</span>
            </NavLink>

            <NavLink
              to="/grocery"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                    : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                }`
              }
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              <span>Instamart</span>
            </NavLink>

            {/* Cart Link with Animated Badge */}
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                    : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                }`
              }
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/>
              </svg>
              <span>Cart</span>
              {cartItems.length > 0 && (
                <span className="ml-1 bg-amber-500 text-white text-xs font-extrabold px-2 py-0.5 rounded-full shadow-sm animate-bounce">
                  {cartItems.length}
                </span>
              )}
            </NavLink>
          </nav>

          {/* User Profile & Action */}
          <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
            {loggedInUser && (
              <div className="hidden sm:flex items-center gap-2 bg-gray-100/80 px-3 py-1.5 rounded-full border border-gray-200/60">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  {loggedInUser.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-semibold text-gray-700 truncate max-w-[100px]">
                  {loggedInUser}
                </span>
              </div>
            )}

            <button
              onClick={handleLogin}
              className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 transition-all duration-300 group-hover:opacity-90"></span>
              <span className="relative flex items-center justify-center px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-200 group-hover:bg-opacity-0">
                {loginBtn}
              </span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;
