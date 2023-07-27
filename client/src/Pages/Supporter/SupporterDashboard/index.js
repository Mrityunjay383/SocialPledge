import React, { useEffect, useState } from "react";
import SupHeader from "../../../Components/Supporter/Header";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";
import { Supporter } from "../../../service";
import { toast } from "react-toastify";
import TopDashboard from "../../../Components/Supporter/TopDashboard";
import DoughnutChart from "../../../Components/Supporter/Doughnut";

const SupporterDashboard = ({ supporterData }) => {
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
    const res = await Supporter.indieSup();

    if (res.status === 200) {
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
    <div className={"centerCon"}>
      <SupHeader supporterData={supporterData} />

      <TopDashboard
        fetchedSupporterData={fetchedSupporterData}
        isTopDataLoaded={isTopDataLoaded}
      />

      <div className="container pt-5">
        <div className="row align-items-stretch">
          <div className="c-dashboardInfo col-lg-6">
            <div className="wrap">
              <div className="chartLabel">New Downloads</div>

              <DoughnutChart
                type={"New"}
                total={fetchedSupporterData.newLimit}
                used={fetchedSupporterData.newCount}
              />
            </div>
          </div>

          <div className="c-dashboardInfo col-lg-6">
            <div className="wrap">
              <div className="chartLabel">Repeat Downloads</div>

              <DoughnutChart
                type={"Rep"}
                total={fetchedSupporterData.repLimit}
                used={fetchedSupporterData.repCount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupporterDashboard;
