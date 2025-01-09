// backend/models/user.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
   clerkId: { type: String, required: true, unique: true },
   role: {
      type: String,
      enum: ["farmer", "vendor", "admin"],
      default: "farmer",
   },
   preferences: { type: Object, default: {} },
});

module.exports = mongoose.model("User", UserSchema);
