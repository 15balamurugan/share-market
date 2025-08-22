import React, { useState } from "react";
import SideNavbar from "../../components/sidebar";

export default function Dashboard() {
  const [active, setActive] = useState("Home");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SideNavbar onSelect={(name) => setActive(name)} />

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h2 className="text-3xl font-semibold mb-5">{active}</h2>
        <div className="bg-white shadow rounded-lg p-6 min-h-[400px]">
          {active === "Home" && <p>Welcome to your dashboard!</p>}
          {active === "Intraday" && <p>Intraday trading insights...</p>}
          {active === "Swing" && <p>Swing trading strategies...</p>}
          {active === "Longterm" && <p>Long-term investment plans...</p>}
          {active === "Broker Account" && <p>Manage your broker accounts here...</p>}
          {active === "Logout" && <p>You have been logged out.</p>}
        </div>
      </div>
    </div>
  );
}
