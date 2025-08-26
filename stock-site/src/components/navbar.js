import React, { useState, useRef, useEffect } from "react";
import logo from "../asset/vrlogo.png";
import userAvatar from "../asset/user-img.jpg";
import { User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function TopNavbar() {
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Guest",
    email: "guest@example.com",
  };

  // useEffect(() => {
  //   console.log(user);
  // }, []);

  const dropdownRef = useRef(null);

  // Close modal if clicked outside
  useEffect(() => {
    // console.log(localStorage.getItem('user'));

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full bg-white text-black px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      {/* Left Logo */}
      <img src={logo} alt="Logo" className="h-20 w-auto rounded-lg shadow-lg" />
      <h2 className="font-serif bounce-text text-bold text-4xl md:text-6xl bg-clip-text text-black">
        VR ALGO TRADING
      </h2>

      {/* Right User Section  */}
      <div className="relative" ref={dropdownRef}>
        <img
          src={userAvatar}
          alt="User"
          className="h-10 w-10 rounded-full cursor-pointer border border-gray-300"
          onClick={() => setOpen(!open)}
        />

        {/* Dropdown / Small Modal */}
        {open && (
          <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg p-4 z-50">
            <p className="font-sm text-gray-800">{user.username}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
            <div className="border-t my-2"></div>
            <button
              className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 text-sm"
              onClick={() => {
                localStorage.removeItem("user");
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
