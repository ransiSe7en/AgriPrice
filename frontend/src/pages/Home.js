import "./Home.css";
import React from "react"; // Importing useState and useEffect

const Home = () => {
   // const [message, setMessage] = useState("");

   // useEffect(() => {
   //    getTestMessage().then(setMessage);
   // }, []);

   // const getTestMessage = async () => {
   //    // Simulating an API call or returning a message
   //    return "This is a test message!";
   // };

   return (
      <div className="home">
         {/* Hero Section */}
         <section className="hero">
            <h1 className="heroHeading">
               Empowering Farmers, Connecting Markets
            </h1>
            <p className="heroText">
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
      </div>
   );
};

export default Home;
