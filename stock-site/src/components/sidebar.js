import React, { useState } from "react";
import {
  FaHome,
  FaChartLine,
  FaExchangeAlt,
  FaClock,
  FaUser,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SideNavbar({ onSelect }) {
  const [active, setActive] = useState("Home");
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const menuItems = [
    { name: "Home", icon: <FaHome /> },
    { name: "Intraday", icon: <FaChartLine /> },
    { name: "Swing", icon: <FaExchangeAlt /> },
    { name: "Longterm", icon: <FaClock /> },
    { name: "Broker Account", icon: <FaUser /> },
    { name: "Profile", icon: <FaUser /> },
    { name: "Logout", icon: <FaSignOutAlt /> },
  ];

  const handleClick = (name) => {
    setActive(name);
    if (onSelect) onSelect(name);
  };

  const handlelogout = () => {
    localStorage.removeItem("user");
    setAuth(false);
    navigate("/login");
  };

  return (
    <div
      className={`flex flex-col bg-gray-900 text-white p-5 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white mb-5 text-xl self-end focus:outline-none"
      >
        <FaBars />
      </button>

      {/* Title */}
      {isOpen && (
        <h1 className="text-2xl font-bold mb-10 text-center">Dashboard</h1>
      )}

      {/* Menu */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() =>
              item.name === "Logout" ? handlelogout() : handleClick(item.name)
            }
            className={`flex items-center ${
              isOpen ? "gap-3 px-4" : "justify-center"
            } w-full py-2 rounded-lg transition-colors ${
              active === item.name
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {item.icon}
            {isOpen && <span>{item.name}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
}
