import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbarcss from "./Navbar.module.css";
import { SidebarData } from "./SidebarData";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
const Navbar = () => {
  const [sidebar, setSideBar] = useState(false);
  const showSidebar = () => setSideBar(!sidebar);
  return (
    <>
      <div className={Navbarcss.navbar}>
        <Link onClick={showSidebar} to="#" className={Navbarcss.menu_bars}>
          <FaBars size={32} color={"white"} />
        </Link>
      </div>
      <nav
        className={`${Navbarcss.navmenu} ${sidebar ? Navbarcss.active : ""} `}
      >
        <ul className={Navbarcss.nav_list}>
          <li className={Navbarcss.nav_toggler}>
            <AiOutlineClose onClick={showSidebar} size={32} />
          </li>
          {SidebarData.map((item, i) => {
            return (
              <li key={i} className={Navbarcss.nav_text}>
                <Link onClick={showSidebar} to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
