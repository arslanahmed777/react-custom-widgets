import React from "react";

const ForgotPassword = (props) => {
  const handleChangeComponent = () => {
    props.setselectedComponent("Signin");
  };
  return (
    <form>
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
          </div>
          <div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control "
                placeholder="Enter Email"
                id="email"
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-primary" type="submit">
              Send Email
            </button>
          </div>
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
    </form>
  );
};

export default ForgotPassword;
