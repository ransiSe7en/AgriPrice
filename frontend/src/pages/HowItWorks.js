import React from "react";
import "./HowItWorks.css";

const HowItWorks = () => {
   return (
      <div className="how-it-works">
         <h1>How AgriPrice Insight Works</h1>

         <section className="feature">
            <h2>1. Real-Time Crop Pricing</h2>
            <p>
               The app provides real-time pricing information for various crops,
               collected from urban markets like Colombo. Farmers can instantly
               access updated prices for their produce, helping them make
               informed decisions when selling their crops.
            </p>
            <p>
               <strong>Benefit:</strong> Say goodbye to uncertainty! Farmers can
               avoid the exploitation of middlemen by knowing fair market
               prices.
            </p>
         </section>

         <section className="feature">
            <h2>2. Shortage Alerts</h2>
            <p>
               The app sends alerts to farmers when there is a shortage of
               specific crops in urban markets. Farmers can then make strategic
               decisions to sell their surplus crops directly to markets that
               need them.
            </p>
            <p>
               <strong>Benefit:</strong> Farmers can optimize their production
               and sales to fill gaps in the market, reducing food waste and
               maximizing income.
            </p>
         </section>

         <section className="feature">
            <h2>3. Online Marketplace</h2>
            <p>
               Farmers can list their produce for sale directly on the app’s
               marketplace. They can set the price and delivery cost or arrange
               for pickup, making transactions transparent and straightforward.
               Buyers can browse available crops and place orders directly with
               the farmers.
            </p>
            <p>
               <strong>Benefit:</strong> A direct connection between farmers and
               businesses, reducing reliance on middlemen and ensuring fair
               pricing for all.
            </p>
         </section>

         <section className="feature">
            <h2>4. Chat Functionality for Negotiation</h2>
            <p>
               Farmers and buyers can use the built-in chat feature to negotiate
               prices, arrange delivery logistics, and discuss product details.
               This fosters transparency and open communication between both
               parties.
            </p>
            <p>
               <strong>Benefit:</strong> Both farmers and buyers can reach
               mutually agreeable prices and solutions, ensuring fairer
               transactions and reducing misunderstandings.
            </p>
         </section>

         <section className="feature">
            <h2>5. Government Support Information</h2>
            <p>
               The app keeps farmers informed about government schemes,
               subsidies, and support programs that are available to help them
               grow their business. This section provides updates on policies
               that affect the agricultural sector and guides farmers on how to
               access financial aid.
            </p>
            <p>
               <strong>Benefit:</strong> Empower farmers with the resources they
               need to take full advantage of government support programs,
               improving their financial stability.
            </p>
         </section>

         <section className="feature">
            <h2>6. Community Forum</h2>
            <p>
               Farmers can join the community forum to connect with others,
               share tips, ask questions, and discuss agricultural practices.
               The forum encourages collaboration, peer learning, and mutual
               support among farmers.
            </p>
            <p>
               <strong>Benefit:</strong> Farmers can learn from each other’s
               experiences, solve common challenges together, and grow their
               knowledge in the agricultural sector.
            </p>
         </section>

         <h2>How to Get Started</h2>
         <ol>
            <li>
               <strong>Download the app:</strong> Available on Android and iOS.
            </li>
            <li>
               <strong>Create an account:</strong> Sign up to start using the
               features like pricing info, shortage alerts, and the marketplace.
            </li>
            <li>
               <strong>Post your crops for sale:</strong> Add your produce and
               set your prices in the marketplace.
            </li>
            <li>
               <strong>Stay informed:</strong> Receive real-time updates on crop
               prices, shortages, and government schemes.
            </li>
            <li>
               <strong>Connect and sell:</strong> Use the chat feature to
               negotiate and arrange deliveries.
            </li>
         </ol>
      </div>
   );
};

export default HowItWorks;
