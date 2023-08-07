import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import ProfilePersonal from "../../../Components/Original/ProfilePersonal";
import { Index } from "../../../service";
import { MutatingDots } from "react-loader-spinner";
import ProfileEducation from "../../../Components/ProfileEducation";
import ProfileAddress from "../../../Components/ProfileAddress";

const sidebarArr = ["Personal Details", "Education", "Address"];

const Profile = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const [fUserData, setFUserData] = useState({});

  const [activeFilter, setActiveFilter] = useState(0);

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const fetchUser = async () => {
    const res = await Index.profile({ type: sidebarArr[activeFilter] });

    if (res.status === 200) {
      const { buildUser } = res.data;

      setFUserData(buildUser);
      setIsDataLoaded(true);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth");
    }
  }, [isLoggedIn]);

  const activeFFunc = () => {
    setIsDataLoaded(false);
    fetchUser();
  };
  useEffect(() => {
    activeFFunc();
  }, [activeFilter]);

  const changeActive = (e) => {
    const index = sidebarArr.indexOf(e.target.innerText);
    setActiveFilter(index);
  };

  const DetailsComponent = () => {
    if (activeFilter === 0) {
      return <ProfilePersonal fUserData={fUserData} />;
    } else if (activeFilter === 1) {
      return <ProfileEducation fUserData={fUserData} />;
    } else if (activeFilter === 2) {
      return <ProfileAddress fUserData={fUserData} />;
    }
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
      <div className={"col-lg-8 profileCom"}>
        <div className={"ComLine"}></div>
        <div className={"DetailCom"}>
          {isDataLoaded ? (
            <DetailsComponent />
          ) : (
            <div className={"loadingCon"}>
              <MutatingDots
                height="100"
                width="100"
                color="#FF5A60"
                secondaryColor="#FF5A60"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
              <p>Fetching Profile Data, please wait...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
