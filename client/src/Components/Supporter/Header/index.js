import React from "react";
import "./index.css";
import { NavLink } from "react-router-dom";

const SupHeader = ({ supporterData }) => {
  const [click, setClick] = React.useState(false);

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

  return (
    <div>
      <div className={click ? "main-container" : ""} onClick={() => Close()} />
      <nav className="navbar" onClick={(e) => e.stopPropagation()}>
        <div className="nav-container">
          <NavLink to={`/${supporterData.userName}`} className="nav-logo">
            <img src={supporterData.logo} alt={"SupporterLogo"} />
          </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to={`/${supporterData.userName}`}
                activeclassname="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to={`/${supporterData.userName}/reports`}
                activeclassname="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Reports
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to={`/${supporterData.userName}/profile`}
                activeclassname="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Profile
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

export default SupHeader;
