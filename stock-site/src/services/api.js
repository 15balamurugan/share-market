import axios from "axios";

const API_BASE_URL = "http://192.168.1.58:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// API calls matching your FastAPI endpoints
export const stockAPI = {
  // Get single stock data
  getStock: async (symbol, period = "1d", interval = "1d") => {
    try {
      const response = await api.get(`/api/stock/${symbol}`, {
        params: { period, interval },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching stock:", error);
      throw error;
    }
  },
  // Get bulk stocks data
  getBulkStocks: async (symbols, period = "1d", interval = "1d") => {
    try {
      const symbolsString = symbols.join(",");
      const response = await api.get("/api/stocks/bulk", {
        params: { symbols: symbolsString, period, interval },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching bulk stocks:", error);
      throw error;
    }
  },

  // Get Indian stocks
  getIndianStocks: async (limit = 50, period = "1d", interval = "1d") => {
    try {
      const response = await api.get("/api/stocks/indian", {
        params: { limit, period, interval },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching Indian stocks:", error);
      throw error;
    }
  },

  // Search stocks
  searchStocks: async (query) => {
    try {
      const response = await api.get(`/api/search/${query}`);
      return response.data;
    } catch (error) {
      console.error("Error searching stocks:", error);
      throw error;
    }
  },
};

export default api;
