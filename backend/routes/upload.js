// // // backend/routes/upload.js
// // const express = require("express");
// // const multer = require("multer");
// // const pdfParse = require("pdf-parse");
// // const DailyPriceReport = require("../models/DailyPriceReport");

// // const router = express.Router();
// // const upload = multer({ dest: "uploads/" }); // Temporary storage

// // const { handleUpload } = require("../controllers/uploadController");

// // // Route to handle PDF uploads
// // router.post("/upload", upload.single("file"), handleUpload);

// // router.post("/upload", upload.single("file"), async (req, res) => {
// //    try {
// //       const dataBuffer =
// //          req.file.buffer || require("fs").readFileSync(req.file.path);

// //       const data = await pdfParse(dataBuffer);
// //       const secondPageText = data.text.split("\f")[1]; // Extract second page

// //       // Parse the data
// //       const prices = secondPageText.match(
// //          /([A-Za-z\s]+)Rs\.\/kg\s+([\d,.]+)\s+([\d,.]+)/g
// //       );

// //       const jsonData = prices.map((line) => {
// //          const [_, name, lastPrice, currentPrice] = line.match(
// //             /([A-Za-z\s]+)Rs\.\/kg\s+([\d,.]+)\s+([\d,.]+)/
// //          );
// //          return {
// //             name: name.trim(),
// //             lastPrice: parseFloat(lastPrice),
// //             currentPrice: parseFloat(currentPrice),
// //          };
// //       });

// //       // Save to MongoDB
// //       await DailyPriceReport.insertMany(jsonData);

// //       res.status(200).json({
// //          message: "Data uploaded successfully",
// //          data: jsonData,
// //       });
// //    } catch (error) {
// //       console.error(error);
// //       res.status(500).json({ error: "Error processing the file" });
// //    }
// // });

// // module.exports = router;

// // backend/routes/upload.js
// const express = require("express");
// const multer = require("multer");
// const { handleUpload } = require("../controllers/uploadController");

// const router = express.Router();
// const upload = multer({ dest: "uploads/" });

// // Single route to handle PDF uploads
// router.post("/upload", upload.single("file"), handleUpload);

// module.exports = router;
