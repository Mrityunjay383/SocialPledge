import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SupHeader from "../../../Components/Supporter/Header";

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
  return (
    <div>
      <SupHeader supporterData={supporterData} />
    </div>
  );
};

export default SupReports;
