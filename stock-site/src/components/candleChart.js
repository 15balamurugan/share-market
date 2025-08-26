import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

// Sample mock data (replace with your real stock data)
const seriesData = [
  {
    x: new Date("2023-01-01"),
    y: [100, 110, 95, 105], // [open, high, low, close]
  },
  {
    x: new Date("2023-01-02"),
    y: [105, 115, 102, 110],
  },
  {
    x: new Date("2023-01-03"),
    y: [110, 120, 108, 115],
  },
];

const seriesDataLinear = [
  { x: new Date("2023-01-01"), y: 1500 },
  { x: new Date("2023-01-02"), y: 2000 },
  { x: new Date("2023-01-03"), y: 2500 },
];

export default function ApexChart() {
  const [state] = useState({
    series: [{ data: seriesData }],
    options: {
      chart: {
        type: "candlestick",
        height: 290,
        id: "candles",
        toolbar: {
          autoSelected: "pan",
          show: false,
        },
        zoom: { enabled: false },
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: "#30e823ff",
            downward: "#f40c0cff",
          },
        },
      },
      xaxis: { type: "datetime" },
    },

    seriesBar: [{ name: "volume", data: seriesDataLinear }],
    optionsBar: {
      chart: {
        height: 160,
        type: "bar",
        brush: { enabled: true, target: "candles" },
        selection: {
          enabled: true,
          xaxis: {
            min: new Date("2023-01-01").getTime(),
            max: new Date("2023-01-03").getTime(),
          },
          fill: { color: "#ccc", opacity: 0.4 },
          stroke: { color: "#0D47A1" },
        },
      },
      dataLabels: { enabled: false },
      plotOptions: {
        bar: {
          columnWidth: "80%",
          colors: {
            ranges: [
              { from: -1000, to: 0, color: "#20d90bff" },
              { from: 1, to: 10000, color: "#f80e0eff" },
            ],
          },
        },
      },
      stroke: { width: 0 },
      xaxis: {
        type: "datetime",
        axisBorder: { offsetX: 13 },
      },
      yaxis: {
        labels: { show: false },
      },
    },
  });

  return (
    <div className="chart-box">
      <div id="chart-candlestick">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="candlestick"
          height={290}
        />
      </div>
      <div id="chart-bar">
        <ReactApexChart
          options={state.optionsBar}
          series={state.seriesBar}
          type="bar"
          height={160}
        />
      </div>
    </div>
  );
}
