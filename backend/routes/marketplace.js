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

// // Add a new marketplace listing
// router.post("/", async (req, res) => {
//    const { cropName, quantity, price, deliveryCost, contact } = req.body;

//    try {
//       const newListing = new MarketplaceListing({
//          cropName,
//          quantity,
//          price,
//          deliveryCost,
//          contact,
//       });

//       await newListing.save();
//       res.status(201).json(newListing);
//    } catch (error) {
//       res.status(500).json({ message: "Error creating listing", error });
//    }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const MarketplaceListing = require("../models/MarketplaceListing");

// router.get("/", async (req, res) => {
//    const { sortBy, category, priceFrom, priceTo, city } = req.query;

//    const filters = {};
//    if (category) filters.category = category;
//    if (city && city !== "All of Sri Lanka") filters.location = city;
//    filters.price = { $gte: priceFrom || 0, $lte: priceTo || 10000 };

//    const sortOptions = {
//       newest: { createdAt: -1 },
//       oldest: { createdAt: 1 },
//       priceHigh: { price: -1 },
//       priceLow: { price: 1 },
//    };

//    try {
//       const listings = await MarketplaceListing.find(filters).sort(
//          sortOptions[sortBy] || {}
//       );
//       res.json(listings);
//    } catch (error) {
//       res.status(500).send("Server Error");
//    }
// });

// // Get all listings
// router.get("/", async (req, res) => {
//    try {
//       const listings = await MarketplaceListing.find();
//       res.status(200).json(listings);
//    } catch (error) {
//       res.status(500).json({ error: "Failed to fetch listings" });
//    }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const MarketplaceListing = require("../models/MarketplaceListing");

// router.get("/", async (req, res) => {
//    const { sortBy, category, priceFrom, priceTo, city } = req.query;

//    const filters = {};
//    if (category) filters.category = category;
//    if (city && city !== "All of Sri Lanka") filters.location = city;
//    filters.price = { $gte: priceFrom || 0, $lte: priceTo || 10000 };

//    const sortOptions = {
//       newest: { createdAt: -1 },
//       oldest: { createdAt: 1 },
//       priceHigh: { price: -1 },
//       priceLow: { price: 1 },
//    };

//    try {
//       const listings = await MarketplaceListing.find(filters).sort(
//          sortOptions[sortBy] || {}
//       );
//       res.json(listings);
//    } catch (error) {
//       res.status(500).send("Server Error");
//    }
// });

// Get all listings
router.get("/", async (req, res) => {
   try {
      const listings = await MarketplaceListing.find();
      res.status(200).json(listings);
   } catch (error) {
      res.status(500).json({ error: "Failed to fetch listings" });
   }
});

module.exports = router;
