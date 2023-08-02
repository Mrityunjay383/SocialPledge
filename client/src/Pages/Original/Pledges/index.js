import React, { useState } from "react";
import "./index.css";

const filters = ["All", "Recent", "Hot", "Coming Soon", "Closed"];

const Pledges = () => {
  const [activeFilter, setActiveFilter] = useState(0);

  const changeActive = (e) => {
    const index = filters.indexOf(e.target.innerText);
    setActiveFilter(index);
  };
  return (
    <div className={"pledgeSection"}>
      <div className={"filterCon"}>
        {filters.map((filter, index) => (
          <div
            className={index === activeFilter && "active"}
            onClick={changeActive}
          >
            {filter}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pledges;
