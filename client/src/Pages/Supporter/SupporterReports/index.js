import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SupHeader from "../../../Components/Supporter/Header";
import { Report } from "../../../service";
import { toast } from "react-toastify";
import LineChart from "../../../Components/Supporter/LineChart";
import "./index.css";
import { Dna } from "react-loader-spinner";
import Spinner from "../../../Components/Supporter/Spinner";
import ReportExcel from "../../../Components/Supporter/ExcelExport";

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

  const [totalCount, setTotalCount] = useState({
    new: 0,
    repeat: 0,
  });

  const [certiIds, setCertiIds] = useState([]);
  const getReportData = async () => {
    setIsDataLoaded(false);
    const res = await Report.reportData({ period });

    if (res.status === 200) {
      setTotalCount({
        new: res.data.totalNewCount,
        repeat: res.data.totalRepCount,
      });
      setLabels(res.data.labels);
      setNewDLArr(res.data.newDLArr);
      await setRepDLArr(res.data.repDLArr);
      setIsDataLoaded(true);
      setCertiIds(res.data.certificateIds);
    } else {
      toast.error("Some Error occurred!");
    }
  };

  const [isDataLoaded, setIsDataLoaded] = useState(false);

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
              </div>
            </div>

            <div className="c-dashboardInfo col-lg-6">
              <div className="wrap">
                <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                  Total
                </h4>
                {isDataLoaded ? (
                  <span className="hind-font caption-12 c-dashboardInfo__count">
                    {totalCount.new}
                  </span>
                ) : (
                  <Spinner />
                )}

                <span className="hind-font caption-12 c-dashboardInfo__subInfo">
                  New Downloads
                </span>
              </div>
            </div>
            <div className="c-dashboardInfo col-lg-6">
              <div className="wrap">
                <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                  Total
                </h4>
                {isDataLoaded ? (
                  <span className="hind-font caption-12 c-dashboardInfo__count">
                    {totalCount.repeat}
                  </span>
                ) : (
                  <Spinner />
                )}

                <span className="hind-font caption-12 c-dashboardInfo__subInfo">
                  Repeat Downloads
                </span>
              </div>
            </div>

            <div className="c-dashboardInfo col-lg-12">
              <div className="wrap">
                {isDataLoaded ? (
                  <div>
                    <LineChart
                      newDLArr={newDLArr}
                      repDLArr={repDLArr}
                      labels={labels}
                    />
                    <div className={"reportBtnCon"}>
                      <ReportExcel
                        certiIds={certiIds}
                        fileName={"SocialPledgeReport"}
                      />
                    </div>
                  </div>
                ) : (
                  <div className={"loadingCon repLodCon"}>
                    <Dna
                      visible={true}
                      height="80"
                      width="80"
                      ariaLabel="dna-loading"
                      wrapperStyle={{}}
                      wrapperClass="dna-wrapper"
                    />
                    <p>Generating report data for you, please wait</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupReports;
