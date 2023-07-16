import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Canvas from "../../Components/Canvas";
import { Pledge } from "../../service";
import "./index.css";
import CtaBtn from "../../Components/CtaBtn";

const IndiePledge = ({ userName }) => {
  const { pledgeId } = useParams();

  // const [canvasDataURL, setCanvasDataURL] = useState();

  const [pledgeData, setPledgeData] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  const getPledgeData = async () => {
    const res = await Pledge.getIndiePledge({ pledgeId });

    if (res.status === 200) {
      setPledgeData(res.data.pledge);
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
    if (dataLoaded) {
      setTimeout(() => {
        let canvas = document.getElementById("myCanvas");
        let dataURL = canvas.toDataURL("image/jpeg", 1.0);
        setImgSrc(dataURL);
      }, 300);
    }
  }, [dataLoaded]);

  return (
    <div>
      {dataLoaded && (
        <div className={"pledgeSection"}>
          <Canvas pledgeData={pledgeData} userName={userName} />
          <img src={imgSrc} className={"pledgeImg"} alt="" />
          <CtaBtn Text={"Download"} fontSize={16} onClick={downloadPledge} />
        </div>
      )}
    </div>
  );
};

export default IndiePledge;
