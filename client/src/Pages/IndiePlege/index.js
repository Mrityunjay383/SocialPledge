import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactCanvasConfetti from "react-canvas-confetti";
import { toast } from "react-toastify";

import Canvas from "../../Components/Canvas";
import { Pledge } from "../../service";
import "./index.css";
import CtaBtn from "../../Components/CtaBtn";

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
    particleCount: 350,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2,
    },
  };
}

const IndiePledge = ({ userName, setIsLoading }) => {
  const { pledgeId } = useParams();

  const [pledgeData, setPledgeData] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isCanvasMounted, setIsCanvasMount] = useState(false);

  const getPledgeData = async () => {
    setIsLoading(true);
    const res = await Pledge.getIndiePledge({ pledgeId });

    if (res.status === 200) {
      await setPledgeData(res.data.pledge);
      setDataLoaded(true);
    }
  };

  useEffect(() => {
    getPledgeData();
  }, []);

  const downloadPledge = async () => {
    startAnimation();
    let canvas = document.getElementById("myCanvas");
    let dataURL = canvas.toDataURL("image/jpeg", 1.0);
    downloadImage(dataURL, `${userName}_${pledgeData.name}`);
    toast.success("Your Certificate has been downloaded!!!");
  };

  // Save | Download image
  function downloadImage(data, filename = "untitled.jpeg") {
    let a = document.createElement("a");
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
  }

  const [imgSrc, setImgSrc] = useState();

  useEffect(() => {
    if (isCanvasMounted) {
      let canvas = document.getElementById("myCanvas");
      let dataURL = canvas.toDataURL("image/jpeg", 1.0);
      setImgSrc(dataURL);
      setIsLoading(false);
    }
  }, [isCanvasMounted]);

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

  return (
    <div>
      {dataLoaded && (
        <div className={"pledgeSection"}>
          <Canvas
            pledgeData={pledgeData}
            userName={userName}
            setIsCanvasMount={setIsCanvasMount}
          />
          <img src={imgSrc} className={"pledgeImg"} alt="" />
          <CtaBtn Text={"Download"} fontSize={16} onClick={downloadPledge} />

          <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
        </div>
      )}
    </div>
  );
};

export default IndiePledge;
