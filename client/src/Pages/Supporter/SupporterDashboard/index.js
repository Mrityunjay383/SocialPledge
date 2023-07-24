import React, { useEffect, useState } from "react";
import SupHeader from "../../../Components/Supporter/Header";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";
import { Supporter } from "../../../service";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";

const Spinner = () => {
  return (
    <ColorRing
      visible={true}
      height="40"
      width="40"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={["#FF5A60", "#FF5A60", "#FF5A60", "#FF5A60", "#FF5A60"]}
    />
  );
};

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
  const [isTopDataLoaded, setIsTopDataLoaded] = useState(false);
  const fetchSupporterData = async () => {
    const res = await Supporter.indieSup({
      userName: supporterData.userName,
    });

    if (res.status === 200) {
      console.log(`#202320633619217 res.data.supporter`, res.data);
      setFetchedSupporterData(res.data.supporter);
      setIsTopDataLoaded(true);
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
              {isTopDataLoaded ? (
                <span className="hind-font caption-12 c-dashboardInfo__count">
                  {fetchedSupporterData.newLimit}
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
                Total Limit
              </h4>
              {isTopDataLoaded ? (
                <span className="hind-font caption-12 c-dashboardInfo__count">
                  {fetchedSupporterData.repLimit}
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
                New Users
              </h4>
              {isTopDataLoaded ? (
                <span className="hind-font caption-12 c-dashboardInfo__count">
                  {fetchedSupporterData.newCount}
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
                Repeat Users
              </h4>
              {isTopDataLoaded ? (
                <span className="hind-font caption-12 c-dashboardInfo__count">
                  {fetchedSupporterData.repCount}
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
    </div>
  );
};

export default SupporterDashboard;
