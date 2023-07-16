import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import CtaBtn from "../CtaBtn";
import "./index.css";
import { Pledge } from "../../service";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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

  const startAnimation = useCallback(
    (pledgeId) => {
      if (!intervalId) {
        setIntervalId(setInterval(nextTickAnimation, 400));
      }

      setTimeout(() => {
        clearInterval(intervalId);
        setIntervalId(null);
        navigate(`/pledge/${pledgeId}`);
      }, 1500);
    },
    [intervalId, nextTickAnimation]
  );

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  const [allPledgeData, setAllPledgeData] = useState([]);

  const getPledges = async () => {
    const res = await Pledge.getPledges();

    if (res.status === 200) {
      setAllPledgeData(res.data.allPledges);
    }
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
        {allPledgeData.map((pledge, index) => {
          return (
            <div className="col-lg-3 indiePledgeCon" key={index}>
              <article>
                <figure>
                  {/*certificate logo*/}
                  <img src={pledge.previewURL} alt="" />
                </figure>

                <div>
                  <h3>{pledge.name}</h3>
                  <p>{pledge.about}</p>

                  <div className="clickme">
                    <ReactCanvasConfetti
                      refConfetti={getInstance}
                      style={canvasStyles}
                    />
                  </div>
                  <CtaBtn
                    Text={"Take this Pledge"}
                    fontSize={14}
                    onClick={() => startAnimation(pledge._id)}
                  />
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePledge;
