// backend/routes/dailypricereport.js
const express = require("express");
const router = express.Router();
const DailyPriceReport = require("../models/DailyPriceReport");

// GET route to fetch the latest daily price report
router.get("/", async (req, res) => {
   try {
      const report = await DailyPriceReport.findOne().sort({ date: -1 });
      res.json(report);
   } catch (error) {
      res.status(500).json({ message: "Server error" });
   }
});

// POST route to create a new daily price report
router.post("/", async (req, res) => {
   const { date, price, description } = req.body;

   // Basic validation
   if (!date || !price) {
      return res.status(400).json({ message: "Date and price are required" });
   }

   try {
      const newReport = new DailyPriceReport({
         date,
         price,
         description,
      });

      // Save the new report to the database
      await newReport.save();
      res.status(201).json({
         message: "Report created successfully",
         report: newReport,
      });
   } catch (error) {
      res.status(500).json({ message: "Server error" });
   }
});

module.exports = router;
