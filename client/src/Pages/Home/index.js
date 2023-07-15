import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "../../Components/Header";
import "./index.css";
import CtaBtn from "../../Components/CtaBtn";
import HomePledge from "../../Components/HomePledge";

const Home = () => {
  return (
    <div>
      <Header />

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

            <CtaBtn Text={"Explore Pledges"} fontSize={16} />
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
    </div>
  );
};

export default Home;
