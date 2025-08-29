// import React from "react";
// import { Card, CardContent, Typography } from "@mui/material";
// import ApexChart from "../../components/candleChart";

// export default function IntradayChart() {
//   return (
//     <Card sx={{ maxWidth: 800, margin: "20px auto", boxShadow: 3 }}>
//       <CardContent>
//         <Typography variant="h6" gutterBottom>
//           Intraday Stock Chart
//         </Typography>
//         <ApexChart />
//       </CardContent>
//     </Card>
//   );
// }

import React, { useState } from "react";
import Navigation from "../../components/Navigation";
import SingleStock from "../../components/SingleStock";
import BulkViewer from "../../components/BulkViewer";
import IndianStocks from "../../components/IndianStocks";
import SearchQueue from "../../components/SearchQueue";
import Header from "../../components/Header";

function App() {
  const [currentView, setCurrentView] = useState("single");
  const [period, setPeriod] = useState("1mo");
  const [interval, setInterval] = useState("1d");
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const refreshData = () => {
    setLastUpdated(new Date());
  };
  

  const renderView = () => {
    switch (currentView) {
      case "single":
        return <SingleStock period={period} interval={interval} />;
      case "bulk":
        return <BulkViewer period={period} interval={interval} />;
      case "indian":
        return <IndianStocks period={period} interval={interval} />;
      case "queue":
        return <SearchQueue period={period} interval={interval} />;
      default:
        return <SingleStock period={period} interval={interval} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      <Header />
      <div className="bg-white flex shadow-md">
        <Navigation
          currentView={currentView}
          setCurrentView={setCurrentView}
          period={period}
          setPeriod={setPeriod}
          interval={interval}
          setInterval={setInterval}
        />
      </div>

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          {renderView()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 text-sm py-4 text-center">
        <p>📊 Last updated: {lastUpdated.toLocaleString()}</p>
        <button
          onClick={refreshData}
          className="mt-2 inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          🔄 Refresh All Data
        </button>
      </footer>
    </div>
  );
}

export default App;
