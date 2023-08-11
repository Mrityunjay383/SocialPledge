import React, { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import CtaBtn from "../CtaBtn";
import { Index } from "../../../service";
import { toast } from "react-toastify";

const ProfileEducation = ({ fUserData, fetchSteps }) => {
  const [formData, setFormData] = useState(fUserData);

  const [btnClick, setBtnClick] = useState(false);

  const saveNewDetails = async () => {
    setBtnClick(true);

    const res = await Index.saveDel({
      newUserDel: formData,
      type: "Education",
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
      <p>Where did you studied (Highest Study)</p>

      <div className={"proRow"}>
        <div className="delText">
          <input
            type="text"
            placeholder={"Title"}
            onKeyDown={keyPress}
            value={formData.title}
            onChange={(e) => {
              setFormData((curr) => {
                return { ...curr, title: e.target.value };
              });
            }}
          />
        </div>

        <div className="checkbox">
          Currently Studying
          <input
            checked={formData.currStudying}
            type="checkbox"
            onChange={(e) => {
              setFormData((curr) => {
                return { ...curr, currStudying: e.target.checked };
              });
            }}
          />
        </div>
      </div>
      <div className={"proRow"}>
        <div className="delText">
          <input
            type="number"
            placeholder={"Start Date"}
            onKeyDown={keyPress}
            value={formData.startDate}
            onChange={(e) => {
              setFormData((curr) => {
                return { ...curr, startDate: e.target.value };
              });
            }}
          />
        </div>
        {!formData.currStudying && (
          <div className="delText">
            <input
              type="number"
              placeholder={"End Date"}
              onKeyDown={keyPress}
              value={formData.endDate}
              onChange={(e) => {
                setFormData((curr) => {
                  return { ...curr, endDate: e.target.value };
                });
              }}
            />
          </div>
        )}
      </div>
      <div className={"proRow"}>
        <div className="delText">
          <input
            type="text"
            placeholder={"Institute"}
            onKeyDown={keyPress}
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
        <CtaBtn Text={"Save"} fontSize={14} onClick={saveNewDetails} />
      )}
    </div>
  );
};

export default ProfileEducation;
