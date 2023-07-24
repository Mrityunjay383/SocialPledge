import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div className="logo-social">
        <NavLink exact to="/">
          <img
            src={
              "https://res.cloudinary.com/ddb1evz5g/image/upload/v1689918515/SocialPledgeLogo_usyssj.png"
            }
            alt={"SocialPledgeLogo"}
          />
        </NavLink>

        <div className="social-icon-list">
          <NavLink
            to="https://www.facebook.com/socialpledge/"
            className={"socialLinks"}
            target={"_blank"}
          >
            <FaFacebook />
          </NavLink>
          <NavLink to="/" className={"socialLinks"} target={"_blank"}>
            <FaYoutube />
          </NavLink>
          <NavLink
            to="https://twitter.com/SocialPledgeIn"
            className={"socialLinks"}
            target={"_blank"}
          >
            <FaTwitter />
          </NavLink>
          <NavLink
            to="https://www.instagram.com/socialpledge/"
            className={"socialLinks"}
            target={"_blank"}
          >
            <FaInstagram />
          </NavLink>
        </div>
      </div>

      <div className="copy-input">
        <div className="copy-text">Copyright 2023. All Rights Reserved</div>
      </div>
    </div>
  );
};

export default Footer;
