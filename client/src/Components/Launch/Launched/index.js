import React, { useCallback, useEffect, useRef, useState } from "react";
import CtaBtn from "../../Original/CtaBtn";
import ReactCanvasConfetti from "react-canvas-confetti";
import { ColorRing } from "react-loader-spinner";

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
    ticks: 300,
    zIndex: 10,
    particleCount: 500,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2,
    },
  };
}

const Launched = ({ isLaunched }) => {
  //Animation
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

  useEffect(() => {
    if (isLaunched) {
      startAnimation();
    }
  }, [isLaunched]);

  return (
    <div className="header">
      <div className={"logoCon"}>
        <img
          src={
            "https://res.cloudinary.com/ddb1evz5g/image/upload/v1689918515/SocialPledgeLogo_usyssj.png"
          }
          alt={"SocialPledgeLogo"}
        />
      </div>

      <div className={"LaunchedText"}>
        {isLaunched ? (
          <div>
            <h1>Congratulation!!</h1>
            <h1>The Pledges are Lunched</h1>
            <CtaBtn
              Text={"Home"}
              fontSize={16}
              onClick={() => (window.location = "https://socialpledge.in")}
            />
          </div>
        ) : (
          <ColorRing
            visible={true}
            height="40"
            width="40"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#FF5A60", "#FF5A60", "#FF5A60", "#FF5A60", "#FF5A60"]}
          />
        )}
      </div>

      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </div>
  );
};

export default Launched;
