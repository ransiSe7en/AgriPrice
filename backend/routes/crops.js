const express = require("express");
const Crop = require("../models/Crop");
const router = express.Router();

// Get all crops
router.get("/", async (req, res) => {
   try {
      const crops = await Crop.find();
      res.json(crops);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
});

// Add a new crop
router.post("/", async (req, res) => {
   const newCrop = new Crop(req.body);
   try {
      const crop = await newCrop.save();
      res.status(201).json(crop);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
});

module.exports = router;
