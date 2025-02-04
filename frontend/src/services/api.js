// frontend/services/api.js
import axios from "axios";
import { rootAuthLoader } from "@clerk/react-router/ssr.server";

const api = axios.create({ baseURL: "http://localhost:5000/api" });
const Markteplace_API_URL = "http://localhost:5000/api/marketplacelistings";
const CROPS_API_URL = "http://localhost:5000/api/crops";
const API_URL = "http://localhost:5000/api";

const DAILY_PRICE_REPORT_API_URL =
   "http://localhost:5000/api/daily-price-report";
const SHORTAGES_API_URL = "http://localhost:5000/api/shortages";

// Fetch Marketplace Listings
export const getListings = async () => {
   const response = await axios.get(`${Markteplace_API_URL}`);
   return response.data;
};

export const getUserProducts = async (token, email) => {
   const response = await fetch(
      `http://localhost:5000/api/marketplacelistings?email=${email}`,
      {
         method: "GET",
         headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
         },
      }
   );

   if (!response.ok) {
      throw new Error("Failed to fetch products");
   }

   return await response.json();
};

// Post Shortages
export const postListings = async (listing) => {
   try {
      const response = await fetch(
         "http://localhost:5000/api/marketplacelistings",
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(listing),
         }
      );

      if (!response.ok) {
         throw new Error("Failed to post new listing");
      }

      const data = await response.json(); // Parse response JSON
      return { success: true, data }; // Wrap in success key for consistency
   } catch (error) {
      console.error("Error posting listing:", error);
      return { success: false, error: error.message };
   }
};

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
