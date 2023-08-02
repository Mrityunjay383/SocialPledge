import React, { useEffect, useState } from "react";
import "./index.css";
import { Pledge } from "../../../service";
import { BallTriangle } from "react-loader-spinner";
import { toast } from "react-toastify";
import PledgeCon from "../PledgeCon";
import CtaBtn from "../CtaBtn";
import { useNavigate } from "react-router-dom";

const HomePledge = () => {
  const navigate = useNavigate();

  const [allPledgeData, setAllPledgeData] = useState([]);

  const getPledges = async () => {
    const res = await Pledge.getHomePledges();

    if (res.status === 200) {
      setAllPledgeData(res.data.allPledges);
    } else {
      toast.error("Some Error occurred while loading pledge");
    }
  };

  const [showClass, setShowClass] = useState("unShow");
  let imgLoadIndex = 0;
  const onLoad = async () => {
    if (imgLoadIndex === allPledgeData.length - 1) {
      setShowClass("");
    }
    imgLoadIndex++;
  };

  useEffect(() => {
    getPledges();
  }, []);

  return (
    <div className="pledge" id="pledge">
      <h2>Pledges</h2>
      <p className="pledgeSubHead">
        Welcome to our collection of pledges! Here, you'll find a diverse array
        of causes that align with your passions and values. Take a moment to
        explore and choose the pledge that resonates with you, and together,
        let's make a powerful impact for positive change.
      </p>

      <div className="row pledgeCon">
        {allPledgeData.length !== 0 &&
          allPledgeData.map((pledge, index) => {
            return (
              <PledgeCon
                pledge={pledge}
                key={index}
                onLoad={onLoad}
                showClass={showClass}
              />
            );
          })}

        {showClass === "unShow" && (
          <div className={"loadingCon"}>
            <BallTriangle
              height={100}
              width={100}
              radius={5}
              color="#FF5A60"
              ariaLabel="ball-triangle-loading"
              wrapperClass={{}}
              wrapperStyle=""
              visible={true}
            />
            <p>We are loading top pledges for you, please wait</p>
          </div>
        )}
      </div>

      {showClass !== "unShow" && (
        <CtaBtn
          Text={"Show More"}
          fontSize={17}
          onClick={() => navigate("/pledges")}
        />
      )}
    </div>
  );
};

export default HomePledge;
