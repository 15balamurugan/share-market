import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-purple-900 text-white shadow-xl py-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        {/* <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-400 rounded-full filter blur-3xl animate-pulse"></div> */}
        {/* <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div> */}
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-white">
          📊 VR Algo Trading Platform
        </h1>
        <p className="text-xl text-blue-200 mb-8">
          Advanced algorithmic trading with real-time market intelligence
        </p>

        {/* Stats Section */}
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg px-8 py-4 text-center border border-white/10">
            <span className="block text-3xl font-bold text-cyan-300">1,000+</span>
            <span className="text-sm text-blue-200">Global Stocks</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg px-8 py-4 text-center border border-white/10">
            <span className="block text-3xl font-bold text-cyan-300">30+</span>
            <span className="text-sm text-blue-200">Markets</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg px-8 py-4 text-center border border-white/10">
            <span className="block text-3xl font-bold text-cyan-300">24/7</span>
            <span className="text-sm text-blue-200">Real-time Data</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg px-8 py-4 text-center border border-white/10">
            <span className="block text-3xl font-bold text-cyan-300">0.5s</span>
            <span className="text-sm text-blue-200">Execution Speed</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;