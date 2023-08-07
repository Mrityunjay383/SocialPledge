import React, { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import CtaBtn from "../Original/CtaBtn";
import { Index } from "../../service";
import { toast } from "react-toastify";

const ProfileEducation = ({ fUserData }) => {
  const [formData, setFormData] = useState(fUserData);

  const [btnClick, setBtnClick] = useState(false);

  const saveNewDetails = async (newUserDel) => {
    setBtnClick(true);

    const res = await Index.saveDel({ newUserDel, type: "Education" });

    if (res.status === 200) {
      toast.success("Details Updated");
    } else {
      toast.error(res.data);
    }

    setBtnClick(false);
  };

  return (
    <div className={"personalCon"}>
      <div className={"proRow"}>
        <div className="delText">
          <input
            type="text"
            placeholder={"Title"}
            value={formData.title}
            onChange={(e) => {
              setFormData((curr) => {
                return { ...curr, title: e.target.value };
              });
            }}
          />
        </div>
        <div className="delText">
          <input
            type="number"
            placeholder={"Start Date"}
            value={formData.startDate}
            onChange={(e) => {
              setFormData((curr) => {
                return { ...curr, startDate: Number(e.target.value) };
              });
            }}
          />
        </div>
      </div>
      <div className={"proRow"}>
        <div className="delText">
          <input
            type="number"
            placeholder={"End Date"}
            value={formData.endDate}
            onChange={(e) => {
              setFormData((curr) => {
                return { ...curr, endDate: Number(e.target.value) };
              });
            }}
          />
        </div>
        <div className="delText">
          <input
            type="text"
            placeholder={"Institute"}
            value={formData.institute}
            onChange={(e) => {
              setFormData((curr) => {
                return { ...curr, institute: e.target.value };
              });
            }}
          />
        </div>
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

export default ProfileEducation;
