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
      type: [String],
      default: [],
   },
   alerts: {
      shortageAlerts: {
         type: [String],
         default: [],
      },
      pricingAlerts: {
         type: [String],
         default: [],
      },
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

module.exports = mongoose.model("Farmer", FarmerSchema);
