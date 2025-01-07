// const mongoose = require("mongoose");

// const MarketplaceListingSchema = new mongoose.Schema(
//    {
//       cropName: { type: String, required: true },
//       quantity: { type: Number, required: true },
//       price: { type: Number, required: true },
//       deliveryCost: { type: Number, required: true },
//       contact: { type: String, required: true },
//    },
//    { timestamps: true }
// );

// module.exports = mongoose.model("MarketplaceListing", MarketplaceListingSchema);

const mongoose = require("mongoose");

const marketplaceListingSchema = new mongoose.Schema({
   cropName: { type: String, required: true },
   quantity: { type: Number, required: true },
   price: { type: Number, required: true },
   deliveryCost: { type: Number, required: true },
   contact: { type: String, required: true },
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MarketplaceListing", marketplaceListingSchema);
