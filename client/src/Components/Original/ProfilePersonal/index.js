import React, { useState } from "react";
import CtaBtn from "../CtaBtn";
import { ColorRing } from "react-loader-spinner";
import { Index } from "../../../service";
import { toast } from "react-toastify";

const ProfilePersonal = ({ fUserData }) => {
  const [formData, setFormData] = useState(fUserData);

  const [btnClick, setBtnClick] = useState(false);

  const saveNewDetails = async (newUserDel) => {
    setBtnClick(true);

    const res = await Index.saveDel({ newUserDel, type: "Personal Details" });

    if (res.status === 200) {
      toast.success("Details Updated");
    } else {
      toast.error(res.data);
    }

    setBtnClick(false);
  };

  return (
    <div className={"personalCon"}>
      <p>Let's talk about you</p>
      <div className={"proRow"}>
        <div className="delText">
          <input
            type="text"
            placeholder={"Name"}
            value={formData.name}
            onChange={(e) => {
              setFormData((curr) => {
                return { ...curr, name: e.target.value };
              });
            }}
          />
        </div>
        <div className="delText">
          <input
            type="number"
            placeholder={"Mobile Number"}
            value={formData.mobNo}
            onChange={(e) => {
              setFormData((curr) => {
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
            value={formData.email}
            onChange={(e) => {
              setFormData((curr) => {
                return { ...curr, email: e.target.value };
              });
            }}
          />
        </div>
        <div className="delDate">
          <input
            type="date"
            placeholder={"Date of Birth"}
            value={formData.dob}
            onChange={(e) => {
              setFormData((curr) => {
                return { ...curr, dob: e.target.value };
              });
            }}
          />
        </div>
      </div>
      <div className={"proRow"}>
        <select
          value={formData.gender}
          className={"genSelector"}
          onChange={(e) => {
            setFormData((curr) => {
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
        <CtaBtn
          Text={"Save"}
          fontSize={14}
          onClick={() => saveNewDetails(formData)}
        />
      )}
    </div>
  );
};

export default ProfilePersonal;
