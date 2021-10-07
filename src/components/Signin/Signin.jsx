import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emailSignInStart } from "../../redux/User/UserActions";
import { selectUserLoadingState } from "../../redux/User/User.Selectors";
import ButtonLoader from "../ButtonLoader/ButtonLoader";

const Signin = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectUserLoadingState);
  const [userobj, setUserobj] = useState({ email: "", password: "" });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserobj({ ...userobj, [name]: value });
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      dispatch(emailSignInStart(userobj));
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  const handleChangeComponent = (component) => {
    props.setselectedComponent(component);
  };
  return (
    <>
      <form onSubmit={(e) => handleSignin(e)}>
        <div className="row align-items-center justify-content-center h-100">
          <div className="col-md-4 col-12  ">
            <div className="text-center">
              <img
                className="mb-4"
                src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
                alt="logo"
                width={72}
                height={72}
              />
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
              <div className="mb-3">
                <input
                  type="email"
                  id="inputEmail"
                  name="email"
                  className="form-control"
                  placeholder="Email address"
                  value={userobj.email}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  id="inputPassword"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={userobj.password}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-primary" type="submit">
                  {loading ? <ButtonLoader /> : "Sign in"}
                </button>
              </div>
              <div className="mt-4">
                <div className="d-flex justify-content-center links">
                  Don't have an account?
                  <span
                    onClick={() => handleChangeComponent("Signup")}
                    className="ms-2 fw-bold cpointer"
                  >
                    Sign Up
                  </span>
                </div>
                <div className="d-flex justify-content-center links">
                  <span
                    onClick={() => handleChangeComponent("forgotpassword")}
                    className="fw-bold cpointer"
                  >
                    Forgot your password?
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Signin;
