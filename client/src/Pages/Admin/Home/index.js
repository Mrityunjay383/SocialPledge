import React from "react";
import "./index.css";

const AdminHome = () => {
  return (
    <div className={"rootSup"}>
      <img
        src={
          "https://res.cloudinary.com/ddb1evz5g/image/upload/v1689918515/SocialPledgeLogo_usyssj.png"
        }
        alt={"SocialPledgeLogo"}
      />

      <p className={"fiChild"}>You Should Not be Here.</p>

      <p className={"SecChild"}>
        If you are a Admin, type your userName in URL
      </p>
    </div>
  );
};

export default AdminHome;
