// // backend/controllers/uploadController.js
// const fs = require("fs");
// const pdfParse = require("pdf-parse");
// const DailyPriceReport = require("../models/DailyPriceReport");

// const handleUpload = async (req, res) => {
//    try {
//       const dataBuffer = fs.readFileSync(req.file.path);
//       const data = await pdfParse(dataBuffer);
//       const pages = data.text.split("\f");

//       if (pages.length < 2) {
//          return res
//             .status(400)
//             .json({ error: "PDF does not contain a second page" });
//       }

//       const secondPageText = pages[1];
//       const dateRegex = /(\d{1,2}\s+[A-Za-z]+\s+\d{4})/;
//       const dateMatch = secondPageText.match(dateRegex);
//       const reportDate = dateMatch ? new Date(dateMatch[1]) : new Date();

//       const commodityRegex =
//          /([A-Za-z\s]+)Rs\.\/kg\s+(\d+[.,]?\d*)\s+(\d+[.,]?\d*)\s+(\d+[.,]?\d*)\s+(\d+[.,]?\d*)\s+(\d+[.,]?\d*)\s+(\d+[.,]?\d*)/g;
//       const matches = [...secondPageText.matchAll(commodityRegex)];

//       if (matches.length === 0) {
//          return res
//             .status(400)
//             .json({ error: "No commodity data found in the PDF" });
//       }

//       const vegetables = matches.map((match) => ({
//          name: match[1].trim(),
//          unit: "kg",
//          Pettah: {
//             market: "Pettah",
//             wholesaleYesterday: parseFloat(match[2]),
//             wholesaleToday: parseFloat(match[3]),
//             retailYesterday: null,
//             retailToday: null,
//          },
//          Dambulla: {
//             market: "Dambulla",
//             wholesaleYesterday: parseFloat(match[4]),
//             wholesaleToday: parseFloat(match[5]),
//             retailYesterday: null,
//             retailToday: null,
//          },
//          Narahenpita: {
//             market: "Narahenpita",
//             wholesaleYesterday: parseFloat(match[6]),
//             wholesaleToday: parseFloat(match[7]),
//             retailYesterday: null,
//             retailToday: null,
//          },
//       }));

//       const newReport = new DailyPriceReport({
//          date: reportDate,
//          wholesale_prices: { vegetables, other: [] },
//          retail_prices: { vegetables: [], other: [] },
//       });

//       await newReport.save();

//       res.status(200).json({
//          message: "Price report uploaded and saved successfully",
//          data: vegetables,
//       });
//    } catch (error) {
//       console.error("Error processing file:", error);
//       res.status(500).json({ error: "Error processing the file" });
//    } finally {
//       fs.unlink(req.file.path, (err) => {
//          if (err) console.error("Error deleting file:", err);
//       });
//    }
// };

// module.exports = { handleUpload };
