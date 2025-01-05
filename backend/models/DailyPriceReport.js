const mongoose = require("mongoose");

// Market Price Schema
const marketPriceSchema = new mongoose.Schema({
   market: { type: String },
   wholesaleYesterday: { type: Number },
   wholesaleToday: { type: Number },
   retailYesterday: { type: Number },
   retailToday: { type: Number },
});

// Wholesale Price Schema
const wholesalePriceSchema = new mongoose.Schema({
   name: { type: String },
   unit: { type: String },
   Pettah: marketPriceSchema,
   Dambulla: marketPriceSchema,
   Narahenpita: marketPriceSchema,
});

// Daily Price Report Schema
const dailyPriceReportSchema = new mongoose.Schema({
   date: { type: Date },
   wholesale_prices: {
      vegetables: [wholesalePriceSchema],
      other: [wholesalePriceSchema],
   },
   retail_prices: {
      vegetables: [wholesalePriceSchema],
      other: [wholesalePriceSchema],
   },
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now },
});

// Middleware to update updatedAt on save
dailyPriceReportSchema.pre("save", function (next) {
   this.updatedAt = Date.now();
   next();
});

module.exports = mongoose.model("DailyPriceReport", dailyPriceReportSchema);
