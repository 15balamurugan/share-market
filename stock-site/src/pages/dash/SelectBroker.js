import React, { useState } from "react";

export default function BrokerAccountForm() {
  const [formData, setFormData] = useState({
    broker: "",
    apiKey: "",
    apiSecret: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Broker Account Form Data:", formData);
    // call backend API here
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full ">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Connect Broker Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Broker Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Broker
            </label>
            <select
              name="broker"
              value={formData.broker}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            >
              <option value="">-- Choose Broker --</option>
              <option value="zerodha">Zerodha</option>
              <option value="upstox">Upstox</option>
              <option value="angel">Angel One</option>
              <option value="groww">Groww</option>
            </select>
          </div>

          {/* API Key */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Key
            </label>
            <input
              type="text"
              name="apiKey"
              value={formData.apiKey}
              onChange={handleChange}
              placeholder="Enter API Key"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          {/* API Secret */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Secret Key
            </label>
            <input
              type="password"
              name="apiSecret"
              value={formData.apiSecret}
              onChange={handleChange}
              placeholder="Enter API Secret Key"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition duration-200"
          >
            Connect
          </button>
        </form>
      </div>
    </div>
  );
}
