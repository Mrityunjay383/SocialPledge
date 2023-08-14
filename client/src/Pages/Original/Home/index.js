import React, { useEffect, useState } from "react";
import "./index.css";
import CtaBtn from "../../../Components/Original/CtaBtn";
import HomePledge from "../../../Components/Original/HomePledge";
import CountUp from "react-countup";
import { Certificate } from "../../../service";

const Home = () => {
  const [certificateCount, setCertificateCount] = useState(0);
  const countCertificates = async () => {
    const res = await Certificate.certificateCount();

    if (res.status === 200) {
      setCertificateCount(res.data.certificateCount);
    }
  };
  useEffect(() => {
    countCertificates();
  }, []);

  return (
    <div>
      <div className="title">
        <div className="row">
          <div className="col-lg-6 ap-img-container">
            <img
              className="ab-bg-img"
              src="https://res.cloudinary.com/ddb1evz5g/image/upload/v1689429813/bg-tablet-pattern_rwfcnt.svg"
              alt=""
            />
            <img
              className="ab-title-img"
              src="https://res.cloudinary.com/ddb1evz5g/image/upload/v1689429901/illustration-intro_vpbozc.png"
              alt=""
            />
          </div>
          <div className="col-lg-6 title-content">
            <h1>Welcome to the world of Changemakers.</h1>

            <p>
              Unleash Your Potential: Discover, Connect, and Amplify Impact to
              Drive Meaningful Changes.
            </p>

            <CtaBtn
              Text={"Explore Pledges"}
              fontSize={18}
              onClick={() => {
                document.getElementById("pledge").scrollIntoView();
              }}
            />
          </div>

          <div className="col-lg-6 bl-img-container">
            <img
              className="bl-bg-img"
              src="https://res.cloudinary.com/ddb1evz5g/image/upload/v1689429813/bg-tablet-pattern_rwfcnt.svg"
              alt=""
            />
            <img
              className="bl-title-img"
              src="https://res.cloudinary.com/ddb1evz5g/image/upload/v1689429901/illustration-intro_vpbozc.png"
              alt=""
            />
          </div>
        </div>
      </div>

      {/*Pledge Section*/}
      <HomePledge />

      <div className={"countCon"}>
        <div>
          <CountUp
            end={certificateCount}
            enableScrollSpy={true}
            scrollSpyDelay={200}
          />
          +
        </div>
        <p>Pledges have already been taken.</p>
      </div>
    </div>
  );
};

export default Home;
