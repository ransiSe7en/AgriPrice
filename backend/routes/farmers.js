const express = require("express");
const router = express.Router();
const Farmer = require("../models/Farmer"); // Your Farmer model

// POST route to create a new farmer
router.post("/", async (req, res) => {
   try {
      const newFarmer = new Farmer(req.body);
      await newFarmer.save();
      res.status(201).json(newFarmer);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
});

module.exports = router;
