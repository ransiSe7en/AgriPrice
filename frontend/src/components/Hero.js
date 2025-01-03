import React from "react";
import "./Hero.css";

const Hero = ({ heading, text, buttonText }) => {
   return (
      <section className="hero">
         <h1 className="heroHeading">{heading}</h1>
         <p className="heroText">{text}</p>
         <button className="cta-btn">{buttonText}</button>
      </section>
   );
};

export default Hero;
