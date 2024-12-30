const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const cropRoutes = require("./routes/crops");
app.use("/api/crops", cropRoutes);

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
   .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => console.log("MongoDB connected"))
   .catch((err) => console.log(err));

// Add routes here

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
