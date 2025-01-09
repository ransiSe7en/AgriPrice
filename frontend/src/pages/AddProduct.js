import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import "./AddProduct.css";

const AddProduct = () => {
   const { user } = useUser();
   const navigate = useNavigate();

   const [productForm, setProductForm] = useState({
      title: "",
      description: "",
      price: "",
      category: "",
      location: "",
      author: user?.firstName || "",
   });

   const [image, setImage] = useState(null);

   const handleFormChange = (e) => {
      const { name, value } = e.target;
      setProductForm((prev) => ({ ...prev, [name]: value }));
   };

   const handleImageChange = (e) => {
      setImage(e.target.files[0]);
   };

   const handleAddProduct = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      Object.keys(productForm).forEach((key) => {
         formData.append(key, productForm[key]);
      });
      if (image) {
         formData.append("image", image);
      }

      try {
         await axios.post(
            "http://localhost:5000/api/marketplacelistings",
            formData,
            {
               headers: { "Content-Type": "multipart/form-data" },
            }
         );
         alert("Product added successfully!");
         navigate("/my-account");
      } catch (error) {
         console.error("Error adding product:", error);
         alert("Failed to add product. Please try again.");
      }
   };

   return (
      <div className="add-product-page">
         <h2>Add a Product</h2>
         <form className="product-form" onSubmit={handleAddProduct}>
            <label>
               Title:
               <input
                  type="text"
                  name="title"
                  value={productForm.title}
                  onChange={handleFormChange}
                  required
               />
            </label>
            <label>
               Description:
               <textarea
                  name="description"
                  value={productForm.description}
                  onChange={handleFormChange}
                  required
               />
            </label>
            <label>
               Price:
               <input
                  type="number"
                  name="price"
                  value={productForm.price}
                  onChange={handleFormChange}
                  required
               />
            </label>
            <label>
               Category:
               <input
                  type="text"
                  name="category"
                  value={productForm.category}
                  onChange={handleFormChange}
                  required
               />
            </label>
            <label>
               Location:
               <input
                  type="text"
                  name="location"
                  value={productForm.location}
                  onChange={handleFormChange}
                  required
               />
            </label>
            <label>
               Image:
               <input type="file" onChange={handleImageChange} />
            </label>
            <button type="submit">Submit Product</button>
            <button type="button" onClick={() => navigate("/my-account")}>
               Cancel
            </button>
         </form>
      </div>
   );
};

export default AddProduct;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "@clerk/clerk-react";
// import axios from "axios";
// import "./AddProduct.css";

// const AddProduct = () => {
//    const { user } = useUser();
//    const navigate = useNavigate();

//    const [productForm, setProductForm] = useState({
//       title: "",
//       description: "",
//       price: "",
//       category: "",
//       location: "",
//       author: "",
//    });

//    const handleFormChange = (e) => {
//       const { name, value } = e.target;
//       setProductForm((prev) => ({ ...prev, [name]: value }));
//    };

//    const handleAddProduct = async (e) => {
//       e.preventDefault();
//       try {
//          await axios.post("http://localhost:5000/api/marketplacelistings", {
//             ...productForm,
//             createdAt: new Date().toISOString(),
//          });
//          alert("Product added successfully!");
//          navigate("/my-account");
//       } catch (error) {
//          console.error("Error adding product:", error);
//          alert("Failed to add product. Please try again.");
//       }
//    };

//    return (
//       <div className="add-product-page">
//          <h2>Add a Product</h2>
//          <form className="product-form" onSubmit={handleAddProduct}>
//             <label>
//                Title:
//                <input
//                   type="text"
//                   name="title"
//                   value={productForm.title}
//                   onChange={handleFormChange}
//                   required
//                />
//             </label>
//             <label>
//                Description:
//                <textarea
//                   name="description"
//                   value={productForm.description}
//                   onChange={handleFormChange}
//                   required
//                />
//             </label>
//             <label>
//                Price:
//                <input
//                   type="number"
//                   name="price"
//                   value={productForm.price}
//                   onChange={handleFormChange}
//                   required
//                />
//             </label>
//             <label>
//                Category:
//                <input
//                   type="text"
//                   name="category"
//                   value={productForm.category}
//                   onChange={handleFormChange}
//                   required
//                />
//             </label>
//             <label>
//                Location:
//                <input
//                   type="text"
//                   name="location"
//                   value={productForm.location}
//                   onChange={handleFormChange}
//                   required
//                />
//             </label>
//             <label>
//                Author
//                <input
//                   type="text"
//                   name="author"
//                   value={user?.firstName}
//                   onChange={handleFormChange}
//                   required
//                />
//             </label>
//             <button type="submit">Submit Product</button>
//             <button type="button" onClick={() => navigate("/my-account")}>
//                Cancel
//             </button>
//          </form>
//       </div>
//    );
// };

// export default AddProduct;
