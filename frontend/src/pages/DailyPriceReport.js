import React, { useState, useEffect } from "react";
import "./DailyPriceReport.css";

const DailyPriceReport = () => {
   const [reportData, setReportData] = useState([]);
   const [view, setView] = useState("wholesale"); // Default view: wholesale
   const [date, setDate] = useState("today"); // Default date: today
   const [searchQuery, setSearchQuery] = useState(""); // Store the search query

   useEffect(() => {
      // Fetch data from the backend
      fetch("http://localhost:5000/api/dailypricereport")
         .then((response) => response.json())
         .then((data) => {
            console.log("Fetched data:", data);
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
