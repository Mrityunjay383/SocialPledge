import React from "react";
import CtaBtn from "../CtaBtn";
import { useNavigate } from "react-router-dom";
import "./index.css";

const PledgeCon = ({ pledge, index, showClass, onLoad }) => {
  const navigate = useNavigate();

  const Bottom = () => {
    const currDate = new Date().getTime() / 1000;
    if (pledge.liveDate <= currDate) {
      if (pledge.endDate > currDate || !pledge.endDate) {
        return (
          <CtaBtn
            Text={"Take this Pledge"}
            fontSize={14}
            onClick={() =>
              navigate(`/pledge/${pledge.name.replaceAll(" ", "_")}`)
            }
          />
        );
      } else {
        return (
          <div className={"CoSo"}>
            Closed on{" "}
            {new Date(pledge.endDate * 1000).toLocaleDateString("en-GB")}
          </div>
        );
      }
    } else {
      return <div className={"CoSo"}>Coming soon...</div>;
    }
  };

  return (
    <div className={`col-lg-3 indiePledgeCon ${showClass}`} key={index}>
      <article>
        <figure>
          {/*certificate logo*/}
          <img src={pledge.previewURL} onLoad={() => onLoad(index)} alt="" />
        </figure>

        <div>
          <h3>{pledge.name}</h3>
          <p>
            {pledge.about.length >= 105
              ? `${pledge.about.substring(0, 105)}...`
              : pledge.about}
          </p>

          <Bottom />
        </div>
      </article>
    </div>
  );
};

export default PledgeCon;
