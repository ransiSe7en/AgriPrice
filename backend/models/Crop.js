const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
   name: { type: String, required: true },
   price: { type: Number, required: true },
   marketLocation: { type: String, required: true },
   availableStock: { type: Number, required: true },
   deliveryCost: { type: Number },
});

const Crop = mongoose.model("Crop", cropSchema);
module.exports = Crop;
