import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { getUserProducts } from "../services/api"; // Import API service to fetch products
import "./MyAccount.css";
import { useAuth } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";

// import axios from "axios";

const MyAccount = () => {
   const currentLocation = useLocation();
   console.log("MyAccount component is rendering!");
   const { user, isLoaded } = useUser();
   const navigate = useNavigate();
   // const [activeTab, setActiveTab] = useState("accountInfo");

   // Initialize the state based on location.pathname
   const [activeTab, setActiveTab] = useState("accountInfo");

   const [isEditing, setIsEditing] = useState(false); // Manage editing state
   const [formData, setFormData] = useState({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.emailAddresses[0]?.emailAddress || "",
   });
   const { getToken } = useAuth(); // Destructure getToken from useAuth

   if (isLoaded && user) {
      console.log(user.id); // This is the Clerk user ID
   }

   const [userProducts, setUserProducts] = useState([]); // State to hold user products
   const [loading, setLoading] = useState(true); // Loading state for products

   useEffect(() => {
      const fetchUserProducts = async () => {
         try {
            if (!user) return; // Ensure user exists
            setLoading(true); // Set loading state

            const token = await getToken(); // Fetch Clerk token
            const email = user?.emailAddresses[0]?.emailAddress; // Get user email
            if (!email) {
               throw new Error("User email not found");
            }
            console.log(token, email);
            const products = await getUserProducts(token, email); // Fetch user products
            setUserProducts(products); // Update state
         } catch (error) {
            console.error("Error fetching products:", error);
            alert("Failed to load products. Please try again later.");
         } finally {
            setLoading(false); // Stop loading
         }
      };

      if (isLoaded && user) {
         fetchUserProducts();
      } else {
         console.log("User not loaded yet or is not available.");
      }
   }, [isLoaded, user]);

   // Handle Delete Product
   const handleDeleteProduct = async (id) => {
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
               `http://localhost:5000/api/marketplacelistings/${id}`,
               { method: "DELETE" }
            );

            if (response.ok) {
               // Remove the deleted product from the userProducts state
               setUserProducts((prevProducts) =>
                  prevProducts.filter((product) => product._id !== id)
               );
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

   // Handle form input changes
   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   // Update user profile
   const handleUpdate = async (e) => {
      e.preventDefault();

      try {
         if (!isLoaded || !user) return;

         // Ensure the payload has correct fields (Clerk typically uses camelCase)
         const payload = {
            firstName: formData.firstName, // Use camelCase as per Clerk API
            lastName: formData.lastName, // Use camelCase
         };

         // Attempt to update the user with the correct payload
         await user.update(payload);

         setIsEditing(false); // End editing mode
         alert("Profile updated successfully!");
      } catch (error) {
         console.error("Error updating profile:", error);
         alert("An error occurred while updating your profile.");
      }
   };

   const handleDeleteAccount = () => {
      // Delete account logic can be implemented here
   };

   const menuItems = [
      { key: "accountInfo", label: "Account Info" },
      { key: "myOrders", label: "My Orders" },
      { key: "myProducts", label: "My Products" },
      { key: "govtInfo", label: "Government Info" },
      { key: "farmingTips", label: "Farming Tips" },
      { key: "marketUpdates", label: "Market Updates" },
   ];

   return (
      <div className="my-account-page">
         <div className="sidebar">
            <ul>
               {menuItems.map((item) => (
                  <li
                     key={item.key}
                     className={activeTab === item.key ? "active" : ""}
                     onClick={() => setActiveTab(item.key)}
                  >
                     {item.label}
                  </li>
               ))}
            </ul>
         </div>
         <div className="content">
            {activeTab === "accountInfo" && (
               <div className="account-info">
                  <h2>Account Information</h2>
                  {isEditing ? (
                     <form onSubmit={handleUpdate}>
                        <div>
                           <label>First Name: </label>
                           <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              required
                           />
                        </div>
                        <div>
                           <label>Last Name: </label>
                           <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              required
                           />
                        </div>
                        <div>
                           <label>Email: </label>
                           <input
                              value={
                                 user?.emailAddresses[0]?.emailAddress || ""
                              }
                              disabled
                           />
                        </div>
                        <button type="submit">Save Changes</button>
                        <button
                           type="button"
                           onClick={() => setIsEditing(false)}
                        >
                           Cancel
                        </button>
                     </form>
                  ) : (
                     <>
                        <p>
                           <strong>First Name:</strong> {user?.firstName}
                        </p>
                        <p>
                           <strong>Last Name:</strong> {user?.lastName}
                        </p>
                        <p>
                           <strong>Email:</strong>{" "}
                           {user?.emailAddresses[0]?.emailAddress}
                        </p>
                        <button onClick={() => setIsEditing(true)}>
                           Edit Info
                        </button>
                        <button onClick={() => handleDeleteAccount()}>
                           Delete Account
                        </button>
                     </>
                  )}
               </div>
            )}
            {activeTab === "myProducts" && (
               <div className="my-products">
                  <div className="products-header">
                     <h2>My Products</h2>
                     <button
                        className="start-order-btn"
                        onClick={() => navigate("/add")}
                     >
                        Add a Product →
                     </button>
                  </div>

                  {loading ? (
                     <p>Loading products...</p>
                  ) : userProducts.length === 0 ? (
                     <p>You don’t have any products listed yet.</p>
                  ) : (
                     <div className="product-list">
                        {userProducts.map((product) => (
                           <div key={product._id} className="listing-tile">
                              <img
                                 src={`http://localhost:5000${product.image}`}
                                 alt={product.title}
                              />
                              <h3>{product.title}</h3>
                              <p>{product.description}</p>
                              <p>
                                 <strong>Price:</strong> {product.price} LKR
                              </p>
                              <p>
                                 <strong>Location:</strong> {product.location}
                              </p>
                              <button
                                 onClick={() =>
                                    navigate(`/edit-product/${product._id}`)
                                 }
                              >
                                 Edit Product
                              </button>
                              <button
                                 className="product-delete-button"
                                 onClick={() =>
                                    handleDeleteProduct(product._id)
                                 }
                              >
                                 ×
                              </button>
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            )}
            {activeTab === "myOrders" && (
               <div className="my-orders">
                  <h2>My Orders</h2>
                  <p>No orders yet. Start an order now!</p>
                  <button
                     className="start-order-btn"
                     onClick={() => navigate("/marketplace")}
                  >
                     Go to Marketplace →
                  </button>
               </div>
            )}
            {activeTab === "govtInfo" && (
               <div className="govt-info">
                  <h2>Government Information</h2>
                  <p>
                     Here you can view government schemes and subsidies for
                     farmers.
                  </p>
                  <p>Check back soon for updates!</p>
               </div>
            )}
            {activeTab === "farmingTips" && (
               <div className="farming-tips">
                  <h2>Farming Tips</h2>
                  <p>Get the latest tips and tricks to improve your yield.</p>
               </div>
            )}
            {activeTab === "marketUpdates" && (
               <div className="market-updates">
                  <h2>Market Updates</h2>
                  <p>Stay updated with the latest market trends and prices.</p>
               </div>
            )}
         </div>
      </div>
   );
};

export default MyAccount;

// import React, { useState } from "react";
// import { useUser } from "@clerk/clerk-react";
// import { useNavigate } from "react-router-dom";
// import "./MyAccount.css";

// const MyAccount = () => {
//    const { user, isLoaded } = useUser();
//    const navigate = useNavigate();
//    const [activeTab, setActiveTab] = useState("accountInfo");
//    const [isEditing, setIsEditing] = useState(false); // Manage editing state
//    const [formData, setFormData] = useState({
//       firstName: user?.firstName || "",
//       lastName: user?.lastName || "",
//       email: user?.emailAddresses[0]?.emailAddress || "",
//    });

//    // Handle form input changes
//    const handleInputChange = (e) => {
//       const { name, value } = e.target;
//       setFormData({ ...formData, [name]: value });
//    };

//    // Update user profile
//    const handleUpdate = async (e) => {
//       e.preventDefault();

//       try {
//          if (!isLoaded || !user) return;

//          // Ensure the payload has correct fields (Clerk typically uses camelCase)
//          const payload = {
//             firstName: formData.firstName, // Use camelCase as per Clerk API
//             lastName: formData.lastName, // Use camelCase
//             // emailAddresses: [{ emailAddress: formData.email }], // Make sure email format is correct
//          };

//          // Attempt to update the user with the correct payload
//          await user.update(payload);

//          setIsEditing(false); // End editing mode
//          alert("Profile updated successfully!");
//       } catch (error) {
//          console.error("Error updating profile:", error);
//          alert("An error occurred while updating your profile.");
//       }
//    };

//    const handleDeleteAccount = {};
//    const menuItems = [
//       { key: "accountInfo", label: "Account Info" },
//       { key: "myOrders", label: "My Orders" },
//       { key: "myProducts", label: "My Products" },
//       { key: "govtInfo", label: "Government Info" },
//       { key: "farmingTips", label: "Farming Tips" },
//       { key: "marketUpdates", label: "Market Updates" },
//    ];

//    return (
//       <div className="my-account-page">
//          <div className="sidebar">
//             <ul>
//                {menuItems.map((item) => (
//                   <li
//                      key={item.key}
//                      className={activeTab === item.key ? "active" : ""}
//                      onClick={() => setActiveTab(item.key)}
//                   >
//                      {item.label}
//                   </li>
//                ))}
//             </ul>
//          </div>
//          <div className="content">
//             {activeTab === "accountInfo" && (
//                <div className="account-info">
//                   <h2>Account Information</h2>
//                   {isEditing ? (
//                      <form onSubmit={handleUpdate}>
//                         <div>
//                            <label>First Name: </label>
//                            <input
//                               type="text"
//                               name="firstName"
//                               value={formData.firstName}
//                               onChange={handleInputChange}
//                               required
//                            />
//                         </div>
//                         <div>
//                            <label>Last Name: </label>
//                            <input
//                               type="text"
//                               name="lastName"
//                               value={formData.lastName}
//                               onChange={handleInputChange}
//                               required
//                            />
//                         </div>
//                         <div>
//                            <label>Email: </label>
//                            <input
//                               value={
//                                  user?.emailAddresses[0]?.emailAddress || ""
//                               }
//                               disabled
//                            />
//                         </div>
//                         <button type="submit">Save Changes</button>
//                         <button
//                            type="button"
//                            onClick={() => setIsEditing(false)}
//                         >
//                            Cancel
//                         </button>
//                      </form>
//                   ) : (
//                      <>
//                         <p>
//                            <strong>First Name:</strong> {user?.firstName}
//                         </p>
//                         <p>
//                            <strong>Last Name:</strong> {user?.lastName}
//                         </p>
//                         <p>
//                            <strong>Email:</strong>{" "}
//                            {user?.emailAddresses[0]?.emailAddress}
//                         </p>
//                         <button onClick={() => setIsEditing(true)}>
//                            Edit Info
//                         </button>
//                         <button onClick={() => handleDeleteAccount}>
//                            Delete Account
//                         </button>
//                      </>
//                   )}
//                </div>
//             )}
//             {activeTab === "myProducts" && (
//                <div className="my-products">
//                   <h2>My Products</h2>
//                   <p>You don’t have any products listed yet.</p>
//                   <button
//                      className="start-order-btn"
//                      onClick={() => navigate("/add")}
//                   >
//                      Add a Product →
//                   </button>
//                </div>
//             )}
//             {activeTab === "myOrders" && (
//                <div className="my-orders">
//                   <h2>My Orders</h2>
//                   <p>No orders yet. Start an order now!</p>
//                   <button
//                      className="start-order-btn"
//                      onClick={() => navigate("/marketplace")}
//                   >
//                      Go to Marketplace →
//                   </button>
//                </div>
//             )}
//             {activeTab === "govtInfo" && (
//                <div className="govt-info">
//                   <h2>Government Information</h2>
//                   <p>
//                      Here you can view government schemes and subsidies for
//                      farmers.
//                   </p>
//                   <p>Check back soon for updates!</p>
//                </div>
//             )}
//             {activeTab === "farmingTips" && (
//                <div className="farming-tips">
//                   <h2>Farming Tips</h2>
//                   <p>Get the latest tips and tricks to improve your yield.</p>
//                </div>
//             )}
//             {activeTab === "marketUpdates" && (
//                <div className="market-updates">
//                   <h2>Market Updates</h2>
//                   <p>Stay updated with the latest market trends and prices.</p>
//                </div>
//             )}
//          </div>
//       </div>
//    );
// };

// export default MyAccount;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "@clerk/clerk-react";
// import "./MyAccount.css";

// const MyAccount = () => {
//    const { user } = useUser();
//    const navigate = useNavigate();
//    const [activeTab, setActiveTab] = useState("accountInfo");

//    const menuItems = [
//       { key: "accountInfo", label: "Account Info" },
//       { key: "myOrders", label: "My Orders" },
//       { key: "myProducts", label: "My Products" },
//       { key: "govtInfo", label: "Government Info" },
//       { key: "farmingTips", label: "Farming Tips" },
//       { key: "marketUpdates", label: "Market Updates" },
//    ];

//    return (
//       <div className="my-account-page">
//          <div className="sidebar">
//             <ul>
//                {menuItems.map((item) => (
//                   <li
//                      key={item.key}
//                      className={activeTab === item.key ? "active" : ""}
//                      onClick={() => setActiveTab(item.key)}
//                   >
//                      {item.label}
//                   </li>
//                ))}
//             </ul>
//          </div>
//          <div className="content">
//             {activeTab === "accountInfo" && (
//                <div className="account-info">
//                   <h2>Account Information</h2>
//                   <p>
//                      <strong>First Name:</strong> {user?.firstName}
//                   </p>
//                   <p>
//                      <strong>Last Name:</strong> {user?.lastName}
//                   </p>
//                   <p>
//                      <strong>Email:</strong>{" "}
//                      {user?.emailAddresses[0]?.emailAddress}
//                   </p>
//                   <button onClick={() => navigate("/my-account/edit")}>
//                      Edit Info
//                   </button>
//                </div>
//             )}
//             {activeTab === "myProducts" && (
//                <div className="my-products">
//                   <h2>My Products</h2>
//                   <p>You don’t have any products listed yet.</p>
//                   <button
//                      className="start-order-btn"
//                      onClick={() => navigate("/add")}
//                   >
//                      Add a Product →
//                   </button>
//                </div>
//             )}
//             {activeTab === "myOrders" && (
//                <div className="my-orders">
//                   <h2>My Orders</h2>
//                   <p>No orders yet. Start an order now!</p>
//                   <button
//                      className="start-order-btn"
//                      onClick={() => navigate("/marketplace")}
//                   >
//                      Go to Marketplace →
//                   </button>
//                </div>
//             )}
//             {activeTab === "govtInfo" && (
//                <div className="govt-info">
//                   <h2>Government Information</h2>
//                   <p>
//                      Here you can view government schemes and subsidies for
//                      farmers.
//                   </p>
//                   <p>Check back soon for updates!</p>
//                </div>
//             )}
//             {activeTab === "farmingTips" && (
//                <div className="farming-tips">
//                   <h2>Farming Tips</h2>
//                   <p>Get the latest tips and tricks to improve your yield.</p>
//                </div>
//             )}
//             {activeTab === "marketUpdates" && (
//                <div className="market-updates">
//                   <h2>Market Updates</h2>
//                   <p>Stay updated with the latest market trends and prices.</p>
//                </div>
//             )}
//          </div>
//       </div>
//    );
// };

// export default MyAccount;

// ======================================================================og2================
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "@clerk/clerk-react";
// import "./MyAccount.css";
// import axios from "axios";

// const MyAccount = () => {
//    const { user } = useUser(); // Fetch user details
//    const navigate = useNavigate();
//    const [activeTab, setActiveTab] = useState("accountInfo"); // Default active tab
//    const [showAddForm, setShowAddForm] = useState(false);

//    const [productForm, setProductForm] = useState({
//       title: "",
//       description: "",
//       price: "",
//       category: "",
//       location: "",
//       // contact: user?.emailAddresses[0]?.emailAddress || "",
//    });

//    const handleFormChange = (e) => {
//       const { name, value } = e.target;
//       setProductForm((prev) => ({ ...prev, [name]: value }));
//    };

//    const handleAddProduct = async (e) => {
//       e.preventDefault();
//       try {
//          const response = await axios.post(
//             "http://localhost:5000/api/marketplacelistings",
//             {
//                title: productForm.title,
//                description: productForm.description,
//                price: productForm.price,
//                category: productForm.category,
//                location: productForm.location,
//                createdAt: new Date().toISOString(),
//             }
//          );
//          alert("Product added successfully!");
//          setProductForm({
//             title: "",
//             description: "",
//             price: "",
//             category: "",
//             location: "",
//          });
//       } catch (error) {
//          console.error("Error adding product:", error);
//          alert("Failed to add product. Please try again.");
//       }
//    };

//    // Sidebar menu items
//    const menuItems = [
//       { key: "accountInfo", label: "Account Info" },
//       { key: "myOrders", label: "My Orders" },
//       { key: "myProducts", label: "My Products" }, // New menu item
//       { key: "govtInfo", label: "Government Info" },
//       { key: "farmingTips", label: "Farming Tips" },
//       { key: "marketUpdates", label: "Market Updates" },
//    ];

//    return (
//       <div className="my-account-page">
//          <div className="sidebar">
//             <ul>
//                {menuItems.map((item) => (
//                   <li
//                      key={item.key}
//                      className={activeTab === item.key ? "active" : ""}
//                      onClick={() => setActiveTab(item.key)}
//                   >
//                      {item.label}
//                   </li>
//                ))}
//             </ul>
//          </div>
//          <div className="content">
//             {activeTab === "accountInfo" && (
//                <div className="account-info">
//                   <h2>Account Information</h2>
//                   <p>
//                      <strong>First Name:</strong> {user?.firstName}
//                   </p>
//                   <p>
//                      <strong>Last Name:</strong> {user?.lastName}
//                   </p>
//                   <p>
//                      <strong>Email:</strong>{" "}
//                      {user?.emailAddresses[0]?.emailAddress}
//                   </p>
//                   <button onClick={() => navigate("/my-account/edit")}>
//                      Edit Info
//                   </button>
//                </div>
//             )}
//             {activeTab === "myOrders" && (
//                <div className="my-orders">
//                   <h2>My Orders</h2>
//                   <p>No orders yet. Start an order now!</p>
//                   <button
//                      className="start-order-btn"
//                      onClick={() => navigate("/marketplace")}
//                   >
//                      Go to Marketplace →
//                   </button>
//                </div>
//             )}
//             {activeTab === "myProducts" && (
//                <div className="my-products">
//                   <h2>My Products</h2>
//                   {!showAddForm ? (
//                      <>
//                         <p>You don’t have any products listed yet.</p>
//                         <button
//                            className="start-order-btn"
//                            onClick={() => setShowAddForm(true)}
//                         >
//                            Add a Product →
//                         </button>
//                      </>
//                   ) : (
//                      <form className="product-form" onSubmit={handleAddProduct}>
//                         <label>
//                            Title:
//                            <input
//                               type="text"
//                               name="title"
//                               value={productForm.title}
//                               onChange={handleFormChange}
//                               required
//                            />
//                         </label>
//                         <label>
//                            Description:
//                            <textarea
//                               name="description"
//                               value={productForm.description}
//                               onChange={handleFormChange}
//                               required
//                            />
//                         </label>
//                         <label>
//                            Price:
//                            <input
//                               type="number"
//                               name="price"
//                               value={productForm.price}
//                               onChange={handleFormChange}
//                               required
//                            />
//                         </label>
//                         <label>
//                            Category:
//                            <input
//                               type="text"
//                               name="category"
//                               value={productForm.category}
//                               onChange={handleFormChange}
//                               required
//                            />
//                         </label>
//                         <label>
//                            Location:
//                            <input
//                               type="text"
//                               name="location"
//                               value={productForm.location}
//                               onChange={handleFormChange}
//                               required
//                            />
//                         </label>
//                         <label>
//                            By:
//                            <input
//                               type="text"
//                               name="author"
//                               value={user?.firstName}
//                               onChange={handleFormChange}
//                               required
//                            />
//                         </label>
//                         <button type="submit">Submit Product</button>
//                         <button
//                            type="button"
//                            className="cancel-btn"
//                            onClick={() => setShowAddForm(false)}
//                         >
//                            Cancel
//                         </button>
//                      </form>
//                   )}
//                </div>
//             )}

//             {activeTab === "govtInfo" && (
//                <div className="govt-info">
//                   <h2>Government Information</h2>
//                   <p>
//                      Here you can view government schemes and subsidies for
//                      farmers.
//                   </p>
//                   <p>Check back soon for updates!</p>
//                </div>
//             )}
//             {activeTab === "farmingTips" && (
//                <div className="farming-tips">
//                   <h2>Farming Tips</h2>
//                   <p>Get the latest tips and tricks to improve your yield.</p>
//                </div>
//             )}
//             {activeTab === "marketUpdates" && (
//                <div className="market-updates">
//                   <h2>Market Updates</h2>
//                   <p>Stay updated with the latest market trends and prices.</p>
//                </div>
//             )}
//          </div>
//       </div>
//    );
// };

// export default MyAccount;

// ====================================og=================-----------------------------------=======
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "@clerk/clerk-react";
// import axios from "axios";
// import "./MyAccount.css";

// const MyAccount = () => {
//    const { user } = useUser();
//    const navigate = useNavigate();
//    const [activeTab, setActiveTab] = useState("accountInfo");
//    const [productForm, setProductForm] = useState({
//       cropName: "",
//       quantity: "",
//       price: "",
//       deliveryCost: "",
//       contact: user?.emailAddresses[0]?.emailAddress || "",
//    });

//    const menuItems = [
//       { key: "accountInfo", label: "Account Info" },
//       { key: "myOrders", label: "My Orders" },
//       { key: "myProducts", label: "My Products" },
//       { key: "govtInfo", label: "Government Info" },
//    ];

//    const handleFormChange = (e) => {
//       const { name, value } = e.target;
//       setProductForm((prev) => ({ ...prev, [name]: value }));
//    };

//    const handleAddProduct = async (e) => {
//       e.preventDefault();
//       try {
//          const response = await axios.post(
//             "http://localhost:5000/api/marketplacelistings",
//             productForm
//          );
//          alert("Product added successfully!");
//          setProductForm({
//             cropName: "",
//             quantity: "",
//             price: "",
//             deliveryCost: "",
//             contact: user?.emailAddresses[0]?.emailAddress || "",
//          });
//       } catch (error) {
//          console.error("Error adding product:", error);
//          alert("Failed to add product. Please try again.");
//       }
//    };

//    return (
//       <div className="my-account-page">
//          <div className="sidebar">
//             <ul>
//                {menuItems.map((item) => (
//                   <li
//                      key={item.key}
//                      className={activeTab === item.key ? "active" : ""}
//                      onClick={() => setActiveTab(item.key)}
//                   >
//                      {item.label}
//                   </li>
//                ))}
//             </ul>
//          </div>
//          <div className="content">
//             {activeTab === "accountInfo" && (
//                <div className="account-info">
//                   <h2>Account Information</h2>
//                   <p><strong>First Name:</strong> {user?.firstName}</p>
//                   <p><strong>Last Name:</strong> {user?.lastName}</p>
//                   <p><strong>Email:</strong> {user?.emailAddresses[0]?.emailAddress}</p>
//                   <button onClick={() => navigate("/my-account/edit")}>Edit Info</button>
//                </div>
//             )}
//             {activeTab === "myProducts" && (
//                <div className="my-products">
//                   <h2>My Products</h2>
//                   <form className="product-form" onSubmit={handleAddProduct}>
//                      <label>
//                         Crop Name:
//                         <input
//                            type="text"
//                            name="cropName"
//                            value={productForm.cropName}
//                            onChange={handleFormChange}
//                            required
//                         />
//                      </label>
//                      <label>
//                         Quantity (kg):
//                         <input
//                            type="number"
//                            name="quantity"
//                            value={productForm.quantity}
//                            onChange={handleFormChange}
//                            required
//                         />
//                      </label>
//                      <label>
//                         Price (per kg):
//                         <input
//                            type="number"
//                            name="price"
//                            value={productForm.price}
//                            onChange={handleFormChange}
//                            required
//                         />
//                      </label>
//                      <label>
//                         Delivery Cost:
//                         <input
//                            type="number"
//                            name="deliveryCost"
//                            value={productForm.deliveryCost}
//                            onChange={handleFormChange}
//                            required
//                         />
//                      </label>
//                      <label>
//                         Contact:
//                         <input
//                            type="text"
//                            name="contact"
//                            value={productForm.contact}
//                            onChange={handleFormChange}
//                            required
//                         />
//                      </label>
//                      <button type="submit">Add Product</button>
//                   </form>
//                </div>
//             )}
//          </div>
//       </div>
//    );
// };

// export default MyAccount;
