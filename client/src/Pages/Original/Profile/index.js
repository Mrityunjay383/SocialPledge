import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import ProfilePersonal from "../../../Components/Original/ProfilePersonal";
import { Index } from "../../../service";
import { MutatingDots, ThreeDots } from "react-loader-spinner";
import ProfileEducation from "../../../Components/Original/ProfileEducation";
import ProfileAddress from "../../../Components/Original/ProfileAddress";

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

  const [stepsEle, setStepsEle] = useState([]);
  const fetchSteps = async () => {
    const res = await Index.profileSteps();

    if (res.status === 200) {
      const { filledSteps, totalSteps } = res.data;

      let stepsEleTemp = [];

      for (let i = 0; i < filledSteps; i++) {
        stepsEleTemp.push(
          <div
            key={i}
            data-title={`${filledSteps}/${totalSteps} Details Filled`}
            className={"gr"}
          ></div>
        );
      }

      for (let i = 0; i < totalSteps - filledSteps; i++) {
        stepsEleTemp.push(
          <div
            key={filledSteps + i}
            data-title={`${
              totalSteps - filledSteps
            }/${totalSteps} Details Unfilled`}
            className={"gy"}
          ></div>
        );
      }

      setStepsEle(stepsEleTemp);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetchSteps();
  }, []);

  const activeFFunc = () => {
    setIsDataLoaded(false);
    fetchUser();
  };
  useEffect(() => {
    activeFFunc();
  }, [activeFilter, stepsEle]);

  const changeActive = (e) => {
    const index = sidebarArr.indexOf(e.target.innerText);
    setActiveFilter(index);
  };

  const DetailsComponent = () => {
    if (activeFilter === 0) {
      return <ProfilePersonal fUserData={fUserData} fetchSteps={fetchSteps} />;
    } else if (activeFilter === 1) {
      return <ProfileEducation fUserData={fUserData} fetchSteps={fetchSteps} />;
    } else if (activeFilter === 2) {
      return <ProfileAddress fUserData={fUserData} fetchSteps={fetchSteps} />;
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
        {stepsEle.length !== 0 ? (
          <div className={"ComLine"}>
            {stepsEle.map((ele) => {
              return ele;
            })}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "40px",
            }}
          >
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#4effb5"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
        )}
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
              <p>Fetching {sidebarArr[activeFilter]} Data, please wait...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
