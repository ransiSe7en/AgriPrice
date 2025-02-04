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
      cb(null, "uploads/");
   },
   filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
   },
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
   const { email } = req.query;

   try {
      if (!email) {
         // Return all listings if no email query is provided
         const listings = await MarketplaceListing.find({});
         return res.status(200).json(listings);
      }

      // Filter listings by author email
      const listings = await MarketplaceListing.find({ author: email });

      res.status(200).json(listings);
   } catch (error) {
      console.error("Error fetching listings:", error);
      res.status(500).json({ error: "Internal Server Error" });
   }
});

// Get all listings
// router.get("/", async (req, res) => {
//    try {
//       const listings = await MarketplaceListing.find();
//       res.status(200).json(listings);
//    } catch (error) {
//       res.status(500).json({ error: "Failed to fetch listings" });
//    }
// });

// Create a new listing with an image
router.post("/", upload.single("image"), async (req, res) => {
   try {
      const author = req.body.author;

      if (!author || typeof author !== "string") {
         return res.status(400).json({ message: "Invalid author field" });
      }
      const newListing = new MarketplaceListing({
         ...req.body,
         author,
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

// Delete a specific listing by ID
router.delete("/:id", async (req, res) => {
   try {
      const listing = await MarketplaceListing.findByIdAndDelete(req.params.id);
      if (!listing) {
         return res.status(404).json({ message: "Listing not found" });
      }
      res.json({ message: "Listing deleted successfully", listing });
   } catch (error) {
      console.error("Error deleting listing:", error);
      res.status(500).json({ message: "Failed to delete listing" });
   }
});

// Get product by ID
router.get("/:id", async (req, res) => {
   try {
      const { id } = req.params;
      const product = await MarketplaceListing.findById(id);

      if (!product) {
         return res.status(404).json({ message: "Product not found" });
      }

      res.json(product);
   } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Error fetching product", error });
   }
});

router.put("/:id", upload.single("image"), async (req, res) => {
   try {
      const { id } = req.params;
      const updatedData = { ...req.body };

      if (req.file) {
         updatedData.image = `/uploads/${req.file.filename}`;
      }

      const updatedProduct = await MarketplaceListing.findByIdAndUpdate(
         id,
         updatedData,
         { new: true }
      );

      if (!updatedProduct) {
         return res.status(404).json({ message: "Product not found" });
      }

      res.json(updatedProduct);
   } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Error updating product", error });
   }
});

// // Update product
// router.put("/:id", async (req, res) => {
//    try {
//       const { id } = req.params;
//       const updatedData = req.body;

//       const updatedProduct = await MarketplaceListing.findByIdAndUpdate(
//          id,
//          updatedData,
//          { new: true } // Return the updated document
//       );

//       if (!updatedProduct) {
//          return res.status(404).json({ message: "Product not found" });
//       }

//       res.json(updatedProduct);
//    } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Error updating product", error });
//    }
// });
module.exports = router;
