import React from "react";
import "./index.css";

const ProfilePersonal = () => {
  return (
    <div className={"personalCon"}>
      <div className={"proRow"}>
        <div className=" profile-box">
          <input
            type="text"
            // onKeyDown={(e) => {
            //   if (e.key === "Enter") {
            //     loginSubmit();
            //   }
            // }}
            // onChange={(e) => {
            //   setLoginFormData((curr) => {
            //     return { ...curr, mobNo: e.target.value };
            //   });
            // }}
          />
          <label>Name</label>
        </div>
        <div className="profile-box">
          <input
            type="number"
            // onKeyDown={(e) => {
            //   if (e.key === "Enter") {
            //     loginSubmit();
            //   }
            // }}
            // onChange={(e) => {
            //   setLoginFormData((curr) => {
            //     return { ...curr, mobNo: e.target.value };
            //   });
            // }}
          />
          <label>Mobile Number</label>
        </div>
      </div>
      <div className={"proRow"}>
        <div className=" profile-box">
          <input
            type="email"
            // onKeyDown={(e) => {
            //   if (e.key === "Enter") {
            //     loginSubmit();
            //   }
            // }}
            // onChange={(e) => {
            //   setLoginFormData((curr) => {
            //     return { ...curr, mobNo: e.target.value };
            //   });
            // }}
          />
          <label>email</label>
        </div>
        <div className="profile-box">
          <input
            type="date"
            // onKeyDown={(e) => {
            //   if (e.key === "Enter") {
            //     loginSubmit();
            //   }
            // }}
            // onChange={(e) => {
            //   setLoginFormData((curr) => {
            //     return { ...curr, mobNo: e.target.value };
            //   });
            // }}
          />
          <label>Date of Birth</label>
        </div>
      </div>
    </div>
  );
};

export default ProfilePersonal;
