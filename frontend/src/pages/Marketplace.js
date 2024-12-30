import React, { useEffect, useState } from "react";
import { getCrops } from "../services/api";

const Marketplace = () => {
   const [crops, setCrops] = useState([]);

   useEffect(() => {
      const fetchCrops = async () => {
         const cropData = await getCrops();
         setCrops(cropData);
      };
      fetchCrops();
   }, []);

   return (
      <div>
         <h1>Marketplace</h1>
         <ul>
            {crops.map((crop) => (
               <li key={crop._id}>
                  {crop.name} - ${crop.price} per unit
               </li>
            ))}
         </ul>
      </div>
   );
};

export default Marketplace;
