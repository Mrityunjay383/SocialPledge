import React, { useState } from "react";
import CtaBtn from "../CtaBtn";
import { ColorRing } from "react-loader-spinner";
import { Index } from "../../../service";
import { toast } from "react-toastify";

const ProfilePersonal = ({ fUserData, fetchSteps }) => {
  const [formData, setFormData] = useState(fUserData);

  const [btnClick, setBtnClick] = useState(false);

  const saveNewDetails = async () => {
    setBtnClick(true);

    const res = await Index.saveDel({
      newUserDel: formData,
      type: "Personal Details",
    });

    if (res.status === 200) {
      toast.success("Details Updated");
    } else {
      toast.error(res.data);
    }

    setBtnClick(false);
    fetchSteps();
  };

  const keyPress = async (e) => {
    if (e.key === "Enter") {
      saveNewDetails();
    }
  };

  return (
    <div className={"personalCon"}>
      <p>Let's talk about you</p>
      <div className={"proRow"}>
        <div className="delText">
          <input
            type="text"
            placeholder={"Name"}
            onKeyDown={keyPress}
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
            onKeyDown={keyPress}
            value={formData.mobNo}
            style={{ background: "#F3F1FE" }}
            onChange={(e) => {
              setFormData((curr) => {
                return { ...curr, mobNo: e.target.value };
              });
            }}
            disabled={true}
          />
        </div>
      </div>
      <div className={"proRow"}>
        <div className="delText">
          <input
            type="email"
            placeholder={"Email"}
            onKeyDown={keyPress}
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
            onKeyDown={keyPress}
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
          onKeyDown={keyPress}
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
        <CtaBtn Text={"Save"} fontSize={14} onClick={saveNewDetails} />
      )}
    </div>
  );
};

export default ProfilePersonal;
