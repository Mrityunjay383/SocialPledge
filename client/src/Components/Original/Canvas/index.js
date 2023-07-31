import React, { useRef, useEffect } from "react";

const Canvas = ({
  userName,
  pledgeData,
  qrURL,
  setIsCanvasMount,
  supporterData,
}) => {
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
    setIsCanvasMount(false);

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    let background = getImage(pledgeData.url);

    let qrCode = getImage(qrURL);

    let logo = getImage(
      "https://res.cloudinary.com/ddb1evz5g/image/upload/v1689918515/SocialPledgeLogo_usyssj.png"
    );
    let supporterLogo = getImage(supporterData.logo);

    const width = 1024;
    const height = 768;

    canvas.width = width;
    canvas.height = height;

    let xPos = width / 2 - userName.length * (width / 108);

    const dateStr = getDate();

    background.onload = function () {
      context.drawImage(background, 0, 0, width, height);

      context.drawImage(qrCode, 55, 550, 130, 130);
      context.drawImage(logo, 60, 50, logo.width / 6, logo.height / 6);

      const dimRatio = supporterLogo.width / supporterLogo.height;
      context.drawImage(supporterLogo, 870, 60, 100, 100 / dimRatio);

      context.font = `43px Roboto`;
      context.fillText(userName, xPos, 309);

      context.font = `22px Roboto`;
      context.fillText(dateStr, 70, 700);

      setIsCanvasMount(true);
    };
  }, [qrURL]);

  return <canvas id={"myCanvas"} ref={canvasRef} className={"unShow"} />;
};

export default Canvas;
