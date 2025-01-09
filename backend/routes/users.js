// backend/routes/users.js

const express = require("express");
const { requireAuth } = require("@clerk/clerk-sdk-node");
const router = express.Router();

router.get("/profile", requireAuth, (req, res) => {
   const userId = req.auth.userId; // Retrieve Clerk user ID
   res.send(`User profile for: ${userId}`);
});

module.exports = router;
