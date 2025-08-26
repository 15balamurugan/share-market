import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md py-10">
      <div className="container mx-auto px-6 text-center">
        {/* Main Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          📊 Global Stock Dashboard - 1000+ Stocks
        </h1>
        <p className="text-lg text-blue-100">
          Real-time stock market data, analysis, and tracking
        </p>

        {/* Stats Section */}
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          <div className="bg-white text-gray-900 rounded-xl shadow-md px-6 py-4 text-center w-32">
            <span className="block text-2xl font-bold text-blue-600">1,000+</span>
            <span className="text-sm text-gray-600">Stocks</span>
          </div>
          <div className="bg-white text-gray-900 rounded-xl shadow-md px-6 py-4 text-center w-32">
            <span className="block text-2xl font-bold text-blue-600">30+</span>
            <span className="text-sm text-gray-600">Markets</span>
          </div>
          <div className="bg-white text-gray-900 rounded-xl shadow-md px-6 py-4 text-center w-32">
            <span className="block text-2xl font-bold text-blue-600">24/7</span>
            <span className="text-sm text-gray-600">Real-time</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
