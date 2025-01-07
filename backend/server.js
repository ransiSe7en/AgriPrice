// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Routes

//=====================================  DailyPriceReport Routes  ======================================//
const DailyPriceReport = require("./models/DailyPriceReport");

app.get("/api/dailypricereports", async (req, res) => {
   try {
      const data = await DailyPriceReport.find();
      res.json(data);
   } catch (error) {
      console.error("Error fetching daily price reports:", error); // Log error details
      res.status(500).json({
         message: "Internal Server Error",
         error: err.message,
      });
   }
});
//=====================================  DailyPriceReport Routes  ======================================//

// SHORTAGES
const shortagesRouter = require("./routes/Shortage");
const Shortage = require("./models/Shortage");
app.use("/api/shortages", shortagesRouter);

app.post("/api/shortages", async (req, res) => {
   try {
      const newShortage = new Shortage({
         ...req.body,
      });
      await newShortage.save();
      res.status(201).json(newShortage);
   } catch (error) {
      console.error("Error saving shortage:", error);
      res.status(500).json({ message: "Failed to create shortage report" });
   }
});

// Shortages test route
// app.get("/api/shortages/test", (req, res) => {
//    res.send("Test route is working!");
// });

// MARKETPLACE
const marketplaceRoutes = require("./routes/marketplace");
app.use("/api/marketplace", marketplaceRoutes);
const MarketplaceListing = require("./models/MarketplaceListing");

app.use("/api/marketplacelistings", marketplaceRoutes);

app.get("/api/marketplacelistings", async (req, res) => {
   try {
      const data = await MarketplaceListing.find();
      res.json(data);
   } catch (error) {
      console.error("Error fetching Marketplace Listings:", err); // Log error details
      res.status(500).json({
         message: "Internal Server Error",
         error: err.message,
      });
   }
});

// crops route
const cropsRouter = require("./routes/crops");
app.use("/api/crops", cropsRouter);

// Farmers route
const farmersRoute = require("./routes/farmers");
app.use("/api/farmers", farmersRoute);
const dailyPriceReportRoute = require("./routes/dailypricereport");
app.use("/api/dailypricereports", dailyPriceReportRoute);

app.listen(PORT, () =>
   console.log(`Server running on http://localhost:${PORT}`)
);
