import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
   return (
      <div className="home">
         {/* Header Section */}
         <section className="header">
            <div className="logo">
               <img
                  src="https://static.vecteezy.com/system/resources/previews/012/319/431/original/farm-logo-livestock-logo-icon-design-template-vector.jpg"
                  alt="Farm Logo"
               />
            </div>
            <nav>
               <ul>
                  <li>
                     <Link to="/">Home</Link>
                  </li>
                  <li>
                     <Link to="/marketplace">Marketplace</Link>
                  </li>
                  <li>
                     <Link to="/sign-up">Shortage Alerts</Link>
                  </li>
                  <li>
                     <Link to="/marketplace">Todays Pricing</Link>
                  </li>
                  <li>
                     <Link to="/sign-up">My Orders</Link>
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
         </section>

         {/* Hero Section */}
         <section className="hero">
            <h1>Empowering Farmers, Connecting Markets</h1>
            <p>
               Real-time crop pricing, direct communication with urban markets,
               and more to help farmers get the best deals.
            </p>
            <button className="cta-btn">Get Started</button>
         </section>

         {/* About the Platform */}
         <section className="about">
            <h2>About AgriPrice Insight</h2>
            <p>
               AgriPrice Insight helps farmers make informed decisions about
               pricing, connect directly with urban markets, and avoid middlemen
               to get fair prices.
            </p>
         </section>

         {/* Features Section */}
         <section className="features">
            <h2>How It Works</h2>
            <div className="feature-item">
               <h3>1. Sign Up</h3>
               <p>Register as a farmer or buyer.</p>
            </div>
            <div className="feature-item">
               <h3>2. Post Your Produce</h3>
               <p>List your crops for sale, with pricing information.</p>
            </div>
            <div className="feature-item">
               <h3>3. Get Pricing Insights</h3>
               <p>Access real-time pricing data for your crops.</p>
            </div>
            <div className="feature-item">
               <h3>4. Negotiate & Sell</h3>
               <p>Direct communication with buyers to set fair prices.</p>
            </div>
         </section>

         {/* Footer */}
         <footer>
            <p>&copy; 2024 AgriPrice Insight. All Rights Reserved.</p>
         </footer>
      </div>
   );
};

export default Home;
