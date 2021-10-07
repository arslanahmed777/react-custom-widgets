import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUserErrors } from "../redux/User/User.Selectors";

const Signin = React.lazy(() => import("../components/Signin/Signin"));
const Signup = React.lazy(() => import("../components/Signup/Signup"));
const ForgotPassword = React.lazy(() =>
  import("../components/ForgotPassword/ForgotPassword")
);

const SigninSignupPage = (props) => {
  const error = useSelector(selectUserErrors);
  const [selectedComponent, setselectedComponent] = useState("Signin");
  return (
    <div className="container-fluid border" style={{ height: "90vh" }}>
      <div className="h-100 d-flex flex-column justify-content-center">
        {selectedComponent === "Signin" ? (
          <Signin setselectedComponent={setselectedComponent} />
        ) : selectedComponent === "Signup" ? (
          <Signup setselectedComponent={setselectedComponent} />
        ) : (
          <ForgotPassword setselectedComponent={setselectedComponent} />
        )}
        {error && (
          <div className="text-center fw-bold text-danger mt-3">{error}</div>
        )}
      </div>
    </div>
  );
};

export default SigninSignupPage;
