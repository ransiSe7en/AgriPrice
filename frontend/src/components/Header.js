// import React from "react";
// import { Link } from "react-router-dom";
// import Logo from "../assets/images/Logo.svg";
// import "./Header.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons";

// const Header = () => {
//    return (
//       <header className="header">
//          <div className="logo">
//             <img src={Logo} alt="Farm Logo" />
//             <Link to="/">
//                <h2>AGRI-PRICE</h2>
//             </Link>
//          </div>
//          <nav>
//             <ul>
//                <li>
//                   <Link to="/marketplace">Marketplace</Link>
//                </li>
//                <li>
//                   <Link to="/daily-price-report">Today's Rates</Link>
//                </li>
//                <li>
//                   <Link to="/shortages">Shortages</Link>
//                </li>
//                <li>
//                   <Link to="/sign-up">My Order Centre</Link>
//                </li>
//                <li>
//                   <Link to="/marketplace">Weather Forecasts</Link>
//                </li>
//                <li>
//                   <Link to="/signup">How it works</Link>
//                </li>
//                <li>
//                   <Link to="/signin">
//                      <FontAwesomeIcon icon={faUser} size="lg" />
//                   </Link>
//                </li>
//             </ul>
//          </nav>
//       </header>
//    );
// };

// export default Header;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Logo from "../assets/images/Logo.svg";
// import "./Header.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
// import { useUser, SignOutButton } from "@clerk/clerk-react";

// const Header = () => {
//    const { isSignedIn, user } = useUser(); // Get user authentication status and details
//    const [showProfileMenu, setShowProfileMenu] = useState(false);

//    const handleProfileClick = () => {
//       setShowProfileMenu((prev) => !prev); // Toggle the profile menu
//    };

//    return (
//       <header className="header">
//          <div className="logo">
//             <img src={Logo} alt="Farm Logo" />
//             <Link to="/">
//                <h2>AGRI-PRICE</h2>
//             </Link>
//          </div>
//          <nav>
//             <ul>
//                <li>
//                   <Link to="/marketplace">Marketplace</Link>
//                </li>
//                <li>
//                   <Link to="/daily-price-report">Today's Rates</Link>
//                </li>
//                <li>
//                   <Link to="/shortages">Shortages</Link>
//                </li>
//                <li>
//                   <Link to="/marketplace">Weather Forecasts</Link>
//                </li>
//                <li>
//                   <Link to="/how-it=works">How it works</Link>
//                </li>

//                {/* Conditional Rendering */}
//                {isSignedIn ? (
//                   <li className="profile-menu-container">
//                      <div onClick={handleProfileClick} className="profile-icon">
//                         Welcome {user.firstName}
//                         <FontAwesomeIcon icon={faUser} size="lg" />
//                      </div>
//                      {showProfileMenu && (
//                         <div className="profile-menu">
//                            <p className="user-name profile-menu-link">
//                               {user?.fullName || "User"}
//                            </p>
//                            <Link to="/my-account" className="profile-menu-link">
//                               Account Details
//                            </Link>
//                            <Link to="/my-orders" className="profile-menu-link">
//                               My Orders
//                            </Link>
//                            <div className="profile-menu-link logout">
//                               <SignOutButton>
//                                  <button>
//                                     <FontAwesomeIcon icon={faSignOutAlt} />{" "}
//                                     Logout
//                                  </button>
//                               </SignOutButton>
//                            </div>
//                         </div>
//                      )}
//                   </li>
//                ) : (
//                   <>
//                      <li>
//                         <Link to="/signup" className="rounded-btn">
//                            Join Now
//                         </Link>
//                      </li>
//                      <li>
//                         <Link to="/signin" className="rounded-btn">
//                            Sign In
//                         </Link>
//                      </li>
//                   </>
//                )}
//             </ul>
//          </nav>
//       </header>
//    );
// };

// export default Header;

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/Logo.svg";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faUser,
   faSignOutAlt,
   faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useUser, SignOutButton } from "@clerk/clerk-react";

const Header = () => {
   const { isSignedIn, user } = useUser(); // Get user authentication status and details
   const [showProfileMenu, setShowProfileMenu] = useState(false);

   const profileMenuRef = useRef(null); // Reference to the profile menu
   const profileIconRef = useRef(null); // Reference to the profile icon

   // Function to toggle the profile menu
   const handleProfileClick = () => {
      setShowProfileMenu((prev) => !prev); // Toggle the profile menu
   };

   // Close the profile menu if click is outside
   const handleClickOutside = (event) => {
      if (
         profileMenuRef.current &&
         !profileMenuRef.current.contains(event.target) &&
         !profileIconRef.current.contains(event.target)
      ) {
         setShowProfileMenu(false);
      }
   };

   useEffect(() => {
      document.addEventListener("click", handleClickOutside); // Add event listener for clicks outside
      return () => {
         document.removeEventListener("click", handleClickOutside); // Clean up event listener
      };
   }, []);

   return (
      <header className="header">
         <div className="logo">
            <img src={Logo} alt="Farm Logo" />
            <Link to="/">
               <h2>AGRI-PRICE</h2>
            </Link>
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
                  <Link to="/shortages">Shortages</Link>
               </li>
               <li>
                  <Link to="/marketplace">Weather Forecasts</Link>
               </li>
               <li>
                  <Link to="/how-it-works">How it works</Link>
               </li>

               {/* Conditional Rendering */}
               {isSignedIn ? (
                  <li className="profile-menu-container">
                     <div
                        onClick={handleProfileClick}
                        className="profile-icon"
                        ref={profileIconRef}
                     >
                        <span className="welcome-text">
                           Welcome {user.firstName}
                        </span>
                        <FontAwesomeIcon icon={faUser} size="lg" />
                     </div>

                     {showProfileMenu && (
                        <div className="profile-menu" ref={profileMenuRef}>
                           <button
                              className="close-btn"
                              onClick={() => setShowProfileMenu(false)}
                           >
                              <FontAwesomeIcon icon={faTimes} />
                           </button>
                           <p className="user-name profile-menu-link">
                              {user?.fullName || "User"}
                           </p>
                           <Link to="/my-account" className="profile-menu-link">
                              Account Details
                           </Link>
                           <Link
                              to="/my-account/my-products"
                              className="profile-menu-link"
                           >
                              My Products
                           </Link>
                           <div className="logout">
                              <SignOutButton>
                                 <button>
                                    <FontAwesomeIcon icon={faSignOutAlt} />{" "}
                                    Logout
                                 </button>
                              </SignOutButton>
                           </div>
                        </div>
                     )}
                  </li>
               ) : (
                  <>
                     <li>
                        <Link to="/signup" className="rounded-btn">
                           Join Now
                        </Link>
                     </li>
                     <li>
                        <Link to="/signin" className="rounded-btn">
                           Sign In
                        </Link>
                     </li>
                  </>
               )}
            </ul>
         </nav>
      </header>
   );
};

export default Header;
