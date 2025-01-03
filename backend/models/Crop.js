const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
   name: String,
   category: String,
   price: {
      current: Number,
      unit: String,
   },
   availability: {
      isShortage: Boolean,
      lastUpdated: { type: Date, default: Date.now },
   },
   region: String,
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Crop", cropSchema);
