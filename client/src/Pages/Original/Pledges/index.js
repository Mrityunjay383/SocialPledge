import React, { useEffect, useState } from "react";
import "./index.css";
import { Pledge } from "../../../service";
import PledgeCon from "../../../Components/Original/PledgeCon";
import { BallTriangle } from "react-loader-spinner";

const filters = ["Live", "Coming Soon", "Closed", "All"];

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

  const [dataLoaded, setDataLoaded] = useState(false);

  const changeFilter = async () => {
    await setDataLoaded(false);
    await fetchPledges();
    await setDataLoaded(true);
  };

  useEffect(() => {
    changeFilter();
  }, [activeFilter]);

  const [showClass, setShowClass] = useState("unShow");
  let imgLoadIndex = 0;
  const onLoad = async () => {
    if (imgLoadIndex === pledgesData.length - 1) {
      setShowClass("");
    }
    imgLoadIndex++;
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
        {dataLoaded ? (
          pledgesData.length !== 0 ? (
            pledgesData.map((pledge, index) => {
              return (
                <PledgeCon
                  key={index}
                  pledge={pledge}
                  index={index}
                  onLoad={onLoad}
                  showClass={showClass}
                />
              );
            })
          ) : (
            <div>No {filters[activeFilter]} Pledge Found !!</div>
          )
        ) : null}

        {!dataLoaded ? (
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
        ) : null}
      </div>
    </div>
  );
};

export default Pledges;
