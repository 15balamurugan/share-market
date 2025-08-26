import React, { useState } from "react";
import CandlestickChart from "./CandlestickChart";
import { stockAPI } from "../services/api";

const SingleStock = ({ period, interval }) => {
  const [symbol, setSymbol] = useState("RELIANCE.NS");
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeStock = async () => {
    if (!symbol) return;

    setLoading(true);
    setError(null);

    try {
      const data = await stockAPI.getStock(symbol, period, interval);
      setStockData(data);
    } catch (err) {
      setError(
        "Failed to fetch stock data. Please check the symbol and try again."
      );
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      {/* Search Header */}
      <div className="mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            placeholder="Enter symbol (e.g., RELIANCE.NS, AAPL, BTC-USD)"
            className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
          />
          <button
            onClick={analyzeStock}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Analyze Stock"}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 mb-4 text-red-700 bg-red-100 border border-red-300 rounded-lg">
          {error}
        </div>
      )}

      {/* Stock Data */}
      {stockData && (
        <>
          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg shadow text-center">
              <h3 className="text-sm font-medium text-gray-500">
                Current Price
              </h3>
              <p className="text-xl font-bold">
                {stockData.currency === "INR" ? "₹" : "$"}
                {stockData.current_price.toFixed(2)}
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg shadow text-center">
              <h3 className="text-sm font-medium text-gray-500">Change</h3>
              <p
                className={`text-xl font-bold ${
                  stockData.change >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {stockData.change.toFixed(2)} ({stockData.change_percent.toFixed(2)}
                %)
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg shadow text-center">
              <h3 className="text-sm font-medium text-gray-500">High</h3>
              <p className="text-xl font-bold">
                {stockData.currency === "INR" ? "₹" : "$"}
                {stockData.high.toFixed(2)}
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg shadow text-center">
              <h3 className="text-sm font-medium text-gray-500">Volume</h3>
              <p className="text-xl font-bold">
                {stockData.volume.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="p-4 bg-gray-50 rounded-lg shadow mb-6">
            <CandlestickChart data={stockData.history} symbol={symbol} />
          </div>

          {/* Extra Info */}
          <div className="p-4 bg-gray-50 rounded-lg shadow space-y-1">
            <p>
              <strong>Company:</strong> {stockData.name}
            </p>
            <p>
              <strong>Currency:</strong> {stockData.currency}
            </p>
            <p>
              <strong>Last Updated:</strong>{" "}
              {new Date(stockData.last_updated).toLocaleString()}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleStock;
