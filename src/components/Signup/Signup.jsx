import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpStart } from "../../redux/User/UserActions";
import { selectUserLoadingState } from "../../redux/User/User.Selectors";
import ButtonLoader from "../ButtonLoader/ButtonLoader";

const Signup = (props) => {
  const [signupobj, setSignupobj] = useState({ name: "", email: "", password: "" })
  const dispatch = useDispatch();
  const loading = useSelector(selectUserLoadingState)


  const handleChangeComponent = () => {
    props.setselectedComponent("Signin");
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    setSignupobj({ ...signupobj, [name]: value })
  }

  const handleSignup = (e) => {
    e.preventDefault()
    dispatch(signUpStart(signupobj))
  }

  return (
    <>
      <form onSubmit={(e) => handleSignup(e)}>
        <div className="row   align-items-center justify-content-center h-100    ">
          <div className="col-md-6">
            <div className="text-center">
              <img
                className="mb-4"
                src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
                alt="logo"
                width={72}
                height={72}
              />
            </div>
            <div className="row ">
              <div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="name"
                    name="name"
                    id="name"
                    required
                    value={signupobj.name}
                    onChange={(e) => handleChange(e)}
                  />
                  <label htmlFor="name">Username</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control "
                    placeholder="Email"
                    name="email"
                    id="email"
                    required
                    value={signupobj.email}
                    onChange={(e) => handleChange(e)}
                  />
                  <label htmlFor="email">Email address</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    id="password"
                    required
                    value={signupobj.password}
                    onChange={(e) => handleChange(e)}
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="col-12">
                <div className="d-grid gap-2">
                  <button className="btn btn-primary" disabled={loading} type="submit">
                    {loading ? <ButtonLoader /> : 'Sign up'}
                  </button>
                </div>
              </div>
              <div className="col-12">
                <div className="mt-4">
                  <div className="d-flex justify-content-center   ">
                    Have already an Account?
                    <span
                      onClick={handleChangeComponent}
                      className="ms-2 fw-bold cpointer"
                    >
                      Login
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Signup;
