import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/Logo.svg";
import "./Header.css";

const Header = () => {
   return (
      <header className="header">
         <div className="logo">
            <img src={Logo} alt="Farm Logo" />
            <h2>AGRI-PRICE</h2>
         </div>
         <nav>
            <ul>
               <li>
                  <Link to="/marketplace">Marketplace</Link>
               </li>
               <li>
                  <Link to="/daily-price-report">Today's Rates</Link>
               </li>
               <li>
                  <Link to="/sign-up">Shortages</Link>
               </li>
               <li>
                  <Link to="/sign-up">My Order Centre</Link>
               </li>
               <li>
                  <Link to="/marketplace">Weather Forecasts</Link>
               </li>
               <li>
                  <Link to="/how-it-works">How It Works</Link>
               </li>
               <li>
                  <Link to="/signup">Sign Up</Link>
               </li>
            </ul>
         </nav>
      </header>
   );
};

export default Header;
