// // // frontend/src/pages/Shortages.js
// import Swal from "sweetalert2";
// import React, { useState, useEffect } from "react";
// import {
//    getShortages,
//    getShortagesByCommodity,
//    postShortage,
// } from "../services/api";
// import Modal from "react-modal"; // If you are using react-modal for the modal window
// import "./Shortages.css";

// // Ensure Modal is attached to the app element
// Modal.setAppElement("#root");

// const Shortages = () => {
//    const [shortages, setShortages] = useState([]);
//    const [filteredShortages, setFilteredShortages] = useState([]);
//    const [commodity, setCommodity] = useState("");
//    const [totalCount, setTotalCount] = useState(0);

//    const [isModalOpen, setIsModalOpen] = useState(false);
//    const [newShortage, setNewShortage] = useState({
//       commodity: "",
//       location: "",
//       reportedBy: "",
//       image: "",
//       dateReported: new Date().toISOString(),
//    });

//    useEffect(() => {
//       const fetchData = async () => {
//          const data = await getShortages();
//          setShortages(data);
//          setFilteredShortages(data);
//          setTotalCount(data.length);
//       };
//       fetchData();
//    }, []);

//    const handleFilterChange = async (e) => {
//       const selectedCommodity = e.target.value;
//       setCommodity(selectedCommodity);

//       if (selectedCommodity === "") {
//          setFilteredShortages(shortages);
//       } else {
//          const data = await getShortagesByCommodity(selectedCommodity);
//          setFilteredShortages(data);
//       }
//    };

//    const handleModalClose = () => {
//       setIsModalOpen(false);
//    };

//    const handleModalOpen = () => {
//       setIsModalOpen(true);
//    };

//    const handleInputChange = (e) => {
//       const { name, value } = e.target;
//       setNewShortage({ ...newShortage, [name]: value });
//    };

//    const handleDelete = async (id) => {
//       console.log("Deleting shortage with id:", id);
//       // Show confirmation dialog
//       const result = await Swal.fire({
//          title: "Are you sure?",
//          text: "You won't be able to revert this!",
//          icon: "warning",
//          showCancelButton: true,
//          confirmButtonColor: "#3085d6",
//          cancelButtonColor: "#d33",
//          confirmButtonText: "Yes, delete it!",
//       });

//       // If the user confirms deletion
//       if (result.isConfirmed) {
//          try {
//             const response = await fetch(
//                `http://localhost:5000/api/shortages/${id}`,
//                {
//                   method: "DELETE",
//                }
//             );

//             if (response.ok) {
//                // Update state after deletion
//                setShortages(shortages.filter((item) => item._id !== id));
//                setFilteredShortages(
//                   filteredShortages.filter((item) => item._id !== id)
//                );
//                setTotalCount(totalCount - 1);

//                // Show success message
//                Swal.fire({
//                   title: "Deleted!",
//                   text: "Your file has been deleted.",
//                   icon: "success",
//                });
//             } else {
//                console.error("Failed to delete shortage");
//                Swal.fire({
//                   title: "Error",
//                   text: "Failed to delete the item. Please try again.",
//                   icon: "error",
//                });
//             }
//          } catch (error) {
//             console.error("Error deleting shortage:", error);
//             Swal.fire({
//                title: "Error",
//                text: "An error occurred while deleting the item.",
//                icon: "error",
//             });
//          }
//       }
//    };

//    const handleSubmit = async (e) => {
//       e.preventDefault();
//       // Post new shortage data to the backend
//       const response = await postShortage(newShortage);
//       if (response.success) {
//          setShortages([response.data, ...shortages]);
//          setFilteredShortages([response.data, ...filteredShortages]);
//          setTotalCount(totalCount + 1);
//          setIsModalOpen(false);
//       }
//    };

//    return (
//       <div className="shortages-page">
//          <div className="shortage-count">
//             <h1>Total Reported Shortages: {totalCount}</h1>
//          </div>

//          <div className="filter-section">
//             <label htmlFor="commodity">Filter by Commodity:</label>
//             <select
//                id="commodity"
//                value={commodity}
//                onChange={handleFilterChange}
//             >
//                <option value="">All</option>
//                {Array.from(
//                   new Set(shortages.map((item) => item.commodity))
//                ).map((commodity, index) => (
//                   <option key={index} value={commodity}>
//                      {commodity}
//                   </option>
//                ))}
//             </select>
//          </div>

//          {/* "Post Shortage" Button */}
//          <div className="post-shortage-button">
//             <button onClick={handleModalOpen}>Post Shortage</button>
//          </div>

//          <div className="shortages-list">
//             {filteredShortages.map((shortage) => (
//                <div className="shortage-item" key={shortage._id}>
//                   <button
//                      className="delete-button"
//                      onClick={() => handleDelete(shortage._id)}
//                   >
//                      ×
//                   </button>
//                   <img
//                      src={`/images/${shortage.image}`}
//                      alt={shortage.commodity}
//                      className="commodity-image"
//                   />
//                   <div>
//                      <h3>{shortage.commodity}</h3>
//                      <p>Location: {shortage.location}</p>
//                      <p>Reported By: {shortage.reportedBy}</p>
//                      <p>
//                         Date:{" "}
//                         {new Date(shortage.dateReported).toLocaleDateString()}
//                      </p>
//                   </div>
//                </div>
//             ))}
//          </div>

//          {/* Modal for posting a shortage */}
//          <Modal
//             isOpen={isModalOpen}
//             onRequestClose={handleModalClose}
//             contentLabel="Post Shortage"
//             className="modal-content"
//             overlayClassName="modal-overlay"
//          >
//             <h2>Post a Shortage</h2>
//             <form onSubmit={handleSubmit}>
//                <label>
//                   Commodity:
//                   <input
//                      type="text"
//                      name="commodity"
//                      value={newShortage.commodity}
//                      onChange={handleInputChange}
//                      required
//                   />
//                </label>
//                <label>
//                   Location:
//                   <input
//                      type="text"
//                      name="location"
//                      value={newShortage.location}
//                      onChange={handleInputChange}
//                      required
//                   />
//                </label>
//                <label>
//                   Reported By:
//                   <input
//                      type="text"
//                      name="reportedBy"
//                      value={newShortage.reportedBy}
//                      onChange={handleInputChange}
//                      required
//                   />
//                </label>
//                <label>
//                   Image URL:
//                   <input
//                      type="text"
//                      name="image"
//                      value={newShortage.image}
//                      onChange={handleInputChange}
//                   />
//                </label>
//                {/* The date is set automatically, and not editable by the user */}
//                <input
//                   type="hidden"
//                   name="dateReported"
//                   value={newShortage.dateReported}
//                />
//                <button type="submit">Submit</button>
//                <button type="button" onClick={handleModalClose}>
//                   Cancel
//                </button>
//             </form>
//          </Modal>
//       </div>
//    );
// };

// export default Shortages;

// const handlePostShortage = async () => {
//    const { value: formValues } = await Swal.fire({
//       title: "Post a Shortage",
//       html: `
//    <label>Commodity:</label>
//    <input id="swal-commodity" class="custom-swal-input" type="text" required>
//    <label>Location:</label>
//    <input id="swal-location" class="custom-swal-input" type="text" required>
//    <label>Reported By:</label>
//    <input id="swal-reportedBy" class="custom-swal-input" type="text" required>
//    <label>Image URL:</label>
//    <input id="swal-image" class="custom-swal-input" type="text">
// `,
//       customClass: {
//          popup: "custom-swal-popup", // Use this for global modal styles
//       },
//       focusConfirm: false,
//       showCancelButton: true,

//       preConfirm: () => {
//          const commodity = document.getElementById("swal-commodity").value;
//          const location = document.getElementById("swal-location").value;
//          const reportedBy = document.getElementById("swal-reportedBy").value;
//          const image = document.getElementById("swal-image").value;

//          if (!commodity || !location || !reportedBy) {
//             Swal.showValidationMessage(
//                "Please fill out all required fields."
//             );
//             return null;
//          }

//          return {
//             commodity,
//             location,
//             reportedBy,
//             image,
//             dateReported: new Date().toISOString(),
//          };
//       },
//    });

//    if (formValues) {
//       try {
//          const response = await postShortage(formValues);

//          if (response.success) {
//             setShortages([response.data, ...shortages]);
//             setFilteredShortages([response.data, ...filteredShortages]);
//             setTotalCount(totalCount + 1);

//             Swal.fire(
//                "Success!",
//                "The shortage has been posted.",
//                "success"
//             );
//          } else {
//             Swal.fire("Error", "Failed to post the shortage.", "error");
//          }
//       } catch (error) {
//          Swal.fire("Error", "An unexpected error occurred.", "error");
//       }
//    }
// };

import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import React, { useState, useEffect } from "react";
import {
   getShortages,
   getShortagesByCommodity,
   postShortage,
} from "../services/api";
import "./Shortages.css";
// import shortageImage from `./../assets/images/${shortage.image}`;

const Shortages = () => {
   const [shortages, setShortages] = useState([]);
   const [filteredShortages, setFilteredShortages] = useState([]);
   const [commodity, setCommodity] = useState("");
   const [totalCount, setTotalCount] = useState(0);

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
         // Reset to show all shortages
         setFilteredShortages(shortages);
      } else {
         // Filter shortages locally instead of relying on backend filtering
         const filtered = shortages.filter(
            (item) => item.commodity === selectedCommodity
         );

         if (filtered.length > 0) {
            setFilteredShortages(filtered);
         } else {
            // If no matches, clear the list
            setFilteredShortages([]);
            console.warn("No shortages found for selected commodity");
         }
      }
   };

   const handleDelete = async (id) => {
      const result = await Swal.fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
         try {
            const response = await fetch(
               `http://localhost:5000/api/shortages/${id}`,
               { method: "DELETE" }
            );

            if (response.ok) {
               setShortages(shortages.filter((item) => item._id !== id));
               setFilteredShortages(
                  filteredShortages.filter((item) => item._id !== id)
               );
               setTotalCount(totalCount - 1);

               Swal.fire("Deleted!", "Your file has been deleted.", "success");
            } else {
               Swal.fire(
                  "Error",
                  "Failed to delete the item. Please try again.",
                  "error"
               );
            }
         } catch (error) {
            Swal.fire(
               "Error",
               "An error occurred while deleting the item.",
               "error"
            );
         }
      }
   };

   const handlePostShortage = async () => {
      const commodities = [
         "Other",
         "Beans",
         "Carrot",
         "Cabbage",
         "Tomato",
         "Brinjal",
         "Pumpkin",
         "Snake gourd",
         "Green Chilli",
         "Lime",
         "Coconut",
         "Sprats",
         "Red Onion (Local)",
         "Red Onion (Imp)",
         "Big Onion (Local)",
         "Big Onion (Imp)",
         "Potato (Local)",
         "Potato (Imp)",
         "Dried Chilli (Imp)",
         "Red Dhal",
         "Coconut Oil",
         "Katta (imp)",
      ];

      const { value: formValues } = await Swal.fire({
         title: "Post a Shortage",
         html: `
         <label>Commodity:</label>
         <select id="swal-commodity" class="custom-swal-input ModalItemDropdown" required>
            ${commodities
               .map(
                  (commodity) =>
                     `<option value="${commodity}">${commodity}</option>`
               )
               .join("")}
         </select>
         <label>Location:</label>
         <input id="swal-location" class="custom-swal-input" type="text" required>
         <label>Reported By:</label>
         <input id="swal-reportedBy" class="custom-swal-input" type="text" required>
      `,
         customClass: {
            popup: "custom-swal-popup", // Use this for global modal styles
         },
         focusConfirm: false,
         showCancelButton: true,

         preConfirm: () => {
            const commodity = document.getElementById("swal-commodity").value;
            const location = document.getElementById("swal-location").value;
            const reportedBy = document.getElementById("swal-reportedBy").value;

            if (!commodity || !location || !reportedBy) {
               Swal.showValidationMessage(
                  "Please fill out all required fields."
               );
               return null;
            }

            // Automatically set the image URL based on the selected commodity
            const image = `${commodity.toLowerCase().replace(/\s+/g, "-")}.png`;

            return {
               commodity,
               location,
               reportedBy,
               image,
               dateReported: new Date().toISOString(),
            };
         },
      });

      if (formValues) {
         try {
            const response = await postShortage(formValues);

            if (response.success) {
               setShortages([response.data, ...shortages]);
               setFilteredShortages([response.data, ...filteredShortages]);
               setTotalCount(totalCount + 1);

               Swal.fire(
                  "Success!",
                  "The shortage has been posted.",
                  "success"
               );
            } else {
               Swal.fire("Error", "Failed to post the shortage.", "error");
            }
         } catch (error) {
            Swal.fire("Error", "An unexpected error occurred.", "error");
         }
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
               {shortages.length > 0 &&
                  Array.from(
                     new Set(shortages.map((item) => item.commodity))
                  ).map((commodity, index) => (
                     <option key={index} value={commodity}>
                        {commodity}
                     </option>
                  ))}
            </select>
         </div>

         <div className="post-shortage-button">
            <button onClick={handlePostShortage}>Post Shortage</button>
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
                     src={(() => {
                        try {
                           return require(`./../assets/images/${shortage.image}`);
                        } catch {
                           return require("./../assets/images/other.png"); // Fallback image
                        }
                     })()}
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
      </div>
   );
};

export default Shortages;
