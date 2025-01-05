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

app.get("/api/daily-price-report", async (req, res) => {
   try {
      const data = await dailyPriceReportRoute.find();
      res.json(data);
   } catch (error) {
      res.status(500).json({ message: "Error fetching data", error });
   }
});

// crops route
const cropsRouter = require("./routes/crops");
app.use("/api/crops", cropsRouter);

// Farmers route
const farmersRoute = require("./routes/farmers");
app.use("/api/farmers", farmersRoute);

// //dailyPriceReport route
// const dailyPriceReportRoute = require("./routes/dailypricereport");
// app.use("/api/dailypricereport", dailyPriceReportRoute);

app.listen(PORT, () =>
   console.log(`Server running on http://localhost:${PORT}`)
);
