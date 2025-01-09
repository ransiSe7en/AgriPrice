// //backend/routes/marketplace.js
// const express = require("express");
// const router = express.Router();
// const MarketplaceListing = require("../models/MarketplaceListing");

// // Get all listings
// router.get("/", async (req, res) => {
//    try {
//       const listings = await MarketplaceListing.find();
//       res.status(200).json(listings);
//    } catch (error) {
//       res.status(500).json({ error: "Failed to fetch listingssss" });
//    }
// });

// // POST route to create a marketplace listing
// router.post("/", async (req, res) => {
//    try {
//       const newListing = new MarketplaceListing(req.body);
//       await newListing.save();
//       res.status(201).json(newListing);
//    } catch (error) {
//       console.error("Error creating listing:", error);
//       res.status(500).json({
//          message: "Failed to create listing",
//          error: error.message,
//       });
//    }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const MarketplaceListing = require("../models/MarketplaceListing");

// Configure Multer
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "uploads/"); // Directory to store uploaded images
   },
   filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
   },
});

const upload = multer({ storage });

// Get all listings
router.get("/", async (req, res) => {
   try {
      const listings = await MarketplaceListing.find();
      res.status(200).json(listings);
   } catch (error) {
      res.status(500).json({ error: "Failed to fetch listings" });
   }
});

// Create a new listing with an image
router.post("/", upload.single("image"), async (req, res) => {
   try {
      const newListing = new MarketplaceListing({
         ...req.body,
         image: req.file ? `/uploads/${req.file.filename}` : null,
      });
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
