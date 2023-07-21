import React, { useRef, useEffect } from "react";

const Canvas = ({ userName, pledgeData, setIsCanvasMount }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    let background = new Image();
    background.crossOrigin = "anonymous";
    background.src = pledgeData.url;

    const width = 1024;
    const height = 768;

    canvas.width = width;
    canvas.height = height;

    let xPos = width / 2 - userName.length * (width / 108);

    background.onload = function () {
      context.drawImage(background, 0, 0, width, height);

      context.font = `${width / 25}px Chelsea`;
      context.fillText(userName, xPos, height / 2.2);
      setIsCanvasMount(true);
    };
  }, []);

  return <canvas id={"myCanvas"} ref={canvasRef} className={"unShow"} />;
};

export default Canvas;
