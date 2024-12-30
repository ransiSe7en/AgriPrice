import axios from "axios";

const API_URL = "http://localhost:5000/api/crops"; // Or replace with your deployed backend URL

export const getCrops = async () => {
   try {
      const response = await axios.get(API_URL);
      return response.data;
   } catch (error) {
      console.error("Error fetching crops:", error);
      return [];
   }
};
