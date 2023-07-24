import React, { useEffect, useState } from "react";
import CtaBtn from "../CtaBtn";
import "./index.css";
import { Pledge } from "../../../service";
import { useNavigate } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import { toast } from "react-toastify";

const HomePledge = () => {
  const navigate = useNavigate();

  const [allPledgeData, setAllPledgeData] = useState([]);

  const getPledges = async () => {
    const res = await Pledge.getHomePledges();

    if (res.status === 200) {
      setAllPledgeData(res.data.allPledges);
    } else {
      toast.error("Some Error occurred while loading pledge");
    }
  };

  const [showClass, setShowClass] = useState("unShow");
  const onLoad = async (index) => {
    if (index === allPledgeData.length - 1) {
      setShowClass("");
    }
  };

  useEffect(() => {
    getPledges();
  }, []);

  return (
    <div className="pledge" id="pledge">
      <h2>Pledges</h2>
      <p className="pledgeSubHead">
        Welcome to our collection of pledges! Here, you'll find a diverse array
        of causes that align with your passions and values. Take a moment to
        explore and choose the pledge that resonates with you, and together,
        let's make a powerful impact for positive change.
      </p>

      <div className="row pledgeCon">
        {allPledgeData.length !== 0 &&
          allPledgeData.map((pledge, index) => {
            return (
              <div
                className={`col-lg-3 indiePledgeCon ${showClass}`}
                key={index}
              >
                <article>
                  <figure>
                    {/*certificate logo*/}
                    <img
                      src={pledge.previewURL}
                      onLoad={() => onLoad(index)}
                      alt=""
                    />
                  </figure>

                  <div>
                    <h3>{pledge.name}</h3>
                    <p>{pledge.about}</p>

                    {pledge.live &&
                    pledge.liveDate * 1000 < new Date().getTime() ? (
                      <CtaBtn
                        Text={"Take this Pledge"}
                        fontSize={14}
                        onClick={() => navigate(`/pledge/${pledge._id}`)}
                      />
                    ) : (
                      <div className={"CoSo"}>
                        Coming soon... <br /> Live on{" "}
                        {new Date(pledge.liveDate * 1000).toLocaleDateString(
                          "en-GB"
                        )}
                      </div>
                    )}
                  </div>
                </article>
              </div>
            );
          })}

        {showClass === "unShow" && (
          <div className={"loadingCon"}>
            <BallTriangle
              height={100}
              width={100}
              radius={5}
              color="#FF5A60"
              ariaLabel="ball-triangle-loading"
              wrapperClass={{}}
              wrapperStyle=""
              visible={true}
            />
            <p>We are loading top pledges for you, please wait</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePledge;
