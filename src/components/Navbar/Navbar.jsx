import React from "react";
import { Link } from "react-router-dom";
import Navbarcss from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={Navbarcss.navbar}>
      {" "}
      <Link to="/pagination" className={Navbarcss.menu}>
        Pagination
      </Link>
      <Link to="/" className={Navbarcss.menu}>
        Home
      </Link>
    </div>
  );
};

export default Navbar;
