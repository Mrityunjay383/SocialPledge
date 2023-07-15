import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import CtaBtn from "../CtaBtn";
import "./index.css";

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

function getAnimationSettings(originXA, originXB) {
  return {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
    particleCount: 150,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2,
    },
  };
}
const HomePledge = () => {
  const refAnimationInstance = useRef(null);
  const [intervalId, setIntervalId] = useState();

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(0.1, 0.3));
      refAnimationInstance.current(getAnimationSettings(0.7, 0.9));
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 400));
    }

    setTimeout(() => {
      clearInterval(intervalId);
      setIntervalId(null);
    }, 1500);
  }, [intervalId, nextTickAnimation]);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

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
        <div className="col-lg-3 indiePledgeCon">
          <article>
            <figure>
              {/*certificate logo*/}
              <img
                src="https://res.cloudinary.com/ddb1evz5g/image/upload/v1688654479/WhatsApp_Image_2023-06-21_at_2.54.14_PM_z38xac.jpg"
                alt=""
              />
            </figure>

            <div>
              <h1>Anti-Dowry</h1>
              <p>About this Pledge</p>

              <div className="clickme">
                <ReactCanvasConfetti
                  refConfetti={getInstance}
                  style={canvasStyles}
                />
              </div>
              <CtaBtn
                Text={"Take this Pledge"}
                fontSize={14}
                onClick={startAnimation}
              />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default HomePledge;
