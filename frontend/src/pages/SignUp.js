// frontend/src/pages/SignUp.js
import React from "react";
import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
   return (
      <div>
         <SignUp afterSignUpUrl="/my-account" />;
      </div>
   );
};

export default SignUpPage;
