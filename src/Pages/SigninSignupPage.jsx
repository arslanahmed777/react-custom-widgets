import React, { useState } from "react";

const Signin = React.lazy(() => import("../components/Signin/Signin"));
const Signup = React.lazy(() => import("../components/Signup/Signup"));
const ForgotPassword = React.lazy(() =>
  import("../components/ForgotPassword/ForgotPassword")
);

const SigninSignupPage = (props) => {
  const [selectedComponent, setselectedComponent] = useState("Signin");
  return (
    <div className="container-fluid border" style={{ height: "90vh" }}>
      {selectedComponent === "Signin" ? (
        <Signin setselectedComponent={setselectedComponent} />
      ) : selectedComponent === "Signup" ? (
        <Signup setselectedComponent={setselectedComponent} />
      ) : (
        <ForgotPassword setselectedComponent={setselectedComponent} />
      )}
    </div>
  );
};

export default SigninSignupPage;
