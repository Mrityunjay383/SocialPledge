import React, { useEffect, useState } from "react";
import "./index.css";
import { Pledge } from "../../../service";
import PledgeCon from "../../../Components/Original/PledgeCon";
import { BallTriangle } from "react-loader-spinner";

const filters = ["All", "Live", "Coming Soon", "Closed"];

const Pledges = () => {
  const [activeFilter, setActiveFilter] = useState(0);

  const changeActive = (e) => {
    const index = filters.indexOf(e.target.innerText);
    setActiveFilter(index);
  };

  const [pledgesData, setPledgesData] = useState([]);
  const fetchPledges = async () => {
    const res = await Pledge.getPledges({ filter: filters[activeFilter] });

    if (res.status === 200) {
      setPledgesData(res.data.pledgesData);
    }
  };

  useEffect(() => {
    fetchPledges();
  }, [activeFilter]);

  const [showClass, setShowClass] = useState("unShow");
  const onLoad = async (index) => {
    if (index === pledgesData.length - 1) {
      setShowClass("");
    }
  };

  return (
    <div className={"pledgeSection pledgesPGCon"}>
      <div className={"filterCon"}>
        {filters.map((filter, index) => (
          <div
            key={index}
            className={index === activeFilter && "activeFilter"}
            onClick={changeActive}
          >
            {filter}
          </div>
        ))}
      </div>

      <div className="row pledgeCon">
        {pledgesData.length !== 0 ? (
          pledgesData.map((pledge, index) => {
            return (
              <PledgeCon
                pledge={pledge}
                index={index}
                onLoad={onLoad}
                showClass={showClass}
              />
            );
          })
        ) : (
          <div className={"loadingCon CoSo"}>
            No {filters[activeFilter]} Pledge Found!
          </div>
        )}

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
            <p>
              We are loading {filters[activeFilter]} pledges for you, please
              wait
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pledges;
