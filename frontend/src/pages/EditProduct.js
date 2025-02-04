// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const EditProduct = () => {
//    const { id } = useParams(); // Get product ID from URL
//    const navigate = useNavigate();
//    const [product, setProduct] = useState(null);
//    const [loading, setLoading] = useState(true);
//    const [formData, setFormData] = useState({
//       title: "",
//       description: "",
//       price: "",
//       category: "",
//       location: "",
//    });

//    useEffect(() => {
//       // Fetch the product to be edited
//       const fetchProduct = async () => {
//          try {
//             const response = await fetch(
//                `http://localhost:5000/api/marketplacelistings/${id}`
//             );
//             if (!response.ok) throw new Error("Failed to fetch product");
//             const data = await response.json();
//             setProduct(data);
//             setFormData({
//                title: data.title,
//                description: data.description,
//                price: data.price,
//                category: data.category,
//                location: data.location,
//             });
//          } catch (error) {
//             console.error("Error fetching product:", error);
//             Swal.fire("Error", "Failed to fetch product details.", "error");
//          } finally {
//             setLoading(false);
//          }
//       };

//       fetchProduct();
//    }, [id]);

//    const handleInputChange = (e) => {
//       const { name, value } = e.target;
//       setFormData({ ...formData, [name]: value });
//    };

//    const handleEditDone = () => {
//       navigate("/my-account");
//       //   navigate("/my-account"{ state: { activeTab: 'myProducts' } });
//    };

//    const handleUpdate = async (e) => {
//       e.preventDefault();
//       try {
//          const response = await fetch(
//             `http://localhost:5000/api/marketplacelistings/${id}`,
//             {
//                method: "PUT",
//                headers: { "Content-Type": "application/json" },
//                body: JSON.stringify(formData),
//             }
//          );

//          if (!response.ok) {
//             throw new Error("Failed to update product");
//          }

//          Swal.fire("Success", "Product updated successfully.", "success").then(
//             () =>
//                //  navigate("/my-account", { state: { activeTab: "myProducts" } })
//                navigate("/my-account")
//          );
//       } catch (error) {
//          console.error("Error updating product:", error);
//          Swal.fire(
//             "Error",
//             "Failed to update product. Please try again.",
//             "error"
//          );
//       }
//    };

//    if (loading) return <p>Loading...</p>;

//    return (
//       <div className="edit-product-page">
//          <h2>Edit Product</h2>
//          <form onSubmit={handleUpdate}>
//             <div>
//                <label>Title:</label>
//                <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleInputChange}
//                   required
//                />
//             </div>
//             <div>
//                <label>Description:</label>
//                <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   required
//                />
//             </div>
//             <div>
//                <label>Price (LKR):</label>
//                <input
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleInputChange}
//                   required
//                />
//             </div>
//             <div>
//                <label>
//                   Image:
//                   <input type="file" onChange={handleImageUpdate} />
//                </label>
//             </div>
//             <div>
//                <label>Category:</label>
//                <input
//                   type="text"
//                   name="category"
//                   value={formData.category}
//                   onChange={handleInputChange}
//                   required
//                />
//             </div>
//             <div>
//                <label>Location:</label>
//                <input
//                   type="text"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleInputChange}
//                   required
//                />
//             </div>
//             <button type="submit" onClick={handleEditDone}>
//                Update Product
//             </button>
//             <button type="button" onClick={handleEditDone}>
//                Cancel
//             </button>
//          </form>
//       </div>
//    );
// };

// export default EditProduct;

// image changes but no preview
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const EditProduct = () => {
//    const { id } = useParams(); // Get product ID from URL
//    const navigate = useNavigate();
//    const [product, setProduct] = useState(null);
//    const [loading, setLoading] = useState(true);
//    const [formData, setFormData] = useState({
//       title: "",
//       description: "",
//       price: "",
//       category: "",
//       location: "",
//    });
//    const [image, setImage] = useState(null);

//    useEffect(() => {
//       // Fetch the product to be edited
//       const fetchProduct = async () => {
//          try {
//             const response = await fetch(
//                `http://localhost:5000/api/marketplacelistings/${id}`
//             );
//             if (!response.ok) throw new Error("Failed to fetch product");
//             const data = await response.json();
//             setProduct(data);
//             setFormData({
//                title: data.title,
//                description: data.description,
//                price: data.price,
//                category: data.category,
//                location: data.location,
//             });
//          } catch (error) {
//             console.error("Error fetching product:", error);
//             Swal.fire("Error", "Failed to fetch product details.", "error");
//          } finally {
//             setLoading(false);
//          }
//       };

//       fetchProduct();
//    }, [id]);

//    const handleInputChange = (e) => {
//       const { name, value } = e.target;
//       setFormData({ ...formData, [name]: value });
//    };

//    const handleImageChange = (e) => {
//       setImage(e.target.files[0]);
//    };

//    const handleUpdate = async (e) => {
//       e.preventDefault();
//       const updatedData = new FormData();

//       Object.keys(formData).forEach((key) => {
//          updatedData.append(key, formData[key]);
//       });
//       if (image) {
//          updatedData.append("image", image);
//       }

//       try {
//          const response = await fetch(
//             `http://localhost:5000/api/marketplacelistings/${id}`,
//             {
//                method: "PUT",
//                body: updatedData,
//             }
//          );

//          if (!response.ok) {
//             throw new Error("Failed to update product");
//          }

//          Swal.fire("Success", "Product updated successfully.", "success").then(
//             () => navigate("/my-account")
//          );
//       } catch (error) {
//          console.error("Error updating product:", error);
//          Swal.fire(
//             "Error",
//             "Failed to update product. Please try again.",
//             "error"
//          );
//       }
//    };

//    if (loading) return <p>Loading...</p>;

//    return (
//       <div className="edit-product-page">
//          <h2>Edit Product</h2>
//          <form onSubmit={handleUpdate}>
//             <div>
//                <label>Title:</label>
//                <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleInputChange}
//                   required
//                />
//             </div>
//             <div>
//                <label>Description:</label>
//                <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   required
//                />
//             </div>
//             <div>
//                <label>Price (LKR):</label>
//                <input
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleInputChange}
//                   required
//                />
//             </div>
//             <div>
//                <label>Image:</label>
//                <input type="file" onChange={handleImageChange} />
//                {product.image && (
//                   <div>
//                      <p>Current Image:</p>
//                      <img
//                         src={`http://localhost:5000${product.image}`}
//                         alt="Current Product"
//                         style={{ width: "100px" }}
//                      />
//                   </div>
//                )}
//             </div>
//             <div>
//                <label>Category:</label>
//                <input
//                   type="text"
//                   name="category"
//                   value={formData.category}
//                   onChange={handleInputChange}
//                   required
//                />
//             </div>
//             <div>
//                <label>Location:</label>
//                <input
//                   type="text"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleInputChange}
//                   required
//                />
//             </div>
//             <button type="submit">Update Product</button>
//             <button type="button" onClick={() => navigate("/my-account")}>
//                Cancel
//             </button>
//          </form>
//       </div>
//    );
// };

// export default EditProduct;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./EditProduct.css";

const EditProduct = () => {
   const { id } = useParams(); // Get product ID from URL
   const navigate = useNavigate();
   const [product, setProduct] = useState(null);
   const [loading, setLoading] = useState(true);
   const [formData, setFormData] = useState({
      title: "",
      description: "",
      price: "",
      category: "",
      location: "",
   });
   const [image, setImage] = useState(null);

   useEffect(() => {
      // Fetch the product to be edited
      const fetchProduct = async () => {
         try {
            const response = await fetch(
               `http://localhost:5000/api/marketplacelistings/${id}`
            );
            if (!response.ok) throw new Error("Failed to fetch product");
            const data = await response.json();
            setProduct(data);
            setFormData({
               title: data.title,
               description: data.description,
               price: data.price,
               category: data.category,
               location: data.location,
            });
         } catch (error) {
            console.error("Error fetching product:", error);
            Swal.fire("Error", "Failed to fetch product details.", "error");
         } finally {
            setLoading(false);
         }
      };

      fetchProduct();
   }, [id]);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   const handleImageChange = (e) => {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
   };

   const handleRemoveImage = () => {
      setProduct((prev) => ({ ...prev, image: null }));
      setImage(null); // Also remove any newly selected image
   };

   const handleUpdate = async (e) => {
      e.preventDefault();
      const updatedData = new FormData();

      Object.keys(formData).forEach((key) => {
         updatedData.append(key, formData[key]);
      });
      if (image) {
         updatedData.append("image", image);
      }

      try {
         const response = await fetch(
            `http://localhost:5000/api/marketplacelistings/${id}`,
            {
               method: "PUT",
               body: updatedData,
            }
         );

         if (!response.ok) {
            throw new Error("Failed to update product");
         }

         Swal.fire("Success", "Product updated successfully.", "success").then(
            () => navigate("/my-account")
         );
      } catch (error) {
         console.error("Error updating product:", error);
         Swal.fire(
            "Error",
            "Failed to update product. Please try again.",
            "error"
         );
      }
   };

   if (loading) return <p>Loading...</p>;

   return (
      <div className="edit-product-page">
         <h2>Edit Product</h2>
         <form onSubmit={handleUpdate}>
            <div>
               <label>Title:</label>
               <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
               />
            </div>
            <div>
               <label>Description:</label>
               <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
               />
            </div>
            <div>
               <label>Price (LKR):</label>
               <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
               />
            </div>
            <div>
               <label>Image:</label>
               <input type="file" onChange={handleImageChange} />
               <div>
                  {image ? (
                     <div>
                        <p>New Image Preview:</p>
                        <img
                           src={URL.createObjectURL(image)}
                           alt="New Product Preview"
                           style={{ width: "100px" }}
                        />
                     </div>
                  ) : (
                     product.image && (
                        // <div>
                        //    <p>Current Image:</p>
                        //    <img
                        //       src={`http://localhost:5000${product.image}`}
                        //       alt="Current Product"
                        //       style={{ width: "100px" }}
                        //    />
                        //    <button
                        //       type="button"
                        //       className="remove-image-but"
                        //       onClick={handleRemoveImage}
                        //    >
                        //       X
                        //    </button>
                        // </div>
                        <div className="current-image-container">
                           <p>Current Image:</p>
                           <div className="image-wrapper">
                              <img
                                 src={`http://localhost:5000${product.image}`}
                                 alt="Current Product"
                                 style={{ width: "100px" }}
                              />
                              <button
                                 type="button"
                                 className="remove-image-but"
                                 onClick={handleRemoveImage}
                              >
                                 X
                              </button>
                           </div>
                        </div>
                     )
                  )}
               </div>
            </div>
            <div>
               <label>Category:</label>
               <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
               />
            </div>
            <div>
               <label>Location:</label>
               <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
               />
            </div>
            <button type="submit">Update Product</button>
            <button type="button" onClick={() => navigate("/my-account")}>
               Cancel
            </button>
         </form>
      </div>
   );
};

export default EditProduct;
