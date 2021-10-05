import React from "react";

const Signup = (props) => {
  const handleChangeComponent = () => {
    props.setselectedComponent("Signin");
  };
  return (
    <>
      <form className="h-100">
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
                    placeholder="username"
                    id="username"
                  />
                  <label htmlFor="username">Username</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control "
                    placeholder="Email"
                    id="email"
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
                    id="password"
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="col-12">
                <div className="d-grid gap-2">
                  <button className="btn btn-primary" type="submit">
                    Sign up
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
