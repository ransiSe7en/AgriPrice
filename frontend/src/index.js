// frontend/src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ClerkProvider } from "@clerk/clerk-react";

// const clerkPublishableKey = process.env.VITE_CLERK_PUBLISHABLE_KEY;
const clerkPublishableKey =
   "pk_test_YnJpZWYtdGl0bW91c2UtNTguY2xlcmsuYWNjb3VudHMuZGV2JA";
console.log("Clerk Publishable Key:", clerkPublishableKey);

if (!clerkPublishableKey) {
   throw new Error(
      "Missing Clerk publishable key. Check your environment variables."
   );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <ClerkProvider publishableKey={clerkPublishableKey}>
         <App />
      </ClerkProvider>
   </React.StrictMode>
);

reportWebVitals();
