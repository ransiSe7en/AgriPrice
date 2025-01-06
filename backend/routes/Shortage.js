// backend/routes/shortages.js
const express = require("express");
const router = express.Router();
const Shortage = require("../models/Shortage");

// Get all shortages
router.get("/", async (req, res) => {
   try {
      const shortages = await Shortage.find();
      res.json(shortages);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
});

// Get shortages by commodity
router.get("/api/shortages/:commodity", async (req, res) => {
   try {
      const shortages = await Shortage.find({
         commodity: req.params.commodity,
      });
      res.json(shortages);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
});

router.delete("/:id", async (req, res) => {
   try {
      const { id } = req.params;
      console.log("Deleting shortage with ID:", id);
      const result = await Shortage.findByIdAndDelete(id);
      if (!result) {
         return res
            .status(404)
            .json({ success: false, message: "Shortage not found" });
      }
      res.status(200).json({
         success: true,
         message: "Shortage deleted successfully",
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
   }
});

module.exports = router;
