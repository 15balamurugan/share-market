// import React, { useState } from "react";
// import CandlestickChart from "./CandlestickChart";
// import { stockAPI } from "../services/api";

// const SingleStock = ({ period, interval }) => {
//   const [symbol, setSymbol] = useState("RELIANCE.NS");
//   const [stockData, setStockData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const analyzeStock = async () => {
//     if (!symbol) return;
//     setLoading(true);
//     setError(null);

//     try {
//       const data = await stockAPI.getStock(symbol, period, interval);
//       setStockData(data);
//     } catch (err) {
//       setError(
//         "Failed to fetch stock data. Please check the symbol and try again."
//       );
//       console.error("Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-white shadow-lg rounded-xl">
//       {/* Search Header */}
//       <div className="mb-6">
//         <div className="flex gap-3">
//           <input
//             type="text"
//             value={symbol}
//             onChange={(e) => setSymbol(e.target.value.toUpperCase())}
//             placeholder="Enter symbol (e.g., RELIANCE.NS, AAPL, BTC-USD)"
//             className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
//           />
//           <button
//             onClick={analyzeStock}
//             disabled={loading}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? "Loading..." : "Analyze Stock"}
//           </button>
//         </div>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="p-3 mb-4 text-red-700 bg-red-100 border border-red-300 rounded-lg">
//           {error}
//         </div>
//       )}

//       {/* Stock Data */}
//       {stockData && (
//         <>
//           {/* Metrics */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//             <div className="p-4 bg-gray-50 rounded-lg shadow text-center">
//               <h3 className="text-sm font-medium text-gray-500">
//                 Current Price
//               </h3>
//               <p className="text-xl font-bold">
//                 {stockData.currency === "INR" ? "₹" : "$"}
//                 {stockData.current_price.toFixed(2)}
//               </p>
//             </div>

//             <div className="p-4 bg-gray-50 rounded-lg shadow text-center">
//               <h3 className="text-sm font-medium text-gray-500">Change</h3>
//               <p
//                 className={`text-xl font-bold ${
//                   stockData.change >= 0 ? "text-green-600" : "text-red-600"
//                 }`}
//               >
//                 {stockData.change.toFixed(2)} ({stockData.change_percent.toFixed(2)}
//                 %)
//               </p>
//             </div>

//             <div className="p-4 bg-gray-50 rounded-lg shadow text-center">
//               <h3 className="text-sm font-medium text-gray-500">High</h3>
//               {/* <p className="text-xl font-bold">
//                 {stockData.currency === "INR" ? "₹" : "$"}
//                 {stockData.high.toFixed(2)}
//               </p> */}
//             </div>

//             <div className="p-4 bg-gray-50 rounded-lg shadow text-center">
//               <h3 className="text-sm font-medium text-gray-500">Volume</h3>
//               <p className="text-xl font-bold">
//                 {stockData.volume.toLocaleString()}
//               </p>
//             </div>
//           </div>

//           {/* Chart */}
//           <div className="p-4 bg-gray-50 rounded-lg shadow mb-6">
//             <CandlestickChart data={stockData.history} symbol={symbol} />
//           </div>

//           {/* Extra Info */}
//           <div className="p-4 bg-gray-50 rounded-lg shadow space-y-1">
//             <p>
//               <strong>Company:</strong> {stockData.name}
//             </p>
//             <p>
//               <strong>Currency:</strong> {stockData.currency}
//             </p>
//             <p>
//               <strong>Last Updated:</strong>{" "}
//               {new Date(stockData.last_updated).toLocaleString()}
//             </p>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default SingleStock;


// import React, { useState } from "react";
// import CandlestickChart from "./CandlestickChart";
// import { stockAPI } from "../services/api";

// const SingleStock = ({ period, interval }) => {
//   const [symbol, setSymbol] = useState("RELIANCE.NS");
//   const [stockData, setStockData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const analyzeStock = async () => {
//     if (!symbol) return;
//     setLoading(true);
//     setError(null);

//     try {
//       const data = await stockAPI.getStock(symbol, period, interval);
//       setStockData(data);
//     } catch (err) {
//       setError(
//         "Failed to fetch stock data. Please check the symbol and try again."
//       );
//       console.error("Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-white shadow-lg rounded-xl">
//       {/* Search Header */}
//       <div className="mb-6">
//         <div className="flex gap-3">
//           <input
//             type="text"
//             value={symbol}
//             onChange={(e) => setSymbol(e.target.value.toUpperCase())}
//             placeholder="Enter symbol (e.g., RELIANCE.NS, AAPL, BTC-USD)"
//             className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
//           />
//           <button
//             onClick={analyzeStock}
//             disabled={loading}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? "Loading..." : "Analyze Stock"}
//           </button>
//         </div>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="p-3 mb-4 text-red-700 bg-red-100 border border-red-300 rounded-lg">
//           {error}
//         </div>
//       )}

//       {/* Stock Data */}
//       {stockData && (
//         <>
//           {/* Metrics */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//             <div className="p-4 bg-gray-50 rounded-lg shadow text-center">
//               <h3 className="text-sm font-medium text-gray-500">
//                 Current Price
//               </h3>
//               <p className="text-xl font-bold">
//                 {stockData.currency === "INR" ? "₹" : "$"}
//                 {stockData.current_price.toFixed(2)}
//               </p>
//             </div>

//             <div className="p-4 bg-gray-50 rounded-lg shadow text-center">
//               <h3 className="text-sm font-medium text-gray-500">Change</h3>
//               <p
//                 className={`text-xl font-bold ${
//                   stockData.change >= 0 ? "text-green-600" : "text-red-600"
//                 }`}
//               >
//                 {stockData.change.toFixed(2)} ({stockData.change_percent.toFixed(2)}%)
//               </p>
//             </div>

//             <div className="p-4 bg-gray-50 rounded-lg shadow text-center">
//               <h3 className="text-sm font-medium text-gray-500">High</h3>
//               <p className="text-xl font-bold">
//                 {stockData.currency === "INR" ? "₹" : "$"}
//                 {stockData.high.toFixed(2)}
//               </p>
//             </div>

//             <div className="p-4 bg-gray-50 rounded-lg shadow text-center">
//               <h3 className="text-sm font-medium text-gray-500">Volume</h3>
//               <p className="text-xl font-bold">
//                 {stockData.volume.toLocaleString()}
//               </p>
//             </div>
//           </div>

//           {/* Chart */}
//           <div className="p-4 bg-gray-50 rounded-lg shadow mb-6">
//             <CandlestickChart data={stockData.history} symbol={symbol} />
//           </div>

//           {/* Extra Info */}
//           <div className="p-4 bg-gray-50 rounded-lg shadow space-y-1">
//             <p>
//               <strong>Company:</strong> {stockData.name}
//             </p>
//             <p>
//               <strong>Currency:</strong> {stockData.currency}
//             </p>
//             <p>
//               <strong>Last Updated:</strong>{" "}
//               {new Date(stockData.last_updated).toLocaleString()}
//             </p>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default SingleStock;


import React, { useState, useEffect } from "react";
import CandlestickChart from "./CandlestickChart";
import { stockAPI } from "../services/api";

const SingleStock = ({ period, interval }) => {
  const [symbol, setSymbol] = useState("RELIANCE.NS");
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("chart"); // 'chart', 'buy', 'sell', 'orders'
  const [orders, setOrders] = useState([]);
  const [orderType, setOrderType] = useState("market");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load orders from localStorage on component mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('stockOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save orders to localStorage whenever orders change
  useEffect(() => {
    localStorage.setItem('stockOrders', JSON.stringify(orders));
  }, [orders]);

  // Update price field when stock data changes
  useEffect(() => {
    if (stockData) {
      setPrice(stockData.current_price);
    }
  }, [stockData]);

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

  const handleBuyOrder = async (e) => {
    e.preventDefault();
    if (!stockData) return;
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newOrder = {
      type: "buy",
      orderType,
      quantity,
      price: orderType === "market" ? stockData.current_price : price,
      symbol: stockData.symbol,
      name: stockData.name,
      timestamp: new Date().toISOString(),
      status: "open"
    };
    
    setOrders([...orders, newOrder]);
    setIsSubmitting(false);
    
    // Reset form
    setQuantity(1);
    alert("Buy order placed successfully!");
  };

  const handleSellOrder = async (e) => {
    e.preventDefault();
    if (!stockData) return;
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newOrder = {
      type: "sell",
      orderType,
      quantity,
      price: orderType === "market" ? stockData.current_price : price,
      symbol: stockData.symbol,
      name: stockData.name,
      timestamp: new Date().toISOString(),
      status: "open"
    };
    
    setOrders([...orders, newOrder]);
    setIsSubmitting(false);
    
    // Reset form
    setQuantity(1);
    alert("Sell order placed successfully!");
  };

  const cancelOrder = (index) => {
    const newOrders = [...orders];
    newOrders[index].status = "cancelled";
    setOrders(newOrders);
  };

  const OrdersList = () => {
    if (orders.length === 0) {
      return (
        <div className="p-4 bg-gray-50 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">My Orders</h3>
          <p className="text-gray-500">No orders yet</p>
        </div>
      );
    }

    // Filter orders for the current symbol
    const symbolOrders = orders.filter(order => order.symbol === symbol);
    
    if (symbolOrders.length === 0) {
      return (
        <div className="p-4 bg-gray-50 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">My Orders for {symbol}</h3>
          <p className="text-gray-500">No orders for this symbol yet</p>
        </div>
      );
    }

    return (
      <div className="p-4 bg-gray-50 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">My Orders for {symbol}</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Type</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {symbolOrders.map((order, index) => (
                <tr key={index}>
                  <td className={`px-4 py-2 whitespace-nowrap ${order.type === "buy" ? "text-green-600" : "text-red-600"}`}>
                    {order.type.toUpperCase()}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">{order.orderType}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{order.quantity}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {stockData.currency === "INR" ? "₹" : "$"}
                    {order.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === "open" ? "bg-yellow-100 text-yellow-800" : 
                      order.status === "filled" ? "bg-green-100 text-green-800" : 
                      "bg-red-100 text-red-800"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {new Date(order.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {order.status === "open" && (
                      <button
                        onClick={() => cancelOrder(orders.findIndex(o => o.timestamp === order.timestamp))}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const OrderForm = ({ type }) => {
    if (!stockData) {
      return (
        <div className="p-4 bg-gray-50 rounded-lg shadow">
          <p className="text-gray-500">Please search for a stock first</p>
        </div>
      );
    }

    return (
      <form onSubmit={type === "buy" ? handleBuyOrder : handleSellOrder} className="p-4 bg-gray-50 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">{type === "buy" ? "Buy" : "Sell"} {symbol}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Order Type</label>
            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
            >
              <option value="market">Market</option>
              <option value="limit">Limit</option>
              <option value="stop loss">Stop Loss</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Price</label>
            <input
              type="text"
              value={`${stockData.currency === "INR" ? "₹" : "$"}${stockData.current_price.toFixed(2)}`}
              readOnly
              className="w-full px-3 py-2 border rounded-md shadow-sm bg-gray-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              min="1"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
            />
          </div>
          <div className={orderType === "market" ? "hidden" : ""}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {orderType === "limit" ? "Limit Price" : "Trigger Price"}
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
              step="0.01"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md font-medium ${
            type === "buy" 
              ? "bg-green-600 hover:bg-green-700 text-white" 
              : "bg-red-600 hover:bg-red-700 text-white"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSubmitting ? "Processing..." : `${type === "buy" ? "Buy" : "Sell"} ${symbol}`}
        </button>
      </form>
    );
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
            className="flex-1 px-4 py-2 border rounded-lg text-black shadow-sm focus:ring focus:ring-blue-300"
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

      {/* Navigation Tabs */}
      {stockData && (
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium ${activeTab === "chart" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("chart")}
          >
            Chart
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "buy" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("buy")}
          >
            Buy
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "sell" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("sell")}
          >
            Sell
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "orders" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("orders")}
          >
            My Orders
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-3 mb-4 text-red-700 bg-red-100 border border-red-300 rounded-lg">
          {error}
        </div>
      )}

      {/* Content based on active tab */}
      {activeTab === "chart" && stockData && (
        <>
          {/* Metrics */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg shadow text-center">
              <h3 className="text-sm font-medium text-gray-500">
                Current Price
              </h3>
              <p className="text-xl text-black font-bold">
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
                {stockData.change.toFixed(2)} ({stockData.change_percent.toFixed(2)}%)
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg shadow text-center">
              <h3 className="text-sm font-medium text-gray-500">High</h3>
              <p className="text-xl text-green-500 font-bold">
                {stockData.currency === "INR" ? "₹" : "$"}
                {stockData.high.toFixed(2)}
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg shadow text-center">
              <h3 className="text-sm font-medium text-gray-500">Volume</h3>
              <p className="text-xl text-black font-bold">
                {stockData.volume.toLocaleString()}
              </p>
            </div>
          </div> */}

          {/* Chart */}
          <div className="p-4 bg-gray-50 rounded-lg shadow mb-6">
            <CandlestickChart data={stockData.history} symbol={symbol} />
          </div>

          {/* Extra Info */}
          <div className="p-4 bg-gray-50 rounded-lg text-black shadow space-y-1">
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

      {activeTab === "buy" && <OrderForm type="buy" />}
      {activeTab === "sell" && <OrderForm type="sell" />}
      {activeTab === "orders" && <OrdersList />}
    </div>
  );
};

export default SingleStock;