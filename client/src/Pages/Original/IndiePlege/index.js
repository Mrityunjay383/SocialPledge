import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactCanvasConfetti from "react-canvas-confetti";
import { toast } from "react-toastify";

import { Certificate, Pledge, Supporter } from "../../../service";
import "./index.css";
import CtaBtn from "../../../Components/Original/CtaBtn";
import Typewriter from "typewriter-effect";
import { Dna } from "react-loader-spinner";
import CanvasCom from "../../../Components/Original/Canvas";

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
    ticks: 200,
    zIndex: 10,
    particleCount: 150,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2,
    },
  };
}

const IndiePledge = ({ userData, isLoggedIn }) => {
  const navigate = useNavigate();
  const { pledgeName } = useParams();

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
  const [pledgeData, setPledgeData] = useState();
  const [supporterData, setSupporterData] = useState();
  const [isCanvasMounted, setIsCanvasMount] = useState(false);

  const [isPledgeLive, setIsPledgeLive] = useState(false);

  const [pledgeDataLoaded, setPledgeDataLoaded] = useState(false);
  const getPledgeData = async () => {
    const res = await Pledge.getIndiePledge({ pledgeName });

    if (res.status === 200) {
      if (res.data.pledge.liveDate * 1000 < new Date().getTime()) {
        if (
          res.data.pledge.endDate * 1000 > new Date().getTime() ||
          !res.data.pledge.endDate
        ) {
          await setIsPledgeLive(true);
          setPledgeData(res.data.pledge);
          getSupporter();
          setPledgeDataLoaded(true);
        } else {
          toast.error(`Sorry, ${res.data.pledge.name} is closed`);
          navigate("/");
        }
      } else {
        toast.error(`Sorry, ${res.data.pledge.name} is not live yet`);
        navigate("/");
      }
    }
  };

  const [supporterDataLoaded, setSupporterDataLoaded] = useState(false);
  const getSupporter = async () => {
    const res = await Supporter.getAvaSupporter();
    if (res.status === 200) {
      await setSupporterData(res.data.supporter);
      setSupporterDataLoaded(true);
    }
  };

  const [certificateExist, setCertificateExist] = useState(false);
  const certificateStatus = async () => {
    const res = await Certificate.isCertificateExist({
      userId: userData.user_id,
      pledgeId: pledgeData._id,
      supporterId: supporterData.id,
    });

    if (res.status === 200) {
      if (res.data.exist) {
        setCertificateExist(true);
      }
    }
  };

  useEffect(() => {
    if (pledgeData && supporterData) {
      certificateStatus();
    }
  }, [pledgeData, supporterData]);

  useEffect(() => {
    if (isLoggedIn) {
      getPledgeData();
    } else {
      navigate("/auth");
    }
  }, [isLoggedIn]);

  const [qrURL, setQrURL] = useState("");

  const downloadPledge = async () => {
    setIsCanvasMount(false);
    const res = await Certificate.newDownload({
      userId: userData.user_id,
      pledgeId: pledgeData._id,
      supporterId: supporterData.id,
    });

    if (res.status === 200) {
      await setQrURL(res.data.qrURL);
      // startAnimation();
      setTimeout(() => {
        setIsCanvasMount(true);
        let canvas = document.getElementById("myCanvas");
        let dataURL = canvas.toDataURL("image/jpeg", 1.0);
        downloadImage(dataURL, `${userData.name}_${pledgeData.name}`);
        toast.success("Your Certificate has been downloaded!!!");
      }, 100);
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

  const [imgSrc, setImgSrc] = useState(null);

  const buildImg = () => {
    let canvas = document.getElementById("myCanvas");
    let dataURL = canvas.toDataURL("image/jpeg", 1.0);
    setImgSrc(dataURL);
  };
  useEffect(() => {
    if (isCanvasMounted) {
      buildImg();
    }
  }, [isCanvasMounted]);

  const [textDone, setTextDone] = useState(false);
  useEffect(() => {
    if (pledgeDataLoaded) {
      setTimeout(() => {
        setTextDone(true);
      }, pledgeData.name.length * 33 + pledgeData.about.length * 33);
    }
  }, [pledgeDataLoaded]);

  return (
    <div className={"pledgeSection"}>
      {isPledgeLive &&
        (pledgeDataLoaded && supporterDataLoaded ? (
          <div className={"row mainSection"}>
            <div className={"col-lg-8 pledgeImgCon"}>
              {imgSrc ? (
                <img src={imgSrc} className={"pledgeImg"} alt="" />
              ) : (
                <div className={"loadingCon"}>
                  <Dna
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                  />
                  <p>
                    Generating a personalize pledge certificate for you, please
                    wait
                  </p>
                </div>
              )}
              <CanvasCom
                pledgeData={pledgeData}
                userName={userData.name}
                qrURL={qrURL}
                setIsCanvasMount={setIsCanvasMount}
                supporterData={supporterData}
              />
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
                      .pauseFor(900)
                      .typeString(
                        pledgeData.about.substring(
                          0,
                          pledgeData.about.length - 1
                        )
                      )
                      .start();
                  }}
                />
              </p>

              {textDone && (
                <CtaBtn
                  Text={certificateExist ? "Download Certificate" : "I Accept"}
                  fontSize={16}
                  onClick={downloadPledge}
                />
              )}
            </div>

            <ReactCanvasConfetti
              refConfetti={getInstance}
              style={canvasStyles}
            />
          </div>
        ) : (
          <div className={"loadingCon"}>
            <Dna
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
            <p>
              Generating a personalize pledge certificate for you, please wait
            </p>
          </div>
        ))}
    </div>
  );
};

export default IndiePledge;
