import React, { useState } from "react";
import Signin from "../components/Signin/Signin";
import Signup from "../components/Signup/Signup";

const SigninSignupPage = () => {
  const [selectedComponent, setselectedComponent] = useState("Signin");
  return (
    <div className="container-fluid border" style={{ height: "90vh" }}>
      {selectedComponent == "Signin" ? (
        <Signin setselectedComponent={setselectedComponent} />
      ) : (
        <Signup />
      )}
    </div>
  );
};

export default SigninSignupPage;
