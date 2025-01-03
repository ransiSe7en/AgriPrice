const mongoose = require("mongoose");

const priceComparisonSchema = new mongoose.Schema({
   commodity: { type: String, required: true },
   market: { type: String, required: true },
   yesterday: { type: Number, required: true },
   today: { type: Number, required: true },
   change: { type: String, required: true }, // ▲ or ▼
});

const commoditySchema = new mongoose.Schema({
   name: { type: String, required: true },
   marketDetails: [
      {
         market: { type: String, required: true },
         priceChange: { type: String, required: true }, // Price increase/decrease explanation
      },
   ],
});

const dailyPriceReportSchema = new mongoose.Schema({
   date: { type: Date, required: true },
   vegetables: [commoditySchema],
   fruits: [commoditySchema],
   fish: [commoditySchema],
   priceComparisons: [priceComparisonSchema],
   trendsAndObservations: { type: String, required: false },
});

module.exports = mongoose.model("DailyPriceReport", dailyPriceReportSchema);
