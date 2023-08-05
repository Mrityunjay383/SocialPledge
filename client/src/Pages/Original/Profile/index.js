import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import ProfilePersonal from "../../../Components/Original/ProfilePersonal";

const sidebarArr = ["Personal Details", "Education", "Address"];

const Profile = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const fetchUser = async () => {};

  useEffect(() => {
    if (isLoggedIn) {
      fetchUser();
    } else {
      navigate("/auth");
    }
  }, [isLoggedIn]);

  const [activeFilter, setActiveFilter] = useState(0);

  const changeActive = (e) => {
    const index = sidebarArr.indexOf(e.target.innerText);
    setActiveFilter(index);
  };

  return (
    <div className={"row justify-content-between ProfileSec"}>
      <div className={"col-lg-3 card sidebar"}>
        {sidebarArr.map((tile, index) => {
          return (
            <div
              key={index}
              className={index === activeFilter && "activeFilter"}
              onClick={changeActive}
            >
              {tile}
            </div>
          );
        })}
      </div>
      <div className={"col-lg-8 card profileCom"}>
        <div className={"ComLine"}></div>
        <div className={"DetailCom"}>
          <ProfilePersonal />
        </div>
      </div>
    </div>
  );
};

export default Profile;
