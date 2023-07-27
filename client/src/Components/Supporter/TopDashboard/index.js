import React from "react";
import "./index.css";
import Spinner from "../Spinner";

const convertNums = (num) => {
  num = num.toString().replace(/[^0-9.]/g, "");
  if (num < 1000) {
    return num;
  }
  let si = [
    { v: 1e3, s: "K" },
    { v: 1e6, s: "M" },
    { v: 1e9, s: "B" },
    { v: 1e12, s: "T" },
    { v: 1e15, s: "P" },
    { v: 1e18, s: "E" },
  ];
  let index;
  for (index = si.length - 1; index > 0; index--) {
    if (num >= si[index].v) {
      break;
    }
  }
  return (
    (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") +
    si[index].s
  );
};

const TopDashboard = ({ fetchedSupporterData, isTopDataLoaded }) => {
  return (
    <div className="container pt-5">
      <div className="row align-items-stretch">
        <div className="c-dashboardInfo col-lg-3 col-md-6">
          <div className="wrap">
            <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
              Total Limit
            </h4>
            {isTopDataLoaded ? (
              <span className="hind-font caption-12 c-dashboardInfo__count">
                {convertNums(fetchedSupporterData.newLimit)}
              </span>
            ) : (
              <Spinner />
            )}

            <span className="hind-font caption-12 c-dashboardInfo__subInfo">
              New Downloads
            </span>
          </div>
        </div>

        <div className="c-dashboardInfo col-lg-3 col-md-6">
          <div className="wrap">
            <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
              New Users
            </h4>
            {isTopDataLoaded ? (
              <span className="hind-font caption-12 c-dashboardInfo__count">
                {convertNums(fetchedSupporterData.newCount)}
              </span>
            ) : (
              <Spinner />
            )}
            <span className="hind-font caption-12 c-dashboardInfo__subInfo">
              Downloads
            </span>
          </div>
        </div>
        <div className="c-dashboardInfo col-lg-3 col-md-6">
          <div className="wrap">
            <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
              Total Limit
            </h4>
            {isTopDataLoaded ? (
              <span className="hind-font caption-12 c-dashboardInfo__count">
                {convertNums(fetchedSupporterData.repLimit)}
              </span>
            ) : (
              <Spinner />
            )}
            <span className="hind-font caption-12 c-dashboardInfo__subInfo">
              Repeat Downloads
            </span>
          </div>
        </div>
        <div className="c-dashboardInfo col-lg-3 col-md-6">
          <div className="wrap">
            <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
              Repeat Users
            </h4>
            {isTopDataLoaded ? (
              <span className="hind-font caption-12 c-dashboardInfo__count">
                {convertNums(fetchedSupporterData.repCount)}
              </span>
            ) : (
              <Spinner />
            )}
            <span className="hind-font caption-12 c-dashboardInfo__subInfo">
              Downloads
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopDashboard;
