import React from "react";
import { NavLink } from "react-router-dom";

import "./index.css";
import { Auth } from "../../../service";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const [click, setClick] = React.useState(false);

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

  const logout = async () => {
    const res = await Auth.logout();

    if (res.data.success) {
      setIsLoggedIn(false);
    }
  };

  return (
    <div>
      <div className={click ? "main-container" : ""} onClick={() => Close()} />
      <nav className="navbar" onClick={(e) => e.stopPropagation()}>
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <img
              src={
                "https://res.cloudinary.com/ddb1evz5g/image/upload/v1689918515/SocialPledgeLogo_usyssj.png"
              }
              alt={"SocialPledgeLogo"}
            />
          </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/pledges"
                activeclassname="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Pledges
              </NavLink>
            </li>

            {/*<li className="nav-item">*/}
            {/*  <NavLink*/}
            {/*    exact*/}
            {/*    to="/contact"*/}
            {/*    activeClassName="active"*/}
            {/*    className="nav-links"*/}
            {/*    onClick={click ? handleClick : null}*/}
            {/*  >*/}
            {/*    Contact Us*/}
            {/*  </NavLink>*/}
            {/*</li>*/}
            {!isLoggedIn ? (
              <li className="nav-item">
                <NavLink
                  exact
                  to="/auth"
                  activeclassname="active"
                  className="nav-links"
                  onClick={click ? handleClick : null}
                >
                  Login / Register
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/profile"
                    activeclassname="active"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    // to="/"
                    activeclassname="active"
                    className="nav-links"
                    onClick={logout}
                  >
                    LogOut
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
