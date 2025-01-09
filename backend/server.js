// // backend/server.js
// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;
// const { requireAuth } = require("@clerk/clerk-sdk-node");

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//    useNewUrlParser: true,
//    useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "Connection error:"));
// db.once("open", () => console.log("Connected to MongoDB"));

// // Routes
// // Protect API endpoints
// app.get("/protected-route", requireAuth, (req, res) => {
//    res.send("This is a protected route");
// });
// //====================== ==========  DailyPriceReport Routes  ===============================//
// const DailyPriceReport = require("./models/DailyPriceReport");

// app.get("/api/dailypricereports", async (req, res) => {
//    try {
//       const data = await DailyPriceReport.find();
//       res.json(data);
//    } catch (error) {
//       console.error("Error fetching daily price reports:", error); // Log error details
//       res.status(500).json({
//          message: "Internal Server Error",
//          error: err.message,
//       });
//    }
// });

// //=====================================  CLERK USER REG ======================================//
// app.post("/clerk/webhook", (req, res) => {
//    const { type, data } = req.body;

//    if (type === "user.created") {
//       // Save user data to MongoDB
//       const { id, email_addresses, first_name, last_name } = data;
//       User.create({
//          clerkId: id,
//          email: email_addresses[0].email_address,
//          firstName: first_name,
//          lastName: last_name,
//       });
//    }

//    res.status(200).send("Webhook received");
// });

// // =======================================SHORTAGES===========================================//
// const shortagesRouter = require("./routes/Shortage");
// const Shortage = require("./models/Shortage");
// app.use("/api/shortages", shortagesRouter);

// app.post("/api/shortages", async (req, res) => {
//    try {
//       const newShortage = new Shortage({
//          ...req.body,
//       });
//       await newShortage.save();
//       res.status(201).json(newShortage);
//    } catch (error) {
//       console.error("Error saving shortage:", error);
//       res.status(500).json({ message: "Failed to create shortage report" });
//    }
// });
// // ======================================MARKETPLACE===========================================//
// const marketplaceRoutes = require("./routes/marketplace");
// const MarketplaceListing = require("./models/MarketplaceListing");
// app.use("/api/marketplacelistings", marketplaceRoutes);

// app.post("/api/marketplacelistings", async (req, res) => {
//    try {
//       const newListing = new Listing({
//          ...req.body,
//       });
//       await newListing.save();
//       res.status(201).json(newListing);
//    } catch (error) {
//       console.error("Error saving newListing:", error);
//       res.status(500).json({ message: "Failed to create newListing " });
//    }
// });

// // // ======================================MARKETPLACE===========================================//
// // const marketplaceRoutes = require("./routes/marketplace");
// // const MarketplaceListing = require("./models/MarketplaceListing").default;
// // app.use("/api/marketplacelistings", marketplaceRoutes);
// // app.get("/api/marketplacelistings", async (req, res) => {
// //    try {
// //       const data = await MarketplaceListing.find();
// //       res.json(data);
// //    } catch (error) {
// //       console.error("Error fetching Marketplace Listings:", err); // Log error details
// //       res.status(500).json({
// //          message: "Internal Server Error",
// //          error: err.message,
// //       });
// //    }
// // });

// // crops route
// const cropsRouter = require("./routes/crops");
// app.use("/api/crops", cropsRouter);

// // Farmers route
// const farmersRoute = require("./routes/farmers");
// app.use("/api/farmers", farmersRoute);
// const dailyPriceReportRoute = require("./routes/dailypricereport");
// app.use("/api/dailypricereports", dailyPriceReportRoute);

// app.listen(PORT, () =>
//    console.log(`Server running on http://localhost:${PORT}`)
// );

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const { requireAuth } = require("@clerk/clerk-sdk-node");

const DailyPriceReport = require("./models/DailyPriceReport");
const User = require("./models/User");
const Shortage = require("./models/Shortage");
const MarketplaceListing = require("./models/MarketplaceListing");

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
app.get("/protected-route", requireAuth, (req, res) => {
   res.send("This is a protected route");
});

// DailyPriceReport Routes
app.get("/api/dailypricereports", async (req, res) => {
   try {
      const data = await DailyPriceReport.find();
      res.json(data);
   } catch (error) {
      console.error("Error fetching daily price reports:", error);
      res.status(500).json({
         message: "Internal Server Error",
         error: error.message,
      });
   }
});

// Clerk Webhook
app.post("/clerk/webhook", (req, res) => {
   const { type, data } = req.body;

   if (type === "user.created") {
      const { id, email_addresses, first_name, last_name } = data;
      User.create({
         clerkId: id,
         email: email_addresses[0].email_address,
         firstName: first_name,
         lastName: last_name,
      });
   }

   res.status(200).send("Webhook received");
});

// Shortages Routes
const shortagesRouter = require("./routes/Shortage");
app.use("/api/shortages", shortagesRouter);

// Marketplace Routes
const marketplaceRoutes = require("./routes/marketplace");
app.use("/api/marketplacelistings", marketplaceRoutes);

// Crops Route
const cropsRouter = require("./routes/crops");
app.use("/api/crops", cropsRouter);

// Farmers Route
const farmersRoute = require("./routes/farmers");
app.use("/api/farmers", farmersRoute);

app.listen(PORT, () =>
   console.log(`Server running on http://localhost:${PORT}`)
);
