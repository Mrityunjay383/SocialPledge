import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SupHeader from "../../../Components/Supporter/Header";
import { Certificate } from "../../../service";
import { toast } from "react-toastify";
import LineChart from "../../../Components/Supporter/LineChart";
import CtaBtn from "../../../Components/Original/CtaBtn";
import "./index.css";

const SupReports = ({ supporterData }) => {
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

  const [newDLArr, setNewDLArr] = useState([]);
  const [repDLArr, setRepDLArr] = useState([]);
  const [labels, setLabels] = useState([]);
  const [period, setPeriod] = useState("7L");

  const getReportData = async () => {
    const res = await Certificate.reportData({ period });

    if (res.status === 200) {
      setLabels(res.data.labels);
      setNewDLArr(res.data.newDLArr);
      setRepDLArr(res.data.repDLArr);
      // setNewCertificates(setLabels.newCertificates);
      // setRepCertificates(res.data.repCertificates);
    } else {
      toast.error("Some Error occurred!");
    }
  };
  useEffect(() => {
    getReportData();
  }, [period]);

  return (
    <div>
      <SupHeader supporterData={supporterData} />

      <div className={"midCon"}>
        <div className="container pt-2">
          <div className="row align-items-stretch">
            <div className="c-dashboardInfo col-lg-12">
              <div className="wrap">
                <div className="lineLabel">
                  Downloaded Pledges
                  <select onChange={(e) => setPeriod(e.target.value)}>
                    <option value="7L">Last 7 Days</option>
                    <option value="7T">This Week</option>
                    <option value="30L">Last 30 Days</option>
                    <option value="30T">This Month</option>
                  </select>
                </div>

                <LineChart
                  newDLArr={newDLArr}
                  repDLArr={repDLArr}
                  labels={labels}
                />
                <div className={"reportBtnCon"}>
                  <CtaBtn Text={"Download Report"} fontSize={16} />
                </div>
              </div>
            </div>

            {/*<div className="c-dashboardInfo col-lg-6 col-md-6">*/}
            {/*  <div className="wrap">*/}
            {/*    <div className="chartLabel">Repeat Downloads</div>*/}

            {/*    <DoughnutChart*/}
            {/*        type={"Rep"}*/}
            {/*        total={fetchedSupporterData.repLimit}*/}
            {/*        used={fetchedSupporterData.repCount}*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupReports;
