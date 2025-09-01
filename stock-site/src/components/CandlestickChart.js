import React, { useState } from "react";
import Plot from "react-plotly.js";

const CandlestickChart = ({ data, symbol }) => {
  const [timeframe, setTimeframe] = useState("1D");
  const [chartType, setChartType] = useState("candlestick");
  const [indicators, setIndicators] = useState([]);

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-gradient-to-br from-gray-900 to-blue-900 text-gray-300 rounded-xl shadow-2xl p-6">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-semibold mb-2">No chart data available</h3>
        <p className="text-blue-300">Select a different symbol or timeframe</p>
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

  // Calculate simple moving average (SMA) for 20 periods
  const calculateSMA = (data, period) => {
    return data.map((val, idx, arr) => {
      if (idx < period - 1) return null;
      return arr.slice(idx - period + 1, idx + 1)
        .reduce((sum, val) => sum + val, 0) / period;
    });
  };

  const sma20 = calculateSMA(closes, 20);

  // Create chart traces based on chart type
  let priceTrace;
  if (chartType === "candlestick") {
    priceTrace = {
      x: dates,
      open: opens,
      high: highs,
      low: lows,
      close: closes,
      type: "candlestick",
      name: "Price",
      increasing: { line: { color: "#10b981" }, fillcolor: "#10b981" },
      decreasing: { line: { color: "#ef4444" }, fillcolor: "#ef4444" },
      yaxis: "y1",
    };
  } else {
    priceTrace = {
      x: dates,
      y: closes,
      type: "scatter",
      mode: "lines",
      name: "Price",
      line: { color: "#3b82f6", width: 2 },
      yaxis: "y1",
    };
  }

  // Create volume trace
  const colors = closes.map((close, i) =>
    close >= opens[i] ? "#10b981" : "#ef4444"
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

  // Create SMA trace if selected
  const smaTrace = indicators.includes("sma") ? {
    x: dates,
    y: sma20,
    type: "scatter",
    mode: "lines",
    name: "SMA 20",
    line: { color: "#f59e0b", width: 2 },
    yaxis: "y1",
  } : null;

  // Filter traces to remove any null values
  const chartData = [priceTrace, volumeTrace, smaTrace].filter(trace => trace !== null);

  const layout = {
    title: {
      // text: `${symbol} • ${timeframe}`,
      font: { color: "#e5e7eb", size: 20 },
      x: 0.05,
      xanchor: 'left'
    },
    height: 600,
    showlegend: true,
    legend: {
      x: 0.02,
      y: 0.98,
      bgcolor: "rgba(0,0,0,0.5)",
      font: { color: "#e5e7eb" },
      bordercolor: "#374151",
      borderwidth: 1
    },
    xaxis: {
      rangeslider: { visible: false },
      title: { text: "Date", font: { color: "#9ca3af" } },
      gridcolor: "#374151",
      zerolinecolor: "#374151",
      tickfont: { color: "#9ca3af" }
    },
    yaxis: {
      title: { text: "Price (USD)", font: { color: "#9ca3af" } },
      domain: [0.25, 1],
      tickformat: "$.2f",
      gridcolor: "#374151",
      zerolinecolor: "#374151",
      tickfont: { color: "#9ca3af" }
    },
    yaxis2: {
      title: { text: "Volume", font: { color: "#9ca3af" } },
      domain: [0, 0.2],
      side: "right",
      gridcolor: "#374151",
      zerolinecolor: "#374151",
      tickfont: { color: "#9ca3af" }
    },
    margin: { l: 60, r: 60, t: 80, b: 60 },
    plot_bgcolor: "#1f2937",
    paper_bgcolor: "#111827",
    font: { family: "Inter, sans-serif" },
    hovermode: "x unified",
    hoverlabel: {
      bgcolor: "#1f2937",
      font: { color: "#e5e7eb" },
      bordercolor: "#374151"
    }
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
    toImageButtonOptions: {
      format: 'png',
      filename: `${symbol}_chart`,
      height: 600,
      width: 1000,
      scale: 2
    },
    modeBarButtons: [
      ["zoom2d", "pan2d", "resetScale2d"],
      ["toImage"]
    ]
  };

  const timeframes = ["1H", "4H", "1D", "1W", "1M"];
  const chartTypes = [
    { value: "candlestick", label: "Candlestick" },
    { value: "line", label: "Line" }
  ];
  const availableIndicators = [
    { value: "sma", label: "SMA 20" }
  ];

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 to-blue-900 shadow-2xl rounded-xl p-4 border border-gray-700">
      {/* Chart Controls */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
        {/* <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm font-medium">Timeframe:</span>
          <div className="flex bg-gray-800 rounded-lg p-1">
            {timeframes.map((tf) => (
              <button
                key={tf}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${timeframe === tf 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-400 hover:text-white hover:bg-gray-700"}`}
                onClick={() => setTimeframe(tf)}
              >
                {tf}
              </button>
            ))}
          </div>
        </div> */}
        
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm font-medium">Chart Type:</span>
          <div className="flex bg-gray-800 rounded-lg p-1">
            {chartTypes.map((type) => (
              <button
                key={type.value}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${chartType === type.value 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-400 hover:text-white hover:bg-gray-700"}`}
                onClick={() => setChartType(type.value)}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm font-medium">Indicators:</span>
          <div className="flex bg-gray-800 rounded-lg p-1">
            {availableIndicators.map((indicator) => {
              const isActive = indicators.includes(indicator.value);
              return (
                <button
                  key={indicator.value}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${isActive
                    ? "bg-purple-600 text-white" 
                    : "text-gray-400 hover:text-white hover:bg-gray-700"}`}
                  onClick={() => {
                    if (isActive) {
                      setIndicators(indicators.filter(i => i !== indicator.value));
                    } else {
                      setIndicators([...indicators, indicator.value]);
                    }
                  }}
                >
                  {indicator.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Price Summary */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="bg-gray-800 rounded-lg p-3 min-w-[120px]">
          <div className="text-gray-400 text-sm">Open</div>
          <div className="text-white font-semibold">${opens[opens.length - 1]?.toFixed(2) || "0.00"}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 min-w-[120px]">
          <div className="text-gray-400 text-sm">High</div>
          <div className="text-green-400 font-semibold">${Math.max(...highs)?.toFixed(2) || "0.00"}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 min-w-[120px]">
          <div className="text-gray-400 text-sm">Low</div>
          <div className="text-red-400 font-semibold">${Math.min(...lows)?.toFixed(2) || "0.00"}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 min-w-[120px]">
          <div className="text-gray-400 text-sm">Close</div>
          <div className={`font-semibold ${closes[closes.length - 1] >= opens[opens.length - 1] ? "text-green-400" : "text-red-400"}`}>
            ${closes[closes.length - 1]?.toFixed(2) || "0.00"}
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 min-w-[120px]">
          <div className="text-gray-400 text-sm">Volume</div>
          <div className="text-blue-400 font-semibold">
            {volumes[volumes.length - 1] ? (volumes[volumes.length - 1] / 1000000).toFixed(2) + "M" : "0"}
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="border border-gray-700 rounded-xl overflow-hidden">
        <Plot
          data={chartData}
          layout={layout}
          config={config}
          useResizeHandler={true}
          style={{ width: "100%", height: "600px" }}
        />
      </div>
    </div>
  );
};

export default CandlestickChart;


// import React, { useEffect, useRef } from "react";

// const CandlestickChart = ({ data, symbol }) => {
//   const containerRef = useRef();
//   const widgetRef = useRef();

//   useEffect(() => {
//     console.log('data', data);
//     console.log('symbol', symbol);
    
    
//     // Only initialize the chart if we have data
//     if (!data || data.length === 0) return;

//     // Check if the script is already loaded
//     if (!window.TradingView) {
//       const script = document.createElement('script');
//       script.src = 'https://s3.tradingview.com/tv.js';
//       script.async = true;
//       script.onload = () => {
//         if (window.TradingView) {
//           initializeChart();
//         }
//       };
//       document.head.appendChild(script);
//     } else {
//       initializeChart();
//     }

//     function initializeChart() {
//       // Clean up any existing widget
//       if (widgetRef.current) {
//         widgetRef.current.remove();
//       }

//       // Create a new widget
//       widgetRef.current = new window.TradingView.widget({
//         autosize: true,
//         symbol: "NASDAQ:AAPL", // Default symbol, you can customize this
//         interval: "D",
//         timezone: "Etc/UTC",
//         theme: "light",
//         style: "1",
//         locale: "en",
//         toolbar_bg: "#f1f3f6",
//         enable_publishing: false,
//         hide_top_toolbar: true,
//         hide_legend: true,
//         save_image: false,
//         container_id: containerRef.current.id,
//         datafeed: {
//           onReady: (callback) => {
//             // Simulate a successful initialization
//             setTimeout(() => {
//               callback({
//                 supports_search: true,
//                 supports_group_request: false,
//                 supports_timescale_marks: false,
//                 supported_resolutions: ["1", "5", "15", "30", "60", "D", "W", "M"]
//               });
//             }, 100);
//           },
//           searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
//             // Simple symbol search implementation
//             onResultReadyCallback([]);
//           },
//           resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
//             // Symbol resolution
//             const symbolInfo = {
//               name: symbolName,
//               description: symbolName,
//               type: "stock",
//               session: "24x7",
//               timezone: "Etc/UTC",
//               ticker: symbolName,
//               minmov: 1,
//               pricescale: 100,
//               has_intraday: true,
//               has_weekly_and_monthly: true,
//               supported_resolutions: ["1", "5", "15", "30", "60", "D", "W", "M"],
//               volume_precision: 2,
//               data_status: "streaming"
//             };
//             onSymbolResolvedCallback(symbolInfo);
//           },
//           getBars: (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) => {
//             // Convert our data to the format TradingView expects
//             const bars = data.map(item => ({
//               time: new Date(item.date).getTime(),
//               open: item.open,
//               high: item.high,
//               low: item.low,
//               close: item.close,
//               volume: item.volume
//             })).filter(bar => bar.time >= from * 1000 && bar.time <= to * 1000);
            
//             if (bars.length > 0) {
//               onHistoryCallback(bars, { noData: false });
//             } else {
//               onHistoryCallback([], { noData: true });
//             }
//           },
//           subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
//             // No real-time data in this example
//           },
//           unsubscribeBars: (subscriberUID) => {
//             // No real-time data in this example
//           }
//         }
//       });
//     }

//     return () => {
//       // Clean up the widget when component unmounts
//       if (widgetRef.current) {
//         widgetRef.current.remove();
//         widgetRef.current = null;
//       }
//     };
//   }, [data, symbol]);

//   if (!data || data.length === 0) {
//     return (
//       <div className="flex items-center justify-center h-64 bg-gray-100 text-gray-500 rounded-lg shadow">
//         No chart data available
//       </div>
//     );
//   }

//   return (
//     <div className="w-full h-[600px] bg-white shadow-lg rounded-xl p-4">
//       <div 
//         id="tradingview-widget-container" 
//         ref={containerRef} 
//         style={{ height: '100%', width: '100%' }}
//       />
//     </div>
//   );
// };

// export default CandlestickChart;
