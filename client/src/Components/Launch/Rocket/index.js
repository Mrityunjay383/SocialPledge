import React, { useState } from "react";
import "./index.css";
import CtaBtn from "../../Original/CtaBtn";
import { Pledge } from "../../../service";
import Launched from "../Launched";
import { toast } from "react-toastify";

const Rocket = () => {
  const [isLaunched, setIsLaunched] = useState(false);
  const [screenChange, setScreenChange] = useState(false);

  const launch = async () => {
    setScreenChange(true);

    const res = await Pledge.launch();

    console.log(`#2023212235537271 res.data`, res.status);

    if (res.status === 200) {
      setIsLaunched(true);
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      {!screenChange ? (
        <div className="header">
          <div className={"logoCon"}>
            <img
              src={
                "https://res.cloudinary.com/ddb1evz5g/image/upload/v1689918515/SocialPledgeLogo_usyssj.png"
              }
              alt={"SocialPledgeLogo"}
            />
          </div>

          <div className="stars"></div>

          <div className="wave">
            <div className="big-rocket">
              <img
                src="https://res.cloudinary.com/rocket-landing-page/image/upload/v1549206065/rock-big.png"
                alt=""
              />
            </div>
          </div>

          <div className="shine">
            <img
              src="https://res.cloudinary.com/rocket-landing-page/image/upload/v1549206064/shine-2.png"
              alt=""
            />
            <img
              src="https://res.cloudinary.com/rocket-landing-page/image/upload/v1549206064/shine-3.png"
              alt=""
            />
            <img
              src="https://res.cloudinary.com/rocket-landing-page/image/upload/v1549206064/shine-4.png"
              alt=""
            />
            <img
              src="https://res.cloudinary.com/rocket-landing-page/image/upload/v1549206064/shine-5.png"
              alt=""
            />
          </div>
          <div className="shine shine-2">
            <img
              src="https://res.cloudinary.com/rocket-landing-page/image/upload/v1549206064/shine-2.png"
              alt=""
            />
            <img
              src="https://res.cloudinary.com/rocket-landing-page/image/upload/v1549206064/shine-3.png"
              alt=""
            />
            <img
              src="https://res.cloudinary.com/rocket-landing-page/image/upload/v1549206064/shine-4.png"
              alt=""
            />
            <img
              src="https://res.cloudinary.com/rocket-landing-page/image/upload/v1549206064/shine-5.png"
              alt=""
            />
          </div>
          <div className="moon">
            <img
              src="https://res.cloudinary.com/rocket-landing-page/image/upload/v1549206064/moon-1.png"
              alt=""
            />
          </div>
          <div className="moon-1">
            <img
              src="https://res.cloudinary.com/rocket-landing-page/image/upload/v1549206064/moon.png"
              alt=""
            />
          </div>

          <CtaBtn
            Text={"Launch"}
            fontSize={25}
            className={"LaunchBtn"}
            onClick={launch}
          />
        </div>
      ) : (
        <Launched isLaunched={isLaunched} />
      )}
    </div>
  );
};

export default Rocket;
