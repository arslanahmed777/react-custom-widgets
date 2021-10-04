import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbarcss from "./Navbar.module.css";
import { FaBars } from "react-icons/fa";
const Navbar = () => {
  const [sidebar, setSideBar] = useState(true);
  return (
    <>
      <div className={Navbarcss.navbar}>
        <Link to="/pagination" className={Navbarcss.menu_bars}>
          <FaBars />
        </Link>
      </div>
      <nav
        className={
          sidebar
            ? `${Navbarcss.navmenu} ${Navbarcss.active}`
            : Navbarcss.navmenu
        }
      ></nav>
    </>
  );
};

export default Navbar;
