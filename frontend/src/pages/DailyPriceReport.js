//frontend/src/pages/DailyPriceReport.js

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./DailyPriceReport.css";

const DailyPriceReport = () => {
   const [reportData, setReportData] = useState([]);
   const [view, setView] = useState("wholesale"); // Default view: wholesale
   const [date, setDate] = useState("today"); // Default date: today
   const [searchQuery, setSearchQuery] = useState(""); // Store the search query

   useEffect(() => {
      fetch("http://localhost:5000/api/dailypricereports")
         .then((response) => {
            console.log("Fetch status:", response.status);
            return response.json();
         })
         .then((data) => {
            console.log("Fetched data:", data); // Log the data structure
            setReportData(data);
         })
         .catch((error) => console.error("Error fetching data:", error));
   }, []);

   const handleToggleView = (view) => {
      setView(view);
   };

   const handleToggleDate = (date) => {
      setDate(date);
   };

   const handleSearch = (event) => {
      setSearchQuery(event.target.value.toLowerCase());
   };

   const handleUpdatePriceReport = () => {
      Swal.fire({
         title: "Upload Price Report",
         input: "file",
         inputAttributes: {
            accept: ".pdf",
            "aria-label": "Upload your price report PDF",
         },
         showCancelButton: true,
         confirmButtonText: "Upload",
         cancelButtonText: "Cancel",
         preConfirm: (file) => {
            if (!file) {
               Swal.showValidationMessage("Please select a PDF file to upload");
               return false;
            }

            const formData = new FormData();
            formData.append("file", file);

            return fetch("http://localhost:5000/api/upload", {
               method: "POST",
               body: formData,
            })
               .then((response) => {
                  if (!response.ok) {
                     throw new Error("Upload failed");
                  }
                  return response.json();
               })
               .catch((error) => {
                  Swal.showValidationMessage(`Upload error: ${error.message}`);
               });
         },
      }).then((result) => {
         if (result.isConfirmed) {
            Swal.fire(
               "Success!",
               "Price report uploaded successfully.",
               "success"
            );
         }
      });
   };
   const renderTableRows = () => {
      if (!reportData || !Array.isArray(reportData)) {
         return (
            <tr>
               <td colSpan="5">No data available</td>
            </tr>
         );
      }

      // Filter the data based on the search query
      const filteredData = reportData.flatMap(
         (dataItem) =>
            dataItem.items?.filter((item) =>
               item.name.toLowerCase().includes(searchQuery)
            ) || []
      );

      if (filteredData.length === 0) {
         return (
            <tr>
               <td colSpan="5">No items match the search query</td>
            </tr>
         );
      }

      // Render only the filtered items
      return filteredData.map((item, index) => (
         <tr key={index}>
            <td>{item.name}</td>
            <td>{item[view]?.Pettah?.[date] || "No price"}</td>
            <td>{item[view]?.Dambulla?.[date] || "No price"}</td>
            <td>{item[view]?.Narahenpita?.[date] || "No price"}</td>
            <td>{item.unit}</td>
         </tr>
      ));
   };

   return (
      <div className="TodaysPricesBody">
         <div>
            <input
               type="text"
               placeholder="Search for a commodity..."
               value={searchQuery}
               onChange={handleSearch}
               className="search-bar"
            />
         </div>
         <div className="buttonList">
            <div>
               <button
                  className={view === "wholesale" ? "active-button" : ""}
                  onClick={() => handleToggleView("wholesale")}
               >
                  Wholesale
               </button>
               <button
                  className={view === "retail" ? "active-button" : ""}
                  onClick={() => handleToggleView("retail")}
               >
                  Retail
               </button>
            </div>
            <div>
               <button
                  className={date === "yesterday" ? "active-button" : ""}
                  onClick={() => handleToggleDate("yesterday")}
               >
                  Yesterday
               </button>
               <button
                  className={date === "today" ? "active-button" : ""}
                  onClick={() => handleToggleDate("today")}
               >
                  Today
               </button>
            </div>
         </div>
         <button
            onClick={handleUpdatePriceReport}
            className="update-report-button"
         >
            Update Price Report
         </button>
         <table>
            <thead>
               <tr>
                  <th>Commodity</th>
                  <th>Pettah</th>
                  <th>Dambulla</th>
                  <th>Narahenpita</th>
                  <th>Unit</th>
               </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
         </table>
      </div>
   );
};

export default DailyPriceReport;
