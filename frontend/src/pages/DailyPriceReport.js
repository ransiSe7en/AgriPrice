import React, { useState, useEffect } from "react";
import { getDailyPriceReport } from "../services/api"; // Importing the API service

const DailyPriceReport = () => {
   const [report, setReport] = useState(null); // Store the report data
   const [loading, setLoading] = useState(true); // Store the loading state
   const [error, setError] = useState(null); // Store any potential error

   useEffect(() => {
      // Fetch the daily price report data when the component mounts
      const fetchReport = async () => {
         try {
            const data = await getDailyPriceReport();
            setReport(data); // Set the report data to state
            setLoading(false); // Stop the loading state
         } catch (error) {
            setError("Failed to fetch daily price report."); // Set error message if something goes wrong
            setLoading(false);
         }
      };

      fetchReport();
   }, []); // Empty dependency array means this runs once when the component mounts

   if (loading) {
      return <div>Loading...</div>; // Show loading message until the data is fetched
   }

   if (error) {
      return <div>{error}</div>; // Show error message if data fetch fails
   }

   return (
      <div>
         {/* a singular row 5 column button with dates upto 5 days ago. when a button with the placeholder  date of yday  is clicked, the particular date data is whats shown */}
         {/* add in a searchbar to search for items. */}
         {/* the row that appears when an item is searched to display the particular items price today and yday*/}

         <h1>Daily Price Report</h1>
         {/* Check if report and report.date exist */}
         <p>
            Date:{" "}
            {report && report.date
               ? new Date(report.date).toLocaleDateString()
               : "No date available"}
         </p>

         <h2>Vegetables</h2>
         {report.vegetables.map((veg, index) => (
            <div key={index}>
               <h3>{veg.name}</h3>
               {veg.marketDetails.map((market, index) => (
                  <p key={index}>
                     <strong>{market.market}:</strong> {market.priceChange}
                  </p>
               ))}
            </div>
         ))}

         <h2>Fruits</h2>
         {report.fruits.map((fruit, index) => (
            <div key={index}>
               <h3>{fruit.name}</h3>
               {fruit.marketDetails.map((market, index) => (
                  <p key={index}>
                     <strong>{market.market}:</strong> {market.priceChange}
                  </p>
               ))}
            </div>
         ))}

         <h2>Fish</h2>
         {report.fish.map((fish, index) => (
            <div key={index}>
               <h3>{fish.name}</h3>
               {fish.marketDetails.map((market, index) => (
                  <p key={index}>
                     <strong>{market.market}:</strong> {market.priceChange}
                  </p>
               ))}
            </div>
         ))}

         <h2>Price Comparisons</h2>
         <table>
            <thead>
               <tr>
                  <th>Commodity</th>
                  <th>Market</th>
                  <th>Yesterday</th>
                  <th>Today</th>
                  <th>Change</th>
               </tr>
            </thead>
            <tbody>
               {report.priceComparisons.map((comparison, index) => (
                  <tr key={index}>
                     <td>{comparison.commodity}</td>
                     <td>{comparison.market}</td>
                     <td>{comparison.yesterday}</td>
                     <td>{comparison.today}</td>
                     <td>{comparison.change}</td>
                  </tr>
               ))}
            </tbody>
         </table>

         <h2>Trends and Observations</h2>
         <p>{report.trendsAndObservations}</p>
      </div>
   );
};

export default DailyPriceReport;
