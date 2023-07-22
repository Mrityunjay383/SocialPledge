import React, { useRef, useEffect } from "react";

const Canvas = ({ userName, pledgeData, setIsCanvasMount }) => {
  const canvasRef = useRef(null);

  const getDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-GB");
  };

  const getImage = (url) => {
    let image = new Image();
    image.crossOrigin = "anonymous";
    image.src = url;

    return image;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    let background = getImage(pledgeData.url);

    let qrCode = getImage(
      "https://res.cloudinary.com/ddb1evz5g/image/upload/v1690035710/frame_vyvnun.png"
    );

    let logo = getImage(
      "https://res.cloudinary.com/ddb1evz5g/image/upload/v1689918515/SocialPledgeLogo_usyssj.png"
    );
    let supporterLogo = getImage(
      "https://res.cloudinary.com/ddb1evz5g/image/upload/v1690038836/Screenshot_2023-07-22_204206-removebg-preview_tqcuep.png"
    );

    const width = 1024;
    const height = 768;

    canvas.width = width;
    canvas.height = height;

    let xPos = width / 2 - userName.length * (width / 108);

    const dateStr = getDate();

    const supporter = "This cause is supported by: ";
    let xSup = width / 2 - supporter.length * 5;

    background.onload = function () {
      context.drawImage(background, 0, 0, width, height);

      context.drawImage(qrCode, 70, 600, 100, 100);
      context.drawImage(logo, 80, 30, 150, 60);
      context.drawImage(supporterLogo, 890, 60, 70, 100);

      context.font = `43px Roboto`;
      context.fillText(userName, xPos, height / 2.19);

      context.font = `26px Roboto`;
      context.fillText(dateStr, 460, 570);

      context.font = `25px Roboto`;
      context.fillText(supporter, xSup, 700);

      setIsCanvasMount(true);
    };
  }, []);

  return <canvas id={"myCanvas"} ref={canvasRef} className={"unShow"} />;
};

export default Canvas;
