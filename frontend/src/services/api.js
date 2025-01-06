// frontend/services/api.js
import axios from "axios";

// const API_URL = "http://localhost:5000/api";

const CROPS_API_URL = "http://localhost:5000/api/crops";

const DAILY_PRICE_REPORT_API_URL =
   "http://localhost:5000/api/daily-price-report";

const SHORTAGES_API_URL = "http://localhost:5000/api/shortages";

export const getShortages = async () => {
   const response = await axios.get(`${SHORTAGES_API_URL}`);
   return response.data;
};

export const getShortagesByCommodity = async (commodity) => {
   const response = await axios.get(`${SHORTAGES_API_URL}/${commodity}`);
   return response.data;
};

// export const postShortage = async (shortageData) => {
//    try {
//       const response = await axios.post(SHORTAGES_API_URL, shortageData);
//       return response.data;
//    } catch (error) {
//       console.error("Error posting shortage data:", error);
//       throw error;
//    }
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
