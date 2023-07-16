import React, { useRef, useEffect, useState } from "react";

const Canvas = ({ userName, pledgeData }) => {
  const canvasRef = useRef(null);

  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    let background = new Image();
    background.crossOrigin = "anonymous";
    background.src = pledgeData.url;

    // let width = screenSize.width / 1.5;
    let width = 1103;

    // if (screenSize.width < 838) {
    //   width = screenSize.width / 1.2;
    // }
    // if (screenSize.width < 590) {
    //   width = screenSize.width;
    // }

    const height = width / 1.5;

    canvas.width = width;
    canvas.height = height;

    let xPos = width / 2 - userName.length * (width / 108);

    background.onload = function () {
      context.drawImage(background, 0, 0, width, height);

      context.font = `${width / 25}px Chelsea`;
      context.fillText(userName, xPos, height / 2.2);
    };
  }, []);

  return <canvas id={"myCanvas"} ref={canvasRef} className={"unShow"} />;
};

export default Canvas;
