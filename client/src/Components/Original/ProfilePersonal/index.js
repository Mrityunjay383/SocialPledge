import React from "react";
import "./index.css";
import CtaBtn from "../CtaBtn";
import { ColorRing } from "react-loader-spinner";

const ProfilePersonal = ({
  fUserData,
  setFUserData,
  btnClick,
  saveNewDetails,
}) => {
  return (
    <div className={"personalCon"}>
      <div className={"proRow"}>
        <div className="delText">
          <input
            type="text"
            placeholder={"Name"}
            value={fUserData.name}
            onChange={(e) => {
              setFUserData((curr) => {
                return { ...curr, name: e.target.value };
              });
            }}
          />
        </div>
        <div className="delText">
          <input
            type="number"
            placeholder={"Mobile Number"}
            value={fUserData.mobNo}
            onChange={(e) => {
              setFUserData((curr) => {
                return { ...curr, mobNo: e.target.value };
              });
            }}
          />
        </div>
      </div>
      <div className={"proRow"}>
        <div className="delText">
          <input
            type="email"
            placeholder={"Email"}
            value={fUserData.email}
            onChange={(e) => {
              setFUserData((curr) => {
                return { ...curr, email: e.target.value };
              });
            }}
          />
        </div>
        <div className="delDate">
          <input
            type="date"
            placeholder={"Date of Birth"}
            value={fUserData.dob}
            onChange={(e) => {
              setFUserData((curr) => {
                return { ...curr, dob: e.target.value };
              });
            }}
          />
        </div>
      </div>
      <div className={"proRow"}>
        <select
          value={fUserData.gender}
          className={"genSelector"}
          onChange={(e) => {
            setFUserData((curr) => {
              return { ...curr, gender: e.target.value };
            });
          }}
        >
          <option value={""}>Select Gender</option>
          <option value={"male"}>Male</option>
          <option value={"female"}>Female</option>
          <option value={"other"}>Other</option>
        </select>
      </div>

      {btnClick ? (
        <ColorRing
          visible={true}
          height="40"
          width="40"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#FF5A60", "#FF5A60", "#FF5A60", "#FF5A60", "#FF5A60"]}
        />
      ) : (
        <CtaBtn Text={"Save"} fontSize={14} onClick={saveNewDetails} />
      )}
    </div>
  );
};

export default ProfilePersonal;
