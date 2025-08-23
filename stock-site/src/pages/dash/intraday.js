import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@mui/material";

// Register chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function IntradayChart() {
  // Example labels (hours of the day)
  const labels = [
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: [102, 105, 110, 108, 112, 118, 115, 120],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Intraday Stock Price",
      },
    },
  };

  return (
    <Card sx={{ maxWidth: 800, margin: "20px auto", boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Intraday Stock Chart
        </Typography>
        <Line data={data} options={options} />
      </CardContent>
    </Card>
  );
}
