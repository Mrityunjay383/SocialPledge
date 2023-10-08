import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";
import AdminHeader from "../../../Components/Admin/Header";
import Spinner from "../../../Components/Supporter/Spinner";
import { toast } from "react-toastify";
import { Report } from "../../../service";
import DoughnutAdminChart from "../../../Components/Admin/Doughnut";

const AdminDashboard = ({ adminData }) => {
  const navigate = useNavigate();
  const { adminUserName } = useParams();

  useEffect(() => {
    if (adminUserName !== adminData.userName && adminData.userName !== "") {
      navigate(`/${adminData.userName}`);
    }
  }, []);

  const [isTopDataLoaded, setIsTopDataLoaded] = useState(false);

  const [dashData, setDashData] = useState({
    userCount: "",
    supportCount: "",
    pledgeCount: "",
    certificateCount: "",
  });

  const fetchDashData = async () => {
    try {
      const res = await Report.adminDashData();

      if (res.status === 200) {
        setDashData(res.data);
        setIsTopDataLoaded(true);
      }
    } catch (err) {
      toast.error("Some Error occurred!");
    }
  };

  useEffect(() => {
    fetchDashData();
  }, []);

  return (
    <div className={"centerCon"}>
      <AdminHeader adminData={adminData} />

      <div className="graphCon pt-5">
        <div className="row align-items-stretch">
          <div className="c-dashboardInfo col-lg-3 col-md-6">
            <div className="wrap">
              <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                Total
              </h4>
              {isTopDataLoaded ? (
                <span className="hind-font caption-12 c-dashboardInfo__count">
                  {dashData.userCount}
                </span>
              ) : (
                <Spinner />
              )}

              <span className="hind-font caption-12 c-dashboardInfo__subInfo">
                Users
              </span>
            </div>
          </div>

          <div className="c-dashboardInfo col-lg-3 col-md-6">
            <div className="wrap">
              <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                Total
              </h4>
              {isTopDataLoaded ? (
                <span className="hind-font caption-12 c-dashboardInfo__count">
                  {dashData.supportCount}
                </span>
              ) : (
                <Spinner />
              )}
              <span className="hind-font caption-12 c-dashboardInfo__subInfo">
                Supporters
              </span>
            </div>
          </div>
          <div className="c-dashboardInfo col-lg-3 col-md-6">
            <div className="wrap">
              <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                Total
              </h4>
              {isTopDataLoaded ? (
                <span className="hind-font caption-12 c-dashboardInfo__count">
                  {dashData.pledgeCount}
                </span>
              ) : (
                <Spinner />
              )}
              <span className="hind-font caption-12 c-dashboardInfo__subInfo">
                Pledges
              </span>
            </div>
          </div>
          <div className="c-dashboardInfo col-lg-3 col-md-6">
            <div className="wrap">
              <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                Total
              </h4>
              {isTopDataLoaded ? (
                <span className="hind-font caption-12 c-dashboardInfo__count">
                  {dashData.certificateCount}
                </span>
              ) : (
                <Spinner />
              )}
              <span className="hind-font caption-12 c-dashboardInfo__subInfo">
                certificate Download
              </span>
            </div>
          </div>
        </div>

        <div className={"card"} style={{ width: "42vw", margin: "5vh auto" }}>
          <DoughnutAdminChart dashData={dashData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
