import React, { useEffect, useState } from "react";
import SupHeader from "../../../Components/Supporter/Header";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";
import { Supporter } from "../../../service";
import { toast } from "react-toastify";

const SupporterDashboard = ({ supporterData, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const { supporterUserName } = useParams();

  useEffect(() => {
    if (
      supporterUserName !== supporterData.userName &&
      supporterData.userName !== ""
    ) {
      navigate(`/${supporterData.userName}`);
    }
  }, []);

  const [fetchedSupporterData, setFetchedSupporterData] = useState({});
  const fetchSupporterData = async () => {
    const res = await Supporter.indieSup({
      userName: supporterData.userName,
    });

    if (res.status === 200) {
      console.log(`#202320633619217 res.data.supporter`, res.data);
      setFetchedSupporterData(res.data.supporter);
    } else {
      toast.error("Some Error occurred");
    }
  };

  useEffect(() => {
    fetchSupporterData();
  }, []);

  return (
    <div>
      <SupHeader setIsLoggedIn={setIsLoggedIn} supporterData={supporterData} />

      <div className="container pt-5">
        <div className="row align-items-stretch">
          <div className="c-dashboardInfo col-lg-3 col-md-6">
            <div className="wrap">
              <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                Total Limit
              </h4>
              <span className="hind-font caption-12 c-dashboardInfo__count">
                {fetchedSupporterData.newLimit}
              </span>
              <span className="hind-font caption-12 c-dashboardInfo__subInfo">
                New Downloads
              </span>
            </div>
          </div>
          <div className="c-dashboardInfo col-lg-3 col-md-6">
            <div className="wrap">
              <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                Total Limit
              </h4>
              <span className="hind-font caption-12 c-dashboardInfo__count">
                {fetchedSupporterData.repLimit}
              </span>
              <span className="hind-font caption-12 c-dashboardInfo__subInfo">
                Repeat Downloads
              </span>
            </div>
          </div>
          <div className="c-dashboardInfo col-lg-3 col-md-6">
            <div className="wrap">
              <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                New Users
              </h4>
              <span className="hind-font caption-12 c-dashboardInfo__count">
                {fetchedSupporterData.newCount}
              </span>
              <span className="hind-font caption-12 c-dashboardInfo__subInfo">
                Downloads
              </span>
            </div>
          </div>
          <div className="c-dashboardInfo col-lg-3 col-md-6">
            <div className="wrap">
              <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                Repeat Users
              </h4>
              <span className="hind-font caption-12 c-dashboardInfo__count">
                {fetchedSupporterData.repCount}
              </span>
              <span className="hind-font caption-12 c-dashboardInfo__subInfo">
                Downloads
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupporterDashboard;
