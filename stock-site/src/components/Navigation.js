import React, { useEffect } from "react";

const Navigation = ({
  currentView,
  setCurrentView,
  period,
  setPeriod,
  interval,
  setInterval,
}) => {

  useEffect(() => {
    console.log("period", period);
    console.log("interval", interval);
  }, [period, interval]);

  const viewOptions = [
    { id: "single", label: "🔍 Single Stock Analysis", icon: "🔍" },
    // { id: "bulk", label: "📊 Bulk Stock Viewer", icon: "📊" },
    // { id: "indian", label: "🇮🇳 Indian Stocks", icon: "🇮🇳" },
    { id: "queue", label: "⚡ Quick Search Queue", icon: "⚡" },
  ];

  const periodOptions = [
    { value: "1d", label: "1 Day" },
    { value: "5d", label: "5 Days" },
    { value: "1mo", label: "1 Month" },
    { value: "3mo", label: "3 Months" },
    { value: "6mo", label: "6 Months" },
    { value: "1y", label: "1 Year" },
  ];

  const intervalOptions = [
    { value: "1m", label: "1 Minute" },
    { value: "5m", label: "5 Minutes" },
    { value: "15m", label: "15 Minutes" },
    { value: "30m", label: "30 Minutes" },
    { value: "1h", label: "1 Hour" },
    { value: "1d", label: "1 Day" },
  ];

  return (
    <aside className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-2xl p-4 w-full">
      {/* Navigation Section */}
      <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
        {viewOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setCurrentView(option.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentView === option.id
                ? "bg-blue-600 text-white font-semibold shadow-md"
                : "bg-gray-100 text-gray-800 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            {/* <span className="mr-1">{option.icon}</span> */}
            {option.label}
          </button>
        ))}
      </div>

      {/* Time Settings */}
      <div className="flex  items-center gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Period</label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="p-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {periodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Interval</label>
          <select
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            className="p-2  bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {intervalOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </aside>
  );
};

export default Navigation;
