const express = require("express");
const router = express.Router();
const Crop = require("../models/Crop");

// Get all crops
router.get("/", async (req, res) => {
   try {
      const crops = await Crop.find();
      res.json(crops);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

// Add a crop
router.post("/", async (req, res) => {
   const crop = new Crop(req.body);
   try {
      const newCrop = await crop.save();
      res.status(201).json(newCrop);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

module.exports = router;
