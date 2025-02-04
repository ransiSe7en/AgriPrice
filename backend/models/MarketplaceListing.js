const mongoose = require("mongoose");

const marketplaceListingSchema = new mongoose.Schema({
   title: { type: String, required: true },
   description: { type: String, required: true },
   price: { type: Number, required: true },
   category: { type: String, required: true },
   location: { type: String, required: true },
   createdAt: { type: Date, default: Date.now },
   author: { type: String, required: true },
   image: { type: String, required: false },
});

const MarketplaceListing = mongoose.model(
   "MarketplaceListing",
   marketplaceListingSchema
);

module.exports = MarketplaceListing;
