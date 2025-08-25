import React, { useState } from "react";
import SideNavbar from "../../components/sidebar";
import Intraday from "./intraday";
import SelectBroker from "./SelectBroker";
import ProfilePage from "./profile";
import HomeCarousel from "./home";
import Navbar from "../../components/navbar";

export default function Dashboard() {
  const [active, setActive] = useState("Home");

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* 🔹 Top Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <SideNavbar onSelect={(name) => setActive(name)} />

        {/* Main Content */}
        <div className="flex-1 p-10 relative">
          <h2 className="text-3xl font-semibold text-white mb-5 relative z-10">
            {active}
          </h2>

          <div className="bg-white border shadow rounded-lg p-6 min-h-[600px] relative z-10">
            {active === "Home" && <HomeCarousel />}
            {active === "Intraday" && <Intraday />}
            {active === "Swing" && <p>Swing trading strategies...</p>}
            {active === "Longterm" && <p>Long-term investment plans...</p>}
            {active === "Broker Account" && <SelectBroker />}
            {active === "Profile" && <ProfilePage />}
            {active === "Logout" && <p>You have been logged out.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
