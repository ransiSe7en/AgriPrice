// // frontend/src/pages/Shortages.js
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import {
   getShortages,
   getShortagesByCommodity,
   postShortage,
} from "../services/api";
import Modal from "react-modal"; // If you are using react-modal for the modal window
import "./Shortages.css";

// Ensure Modal is attached to the app element
Modal.setAppElement("#root");

const Shortages = () => {
   const [shortages, setShortages] = useState([]);
   const [filteredShortages, setFilteredShortages] = useState([]);
   const [commodity, setCommodity] = useState("");
   const [totalCount, setTotalCount] = useState(0);

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [newShortage, setNewShortage] = useState({
      commodity: "",
      location: "",
      reportedBy: "",
      image: "",
      dateReported: new Date().toISOString(),
   });

   useEffect(() => {
      const fetchData = async () => {
         const data = await getShortages();
         setShortages(data);
         setFilteredShortages(data);
         setTotalCount(data.length);
      };
      fetchData();
   }, []);

   const handleFilterChange = async (e) => {
      const selectedCommodity = e.target.value;
      setCommodity(selectedCommodity);

      if (selectedCommodity === "") {
         setFilteredShortages(shortages);
      } else {
         const data = await getShortagesByCommodity(selectedCommodity);
         setFilteredShortages(data);
      }
   };

   const handleModalClose = () => {
      setIsModalOpen(false);
   };

   const handleModalOpen = () => {
      setIsModalOpen(true);
   };

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewShortage({ ...newShortage, [name]: value });
   };

   const handleDelete = async (id) => {
      console.log("Deleting shortage with id:", id);
      // Show confirmation dialog
      const result = await Swal.fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, delete it!",
      });

      // If the user confirms deletion
      if (result.isConfirmed) {
         try {
            const response = await fetch(
               `http://localhost:5000/api/shortages/${id}`,
               {
                  method: "DELETE",
               }
            );

            if (response.ok) {
               // Update state after deletion
               setShortages(shortages.filter((item) => item._id !== id));
               setFilteredShortages(
                  filteredShortages.filter((item) => item._id !== id)
               );
               setTotalCount(totalCount - 1);

               // Show success message
               Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
               });
            } else {
               console.error("Failed to delete shortage");
               Swal.fire({
                  title: "Error",
                  text: "Failed to delete the item. Please try again.",
                  icon: "error",
               });
            }
         } catch (error) {
            console.error("Error deleting shortage:", error);
            Swal.fire({
               title: "Error",
               text: "An error occurred while deleting the item.",
               icon: "error",
            });
         }
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      // Post new shortage data to the backend
      const response = await postShortage(newShortage);
      if (response.success) {
         setShortages([response.data, ...shortages]);
         setFilteredShortages([response.data, ...filteredShortages]);
         setTotalCount(totalCount + 1);
         setIsModalOpen(false);
      }
   };

   return (
      <div className="shortages-page">
         <div className="shortage-count">
            <h1>Total Reported Shortages: {totalCount}</h1>
         </div>

         <div className="filter-section">
            <label htmlFor="commodity">Filter by Commodity:</label>
            <select
               id="commodity"
               value={commodity}
               onChange={handleFilterChange}
            >
               <option value="">All</option>
               {Array.from(
                  new Set(shortages.map((item) => item.commodity))
               ).map((commodity, index) => (
                  <option key={index} value={commodity}>
                     {commodity}
                  </option>
               ))}
            </select>
         </div>

         {/* "Post Shortage" Button */}
         <div className="post-shortage-button">
            <button onClick={handleModalOpen}>Post Shortage</button>
         </div>

         <div className="shortages-list">
            {filteredShortages.map((shortage) => (
               <div className="shortage-item" key={shortage._id}>
                  <button
                     className="delete-button"
                     onClick={() => handleDelete(shortage._id)}
                  >
                     ×
                  </button>
                  <img
                     src={`/images/${shortage.image}`}
                     alt={shortage.commodity}
                     className="commodity-image"
                  />
                  <div>
                     <h3>{shortage.commodity}</h3>
                     <p>Location: {shortage.location}</p>
                     <p>Reported By: {shortage.reportedBy}</p>
                     <p>
                        Date:{" "}
                        {new Date(shortage.dateReported).toLocaleDateString()}
                     </p>
                  </div>
               </div>
            ))}
         </div>

         {/* Modal for posting a shortage */}
         <Modal
            isOpen={isModalOpen}
            onRequestClose={handleModalClose}
            contentLabel="Post Shortage"
            className="modal-content"
            overlayClassName="modal-overlay"
         >
            <h2>Post a Shortage</h2>
            <form onSubmit={handleSubmit}>
               <label>
                  Commodity:
                  <input
                     type="text"
                     name="commodity"
                     value={newShortage.commodity}
                     onChange={handleInputChange}
                     required
                  />
               </label>
               <label>
                  Location:
                  <input
                     type="text"
                     name="location"
                     value={newShortage.location}
                     onChange={handleInputChange}
                     required
                  />
               </label>
               <label>
                  Reported By:
                  <input
                     type="text"
                     name="reportedBy"
                     value={newShortage.reportedBy}
                     onChange={handleInputChange}
                     required
                  />
               </label>
               <label>
                  Image URL:
                  <input
                     type="text"
                     name="image"
                     value={newShortage.image}
                     onChange={handleInputChange}
                  />
               </label>
               {/* The date is set automatically, and not editable by the user */}
               <input
                  type="hidden"
                  name="dateReported"
                  value={newShortage.dateReported}
               />
               <button type="submit">Submit</button>
               <button type="button" onClick={handleModalClose}>
                  Cancel
               </button>
            </form>
         </Modal>
      </div>
   );
};

export default Shortages;
