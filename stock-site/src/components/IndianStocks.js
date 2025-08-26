import React, { useState, useEffect } from 'react';
import StockCard from './StockCard';
import { stockAPI } from '../services/api';

const IndianStocks = ({ period, interval }) => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIndianStocks();
  }, [period, interval]);

  const loadIndianStocks = async () => {
    try {
      setLoading(true);
      const data = await stockAPI.getIndianStocks(20, period, interval);
      setStocks(data);
    } catch (error) {
      console.error('Error loading Indian stocks:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 text-blue-600 text-lg font-semibold animate-pulse">
        Loading Indian stocks...
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-6">🇮🇳 Indian Stock Market</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stocks.map((stock) => (
          <StockCard key={stock.symbol} stock={stock} />
        ))}
      </div>
    </div>
  );
};

export default IndianStocks;
