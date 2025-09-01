import React, { useState } from "react";
import axios from "axios";

export default function BrokerAccountForm() {
  const [formData, setFormData] = useState({
    broker_name: "",
    api_Key: "",
    api_Secret: "",
  });
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Broker Account Form Data:", formData);

    try {
      // Build payload to match backend field names
      const payload = {
        broker_name: formData.broker_name,
        api_key: formData.api_Key,
        api_secret: formData.api_Secret,
      };

      // Retrieve token
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("❌ No authentication token found. Please login first.");
        return;
      }

      // API request
      const response = await axios.post(
        "http://192.168.1.58:8000/broker/add",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // ✅ Success
      console.log("Response:", response.data);
      setMessage("✅ Broker account added successfully");
    } catch (error) {
      // ❌ Error handling
      if (error.response) {
        // Backend returned an error response
        console.error("Backend Error:", error.response.data);
        setMessage(
          `❌ Failed: ${error.response.data.message || "Server error"}`
        );
      } else if (error.request) {
        // No response received
        console.error("Network Error:", error.request);
        setMessage("❌ No response from server. Check network.");
      } else {
        // Other errors
        console.error("Error:", error.message);
        setMessage(`❌ Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-gray-900 h-120 via-gray-800 to-black bg-green-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md ">
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
              name="broker_name"
              value={formData.broker_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            >
              <option value="">-- Choose Broker --</option>
              <option value="zerodha">Zerodha</option>
              <option value="upstox">Upstox</option>
              <option value="angel">Angel One</option>
              <option value="groww">Groww</option>
              <option value="ICICI Direct">ICICI Direct</option>
            </select>
          </div>

          {/* API Key */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Key
            </label>
            <input
              type="text"
              name="api_Key"
              value={formData.api_Key}
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
              name="api_Secret"
              value={formData.api_Secret}
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
