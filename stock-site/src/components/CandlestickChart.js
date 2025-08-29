import React from "react";
import Plot from "react-plotly.js";

const CandlestickChart = ({ data, symbol }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 text-gray-500 rounded-lg shadow">
        No chart data available
      </div>
    );
  }

  // Prepare data for Plotly
  const dates = data.map((item) => new Date(item.date));
  const opens = data.map((item) => item.open);
  const highs = data.map((item) => item.high);
  const lows = data.map((item) => item.low);
  const closes = data.map((item) => item.close);
  const volumes = data.map((item) => item.volume);

  // Create candlestick trace
  const candlestickTrace = {
    x: dates,
    open: opens,
    high: highs,
    low: lows,
    close: closes,
    type: "candlestick",
    name: "Price",
    increasing: { line: { color: "#2ecc71" } },
    decreasing: { line: { color: "#e74c3c" } },
    yaxis: "y1",
  };

  // Create volume trace
  const colors = closes.map((close, i) =>
    close >= opens[i] ? "#2ecc71" : "#e74c3c"
  );

  const volumeTrace = {
    x: dates,
    y: volumes,
    type: "bar",
    name: "Volume",
    marker: { color: colors },
    opacity: 0.7,
    yaxis: "y2",
  };

  const layout = {
    title: `${symbol} - Price Chart`,
    height: 600,
    showlegend: false,
    xaxis: {
      rangeslider: { visible: false },
      title: "Date",
    },
    yaxis: {
      title: "Price",
      domain: [0.3, 1],
      tickformat: "$.2f",
    },
    yaxis2: {
      title: "Volume",
      domain: [0, 0.25],
      side: "right",
    },
    margin: { l: 60, r: 60, t: 80, b: 60 },
    plot_bgcolor: "#fff",
    paper_bgcolor: "#fff",
    font: { family: "Arial, sans-serif" },
  };

  const config = {
    responsive: true,
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ["pan2d", "lasso2d", "select2d"],
    modeBarButtonsToAdd: [
      "drawline",
      "drawopenpath",
      "drawclosedpath",
      "drawcircle",
      "drawrect",
      "eraseshape",
    ],
  };

  return (
    <div className="w-full border h-[600px] bg-white shadow-lg rounded-xl p-4">
      <Plot
        data={[candlestickTrace, volumeTrace]}
        layout={layout}
        config={config}
        useResizeHandler={true}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default CandlestickChart;
