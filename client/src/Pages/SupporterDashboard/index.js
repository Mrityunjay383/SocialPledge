import React from "react";
import { useParams } from "react-router-dom";

const SupporterDashboard = () => {
  const { supporterUserName } = useParams();
  console.log(`#20232060552317 supporterUserName`, supporterUserName);
  return <div>Supporter Dashboard</div>;
};

export default SupporterDashboard;
