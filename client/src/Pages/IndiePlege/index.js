import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Canvas from "../../Components/Canvas";
import { Pledge } from "../../service";
import "./index.css";
import CtaBtn from "../../Components/CtaBtn";

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
    let canvas = document.getElementById("myCanvas");
    let dataURL = canvas.toDataURL("image/jpeg", 1.0);
    downloadImage(dataURL, `${userName}_${pledgeData.name}`);
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
        </div>
      )}
    </div>
  );
};

export default IndiePledge;
