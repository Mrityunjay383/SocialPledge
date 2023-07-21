import React, { useEffect, useState } from "react";
import CtaBtn from "../CtaBtn";
import "./index.css";
import { Pledge } from "../../service";
import { useNavigate } from "react-router-dom";

const HomePledge = () => {
  const navigate = useNavigate();

  // navigate(`/pledge/${pledgeId}`);

  const [allPledgeData, setAllPledgeData] = useState([]);

  const getPledges = async () => {
    const res = await Pledge.getPledges();

    if (res.status === 200) {
      setAllPledgeData(res.data.allPledges);
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
        {allPledgeData.map((pledge, index) => {
          return (
            <div className="col-lg-3 indiePledgeCon" key={index}>
              <article>
                <figure>
                  {/*certificate logo*/}
                  <img src={pledge.previewURL} alt="" />
                </figure>

                <div>
                  <h3>{pledge.name}</h3>
                  <p>{pledge.about}</p>

                  <CtaBtn
                    Text={"Take this Pledge"}
                    fontSize={14}
                    onClick={() => navigate(`/pledge/${pledge._id}`)}
                  />
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePledge;
