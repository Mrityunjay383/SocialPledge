import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./index.css";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import CtaBtn from "../CtaBtn";
import { toast } from "react-toastify";
import { Index } from "../../../service";

const Footer = () => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const sendMail = async () => {
    if (contactData.name !== "" && contactData.email !== "") {
      toast.success("Sending Message, please wait...");
      const res = await Index.contactUs(contactData);

      if (res.status === 200) {
        toast.success(res.data);
      } else {
        toast.error(res.data);
      }
    } else {
      toast.error("Name as well as email is required");
    }
  };

  return (
    <div className="footer">
      <div className="contactUs">
        <h4>Contact Us</h4>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="user-box">
              <input
                type="text"
                onChange={(e) => {
                  setContactData((curr) => {
                    return { ...curr, name: e.target.value };
                  });
                }}
              />
              <label className={contactData.name !== "" && "upLabel"}>
                Full Name
              </label>
            </div>
            <div className="user-box">
              <input
                type="email"
                onChange={(e) => {
                  setContactData((curr) => {
                    return { ...curr, email: e.target.value };
                  });
                }}
              />
              <label className={contactData.email !== "" && "upLabel"}>
                Email
              </label>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div
              className="user-box"
              style={{
                flex: 1,
                marginRight: "20px",
                display: "flex",
                // justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <textarea
                style={{
                  width: "100%",
                }}
                onChange={(e) => {
                  setContactData((curr) => {
                    return { ...curr, message: e.target.value };
                  });
                }}
              />
              <label className={contactData.message !== "" && "upLabel"}>
                Message
              </label>
            </div>

            <CtaBtn Text={"Send"} onClick={sendMail} />
          </div>
        </div>
      </div>

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

        <div className="copy-input">
          <div className="copy-text">Copyright 2023. All Rights Reserved</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
