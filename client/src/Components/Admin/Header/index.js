import React from "react";
import "./index.css";
import { NavLink } from "react-router-dom";

const AdminHeader = ({ adminData }) => {
  const [click, setClick] = React.useState(false);

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

  return (
    <div>
      <div className={click ? "main-container" : ""} onClick={() => Close()} />
      <nav className="navbar" onClick={(e) => e.stopPropagation()}>
        <div className="nav-container">
          <NavLink to={`/${adminData.userName}`} className="nav-logo">
            <img
              src={
                "https://res.cloudinary.com/ddb1evz5g/image/upload/v1689918515/SocialPledgeLogo_usyssj.png"
              }
              alt={"SPLogo"}
            />
          </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to={`/${adminData.userName}`}
                activeclassname="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Add Graphic
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to={`/${adminData.userName}/add_supporter`}
                activeclassname="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Add Supporter
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminHeader;
