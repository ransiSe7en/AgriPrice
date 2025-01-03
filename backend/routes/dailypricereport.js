const express = require("express");
const DailyPriceReport = require("../models/DailyPriceReport"); // Import the model
const router = express.Router();

// Route to handle GET request for daily price report
// router.get("/", async (req, res) => {
//    try {
//       const report = await DailyPriceReport.findOne().sort({ date: -1 }); // Fetch the latest report
//       if (!report) {
//          return res
//             .status(404)
//             .json({ message: "Daily price report not found" });
//       }
//       res.status(200).json(report); // Send the fetched report data
//    } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Failed to fetch daily price report" });
//    }
// });

router.get("/", async (req, res) => {
   try {
      const report = await DailyPriceReport.findOne().sort({ date: -1 }); // Fetch the latest report
      if (!report) {
         return res
            .status(404)
            .json({ message: "Daily price report not found" });
      }
      res.status(200).json(report);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch daily price report" });
   }
});

// Route to handle POST request for daily price report
router.post("/", async (req, res) => {
   try {
      const {
         date,
         vegetables,
         fruits,
         fish,
         priceComparisons,
         trendsAndObservations,
      } = req.body;

      // Create a new report document
      const newReport = new DailyPriceReport({
         date,
         vegetables,
         fruits,
         fish,
         priceComparisons,
         trendsAndObservations,
      });

      // Save to MongoDB
      await newReport.save();

      res.status(201).json({
         message: "Daily price report created successfully",
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create daily price report" });
   }
});

module.exports = router;
