import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import "./MyAccount.css";

const MyAccount = () => {
   const { user } = useUser();
   const navigate = useNavigate();
   const [activeTab, setActiveTab] = useState("accountInfo");

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
                  <button onClick={() => navigate("/my-account/edit")}>
                     Edit Info
                  </button>
               </div>
            )}
            {activeTab === "myProducts" && (
               <div className="my-products">
                  <h2>My Products</h2>
                  <p>You don’t have any products listed yet.</p>
                  <button
                     className="start-order-btn"
                     onClick={() => navigate("/add")}
                  >
                     Add a Product →
                  </button>
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
