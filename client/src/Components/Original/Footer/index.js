import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./index.css";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWindowClose,
} from "react-icons/fa";
import CtaBtn from "../CtaBtn";
import { toast } from "react-toastify";
import { Index } from "../../../service";

import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    zIndex: "100",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    padding: "5vh 10vh 10vh",
  },
};

Modal.setAppElement("#root");

const Footer = () => {
  const navigate = useNavigate();

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const sendMail = async () => {
    if (contactData.name !== "" && contactData.email !== "") {
      setIsOpen(false);
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
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className={"contactModel"}>
          <div className={"modelHead"}>
            <h3>Contact Us</h3>
            <div onClick={() => setIsOpen(false)}>
              <FaWindowClose />
            </div>
          </div>

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
      </Modal>

      <div className="contactUs">
        <h4 style={{ cursor: "pointer" }} onClick={() => setIsOpen(true)}>
          Contact Us
        </h4>
        <h4 style={{ cursor: "pointer" }} onClick={() => navigate("/about")}>
          About
        </h4>
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
          <NavLink
            to="https://www.linkedin.com/company/socialpledge"
            className={"socialLinks"}
            target={"_blank"}
          >
            <FaLinkedin />
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
