import React from "react";

const Signin = (props) => {
  const handleChangeComponent = () => {
    props.setselectedComponent("Signup");
  };
  return (
    <>
      <form className="h-100">
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
                  className="form-control"
                  placeholder="Email address"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  id="inputPassword"
                  className="form-control"
                  placeholder="Password"
                  required
                />
              </div>

              <button
                className="btn btn-lg btn-primary btn-block"
                type="submit"
              >
                Sign in
              </button>
              <div className="mt-4">
                <div className="d-flex justify-content-center links">
                  Don't have an account?
                  <span
                    onClick={handleChangeComponent}
                    className="ms-2 fw-bold"
                  >
                    Sign Up
                  </span>
                </div>
                <div className="d-flex justify-content-center links">
                  <span className="fw-bold">Forgot your password?</span>
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
