import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";

function App() {
   return (
      <Router>
         <div>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/marketplace" element={<Marketplace />} />
            </Routes>
         </div>
      </Router>
   );
}

export default App;
