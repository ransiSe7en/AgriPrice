import axios from "axios";

// API URL for crops
const CROPS_API_URL = "http://localhost:5000/api/crops"; // Replace with your deployed backend URL
// API URL for daily price report
const DAILY_PRICE_REPORT_API_URL = "http://localhost:5000/api/dailyPriceReport"; // Replace with your deployed backend URL

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
