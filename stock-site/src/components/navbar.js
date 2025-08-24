import React from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { auth } = useAuth();
  const user = JSON.parse(localStorage.getItem("user")) || {
    username: "Guest",
  };
  return (
    <nav className="w-full bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Left Logo */}
        <div className="text-xl font-bold">MyApp</div>

        {/* Right Side - Welcome User */}
        <div className="text-lg">
          Welcome <span className="font-semibold">{user}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
