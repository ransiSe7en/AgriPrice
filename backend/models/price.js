const mongoose = require("mongoose");

const PriceSchema = new mongoose.Schema({
   commodity: String,
   region: String,
   price: Number,
   date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Price", PriceSchema);
