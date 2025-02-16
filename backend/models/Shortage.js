// backend/models/Shortage.js
const mongoose = require("mongoose");

const ShortageSchema = new mongoose.Schema({
   commodity: { type: String, required: true },
   location: { type: String, required: true },
   image: { type: String, required: false },
   reportedBy: { type: String, required: false },
   dateReported: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Shortage", ShortageSchema);
