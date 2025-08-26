import React, { useState, useEffect } from 'react';
import { stockAPI } from '../services/api';

const BulkViewer = ({ period, interval }) => {
  const [category, setCategory] = useState('indian');
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = {
    indian: 'Indian Stocks',
    us: 'US Stocks',
    crypto: 'Cryptocurrencies',
    forex: 'Forex',
    indices: 'Indices'
  };

  const symbolLists = {
    indian: [
      'RELIANCE.NS', 'TATAMOTORS.NS', 'INFY.NS', 'HDFCBANK.NS', 'TCS.NS',
      'ICICIBANK.NS', 'HINDUNILVR.NS', 'SBIN.NS', 'BAJFINANCE.NS', 'KOTAKBANK.NS',
      'ITC.NS', 'LT.NS', 'AXISBANK.NS', 'BHARTIARTL.NS', 'MARUTI.NS'
    ],
    us: [
      'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META', 'JPM', 'JNJ', 'V',
      'WMT', 'DIS', 'NFLX', 'INTC', 'AMD'
    ],
    crypto: ['BTC-USD', 'ETH-USD', 'BNB-USD', 'ADA-USD', 'XRP-USD'],
    forex: ['EURUSD=X', 'GBPUSD=X', 'JPYUSD=X', 'CNYUSD=X', 'INRUSD=X'],
    indices: ['^GSPC', '^IXIC', '^DJI', '^NSEI', '^BSESN']
  };

  useEffect(() => {
    if (category) {
      loadBulkData();
    }
  }, [category, period, interval]);

  const loadBulkData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const symbols = symbolLists[category];
      const data = await stockAPI.getBulkStocks(symbols, period, interval);
      setStocks(data);
    } catch (err) {
      setError('Failed to load bulk data. Please try again.');
      console.error('Error loading bulk data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getChangeColor = (change) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const formatCurrency = (value, currency = 'USD') => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency === 'INR' ? 'INR' : 'USD',
      minimumFractionDigits: 2
    });
    return formatter.format(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 text-blue-600 text-lg font-semibold animate-pulse">
        Loading {categories[category]} data...
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4">📊 Bulk Stock Viewer - Top Stocks</h2>
      
      <div className="flex items-center gap-4 mb-6">
        <label className="font-medium">Select Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
        >
          {Object.entries(categories).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        
        <button
          onClick={loadBulkData}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          🔄 Refresh Data
        </button>
      </div>

      {error && (
        <div className="text-red-600 font-medium mb-4">{error}</div>
      )}

      {stocks.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Symbol</th>
                <th className="px-4 py-2 text-left font-semibold">Name</th>
                <th className="px-4 py-2 text-left font-semibold">Price</th>
                <th className="px-4 py-2 text-left font-semibold">Change</th>
                <th className="px-4 py-2 text-left font-semibold">Change %</th>
                <th className="px-4 py-2 text-left font-semibold">Volume</th>
                <th className="px-4 py-2 text-left font-semibold">High</th>
                <th className="px-4 py-2 text-left font-semibold">Low</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, idx) => (
                <tr
                  key={stock.symbol}
                  className={`border-t ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <td className="px-4 py-2 font-medium">{stock.symbol}</td>
                  <td className="px-4 py-2">{stock.name}</td>
                  <td className="px-4 py-2">{formatCurrency(stock.current_price, stock.currency)}</td>
                  <td className={`px-4 py-2 ${getChangeColor(stock.change)}`}>
                    {formatCurrency(stock.change, stock.currency)}
                  </td>
                  <td className={`px-4 py-2 ${getChangeColor(stock.change)}`}>
                    {stock.change_percent.toFixed(2)}%
                  </td>
                  <td className="px-4 py-2">{stock.volume.toLocaleString()}</td>
                  <td className="px-4 py-2">{formatCurrency(stock.high, stock.currency)}</td>
                  <td className="px-4 py-2">{formatCurrency(stock.low, stock.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {stocks.length === 0 && !loading && (
        <div className="p-4 text-center text-gray-500">
          No stock data available. Try refreshing.
        </div>
      )}
    </div>
  );
};

export default BulkViewer;
