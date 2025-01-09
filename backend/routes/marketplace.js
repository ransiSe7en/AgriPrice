// const express = require("express");
// const router = express.Router();
// const MarketplaceListing = require("../models/MarketplaceListing");

// // Get all marketplace listings
// router.get("/", async (req, res) => {
//    try {
//       const listings = await MarketplaceListing.find();
//       res.json(listings);
//    } catch (error) {
//       res.status(500).json({ message: "Error fetching listings", error });
//    }
// });

// // // Get all listings
// // router.get("/", async (req, res) => {
// //    try {
// //       const listings = await MarketplaceListing.find();
// //       res.status(200).json(listings);
// //    } catch (error) {
// //       res.status(500).json({ error: "Failed to fetch listings" });
// //    }
// // });

// // module.exports = router;

// // const express = require("express");
// // const router = express.Router();
// // const MarketplaceListing = require("../models/MarketplaceListing");

// // router.get("/", async (req, res) => {
// //    const { sortBy, category, priceFrom, priceTo, city } = req.query;

// //    const filters = {};
// //    if (category) filters.category = category;
// //    if (city && city !== "All of Sri Lanka") filters.location = city;
// //    filters.price = { $gte: priceFrom || 0, $lte: priceTo || 10000 };

// //    const sortOptions = {
// //       newest: { createdAt: -1 },
// //       oldest: { createdAt: 1 },
// //       priceHigh: { price: -1 },
// //       priceLow: { price: 1 },
// //    };

// //    try {
// //       const listings = await MarketplaceListing.find(filters).sort(
// //          sortOptions[sortBy] || {}
// //       );
// //       res.json(listings);
// //    } catch (error) {
// //       res.status(500).send("Server Error");
// //    }
// // });

//backend/routes/marketplace.js
const express = require("express");
const router = express.Router();
const MarketplaceListing = require("../models/MarketplaceListing");

// Get all listings
router.get("/", async (req, res) => {
   try {
      const listings = await MarketplaceListing.find();
      res.status(200).json(listings);
   } catch (error) {
      res.status(500).json({ error: "Failed to fetch listingssss" });
   }
});

// POST route to create a marketplace listing
router.post("/", async (req, res) => {
   try {
      const newListing = new MarketplaceListing(req.body);
      await newListing.save();
      res.status(201).json(newListing);
   } catch (error) {
      console.error("Error creating listing:", error);
      res.status(500).json({
         message: "Failed to create listing",
         error: error.message,
      });
   }
});

module.exports = router;
