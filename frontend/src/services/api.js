// frontend/services/api.js
import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:5000/api" });
const API_URL = "http://localhost:5000/api";
const CROPS_API_URL = "http://localhost:5000/api/crops";
const DAILY_PRICE_REPORT_API_URL =
   "http://localhost:5000/api/daily-price-report";
const SHORTAGES_API_URL = "http://localhost:5000/api/shortages";

// Fetch Shortages
export const getShortages = async () => {
   const response = await axios.get(`${SHORTAGES_API_URL}`);
   return response.data;
};
// Filter Fetch Shortages
export const getShortagesByCommodity = async (commodity) => {
   const response = await axios.get(`${SHORTAGES_API_URL}/${commodity}`);
   return response.data;
};

// Fetch daily price report data
export const getDailyPriceReport = async () => {
   try {
      const response = await axios.get(DAILY_PRICE_REPORT_API_URL);
      return response.data;
   } catch (error) {
      console.error("Error fetching daily price report:", error);
      return null;
   }
};

// Post Shortages
export const postShortage = async (shortage) => {
   try {
      const response = await fetch("http://localhost:5000/api/shortages", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(shortage),
      });

      if (!response.ok) {
         throw new Error("Failed to post shortage");
      }

      const data = await response.json(); // Parse response JSON
      return { success: true, data }; // Wrap in success key for consistency
   } catch (error) {
      console.error("Error posting shortage:", error);
      return { success: false, error: error.message };
   }
};

// // Fetch Marketplace Data
// export const getMarketplaceListings = (filters) => {
//    return axios.get(`${API_URL}/marketplace`, { params: filters });
// };

// // Post Listing to Marketplace
// export const addMarketplaceListing = (listingData) => {
//    return axios.post(`${API_URL}/marketplace`, listingData);
// };

// Fetch crops data
export const getCrops = async () => {
   try {
      const response = await axios.get(CROPS_API_URL);
      return response.data;
   } catch (error) {
      console.error("Error fetching crops:", error);
      return [];
   }
};

export default api;
