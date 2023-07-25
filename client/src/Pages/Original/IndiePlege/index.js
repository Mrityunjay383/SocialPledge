import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactCanvasConfetti from "react-canvas-confetti";
import { toast } from "react-toastify";

import Canvas from "../../../Components/Original/Canvas";
import { Certificate, Pledge, Supporter } from "../../../service";
import "./index.css";
import CtaBtn from "../../../Components/Original/CtaBtn";
import Typewriter from "typewriter-effect";

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
    ticks: 150,
    zIndex: 10,
    particleCount: 350,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2,
    },
  };
}

const IndiePledge = ({ userData }) => {
  const { pledgeId } = useParams();

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

  //
  const [pledgeData, setPledgeData] = useState({});
  const [supporterData, setSupporterData] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isCanvasMounted, setIsCanvasMount] = useState(false);

  const getPledgeData = async () => {
    // setIsLoading(true);
    const res = await Pledge.getIndiePledge({ pledgeId });

    if (res.status === 200) {
      await setPledgeData(res.data.pledge);
      await getSupporter();
    }
  };

  const getSupporter = async () => {
    const res = await Supporter.getAvaSupporter();
    if (res.status === 200) {
      await setSupporterData(res.data.supporter);
      setDataLoaded(true);
    }
  };

  useEffect(() => {
    getPledgeData();
  }, []);

  const downloadPledge = async () => {
    const res = await Certificate.newDownload({
      userId: userData.user_id,
      pledgeId,
      supporterId: supporterData.id,
    });

    if (res.status === 200) {
      startAnimation();
      let canvas = document.getElementById("myCanvas");
      let dataURL = canvas.toDataURL("image/jpeg", 1.0);
      downloadImage(dataURL, `${userData.name}_${pledgeData.name}`);
      toast.success("Your Certificate has been downloaded!!!");
    } else {
      toast.error("Some Error occurred, please try again");
    }
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
      // setIsLoading(false);
    }
  }, [isCanvasMounted]);

  return (
    <div className={"pledgeSection"}>
      {dataLoaded && (
        <div className={"row mainSection"}>
          <div className={"col-lg-8"}>
            <Canvas
              pledgeData={pledgeData}
              userName={userData.name}
              setIsCanvasMount={setIsCanvasMount}
              supporterData={supporterData}
            />
            <img src={imgSrc} className={"pledgeImg"} alt="" />
          </div>

          <div className={"col-lg-4 pledgeTextCon"}>
            <h3>
              <Typewriter
                options={{
                  autoStart: true,
                  delay: 40,
                  cursor: ".",
                }}
                onInit={(typewriter) => {
                  typewriter.typeString(pledgeData.name).start();
                }}
              />
            </h3>
            <p>
              <Typewriter
                options={{
                  autoStart: true,
                  delay: 25,
                  cursor: ".",
                }}
                onInit={(typewriter) => {
                  typewriter
                    .pauseFor(1200)
                    .typeString(
                      pledgeData.about.substring(0, pledgeData.about.length - 1)
                    )
                    .start();
                }}
              />
            </p>

            <CtaBtn Text={"Download"} fontSize={16} onClick={downloadPledge} />
          </div>

          <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
        </div>
      )}
    </div>
  );
};

export default IndiePledge;
