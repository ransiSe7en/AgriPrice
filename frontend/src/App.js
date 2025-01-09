// frontend/src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Header from "./components/Header";
import DailyPriceReport from "./pages/DailyPriceReport";
import Shortages from "./pages/Shortages";
import SignUpPage from "./pages/SignUp"; // Import SignUpPage
import SignInPage from "./pages/SignIn"; // Import SignUpPage
import MyAccount from "./pages/MyAccount";
import AddProduct from "./pages/AddProduct";

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
               <Route path="/shortages" element={<Shortages />} />
               <Route path="/signup" element={<SignUpPage />} />
               <Route path="/signin" element={<SignInPage />} />
               <Route path="/my-account" element={<MyAccount />} />
               <Route path="/add" element={<AddProduct />} />
            </Routes>
         </div>
      </Router>
   );
}

export default App;
