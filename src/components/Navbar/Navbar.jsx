import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbarcss from "./Navbar.module.css";
import { SidebarData } from "./SidebarData";
import { FaBars, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../redux/User/User.Selectors";
import { signOutStart } from "../../redux/User/UserActions";


const Navbar = () => {
  const [sidebar, setSideBar] = useState(false);
  const currentuser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const showSidebar = () => setSideBar(!sidebar);

  const handleSignout = () => {
    dispatch(signOutStart());
  }

  return (
    <>
      <div className={`container-fluid ${Navbarcss.navbar_container}`}>
        <div className="row">
          <div className="col-2  d-flex align-items-center  ">
            <div onClick={showSidebar} className={`cpointer py-2`}>
              <FaBars size={32} color={"white"} />
            </div>
          </div>
          <div className="col d-flex justify-content-end align-items-center text-white">
            {currentuser && (
              <>
                <div className="mx-3">
                  <div className="dropdown">
                    <div id="userdropdown" data-bs-toggle="dropdown" aria-expanded="false">
                      <img className={`rounded-circle ${Navbarcss.navbar_userlogo}`} alt="logo" src="http://placekitten.com/100/200" />
                      <span className="ps-2">{currentuser.user.name}</span>
                    </div>
                    <ul className="dropdown-menu" style={{ background: "#060b26", color: "white" }} aria-labelledby="userdropdown">
                      <li> </li>
                      <li> <Link to="/updateprofile"> Profile <FaUserCircle size={32} color={"white"} /></Link> </li>
                      <li onClick={handleSignout} className="cpointer" > Logout <FaSignOutAlt size={32} color={"white"} /> </li>
                    </ul>
                  </div>
                </div>

              </>

            )}


          </div>
        </div>
        <nav className={`${Navbarcss.navmenu} ${sidebar ? Navbarcss.active : ""} `}>
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

      </div>
    </>
  );
};
export default Navbar;
