import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Header from "./components/Header";
import DailyPriceReport from "./pages/DailyPriceReport";

function App() {
   return (
      <Router>
         <div>
            <Header />
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/marketplace" element={<Marketplace />} />
               <Route
                  path="/daily-price-report"
                  element={<DailyPriceReport />}
               />
            </Routes>
         </div>
      </Router>
   );
}

export default App;
