import React, { useEffect, useState } from "react";
import "./Marketplace.css";
import axios from "axios";

const Marketplace = () => {
   const [listings, setListings] = useState([]);
   const [filteredListings, setFilteredListings] = useState([]);
   const [cities, setCities] = useState([]);
   const [selectedCity, setSelectedCity] = useState("All of Sri Lanka");
   const [filters, setFilters] = useState({
      sortBy: "Date: Newest on top",
      category: "",
      minPrice: "",
      maxPrice: "",
   });

   useEffect(() => {
      // Fetch listings from the API
      axios.get("http://localhost:5000/api/marketplace").then((response) => {
         const data = response.data;
         setListings(data);
         setFilteredListings(data);

         // Generate location list with counts dynamically
         const locationMap = {};
         data.forEach((listing) => {
            if (!locationMap[listing.location])
               locationMap[listing.location] = 0;
            locationMap[listing.location]++;
         });

         const dynamicLocations = Object.entries(locationMap).map(
            ([name, count]) => ({
               name,
               count,
            })
         );
         setCities([
            { name: "All of Sri Lanka", count: data.length },
            ...dynamicLocations,
         ]);
      });
   }, []);

   const handleFilterChange = (filterName, value) => {
      if (filterName === "category" && value === "All") {
         setFilters((prevFilters) => ({ ...prevFilters, [filterName]: "" }));
      } else {
         setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
      }
   };

   useEffect(() => {
      // Apply filters to listings
      let updatedListings = [...listings];

      if (filters.category) {
         updatedListings = updatedListings.filter(
            (listing) => listing.category === filters.category
         );
      }

      if (filters.minPrice) {
         updatedListings = updatedListings.filter(
            (listing) => listing.price >= parseFloat(filters.minPrice)
         );
      }

      if (filters.maxPrice) {
         updatedListings = updatedListings.filter(
            (listing) => listing.price <= parseFloat(filters.maxPrice)
         );
      }

      if (filters.sortBy) {
         updatedListings.sort((a, b) => {
            if (filters.sortBy === "Date: Newest on top") {
               return new Date(b.dateAdded) - new Date(a.dateAdded);
            } else if (filters.sortBy === "Date: Oldest on top") {
               return new Date(a.dateAdded) - new Date(b.dateAdded);
            } else if (filters.sortBy === "Price: High to low") {
               return b.price - a.price;
            } else if (filters.sortBy === "Price: Low to high") {
               return a.price - b.price;
            }
            return 0;
         });
      }

      if (selectedCity !== "All of Sri Lanka") {
         updatedListings = updatedListings.filter(
            (listing) => listing.location === selectedCity
         );
      }

      setFilteredListings(updatedListings);
   }, [filters, selectedCity, listings]);

   return (
      <div className="marketplace">
         <div className="search-bar">
            <input type="text" placeholder="Search for products..." />
         </div>
         <div className="marketplace-content">
            <div className="filters">
               <div className="filter-section">
                  <label>Sort by:</label>
                  <select
                     value={filters.sortBy}
                     onChange={(e) =>
                        handleFilterChange("sortBy", e.target.value)
                     }
                  >
                     <option>Date: Newest on top</option>
                     <option>Date: Oldest on top</option>
                     <option>Price: High to low</option>
                     <option>Price: Low to high</option>
                  </select>
               </div>
               <div className="filter-section">
                  <label>Category:</label>
                  <div className="categories">
                     {[
                        "All",
                        "Fruits",
                        "Vegetables",
                        "Other",
                        "Rice",
                        "Fish",
                     ].map((category) => (
                        <button
                           key={category}
                           className={
                              filters.category === category ? "active" : ""
                           }
                           onClick={() =>
                              handleFilterChange(
                                 "category",
                                 filters.category === category ? "" : category
                              )
                           }
                        >
                           {category}
                        </button>
                     ))}
                  </div>
               </div>
               <div className="filter-section">
                  <label>Price Range:</label>
                  <input
                     type="number"
                     placeholder="Min"
                     value={filters.minPrice}
                     onChange={(e) =>
                        handleFilterChange("minPrice", e.target.value)
                     }
                  />
                  <input
                     type="number"
                     placeholder="Max"
                     value={filters.maxPrice}
                     onChange={(e) =>
                        handleFilterChange("maxPrice", e.target.value)
                     }
                  />
               </div>
               <div className="filter-section">
                  <label>Location:</label>
                  <ul className="cities">
                     {cities.map((city) => (
                        <li
                           key={city.name}
                           className={
                              selectedCity === city.name ? "active" : ""
                           }
                           onClick={() => setSelectedCity(city.name)}
                        >
                           {city.name} ({city.count}){" "}
                           {/* Display the count here */}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
            <div className="listings">
               {filteredListings.map((listing) => (
                  <div key={listing.id} className="listing-tile">
                     <img src={listing.image} alt={listing.title} />
                     <h3>{listing.title}</h3>
                     <p>{listing.description}</p>
                     <p>
                        <strong>Price:</strong> {listing.price} LKR
                     </p>
                     <p>
                        <strong>Location:</strong> {listing.location}
                     </p>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Marketplace;
