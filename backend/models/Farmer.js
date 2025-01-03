const mongoose = require("mongoose");

const FarmerSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   phone: {
      type: String,
      required: true,
   },
   address: {
      type: String,
      required: true,
   },
   selectedCrops: {
      type: [String], // Array of crop names
      default: [],
   },
   alerts: {
      shortageAlerts: {
         type: [String], // Array of crop names for shortage alerts
         default: [],
      },
      pricingAlerts: {
         type: [String], // Array of crop names for pricing alerts
         default: [],
      },
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

module.exports = mongoose.model("Farmer", FarmerSchema);
