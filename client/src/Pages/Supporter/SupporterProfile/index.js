import React, { useEffect } from "react";
import SupHeader from "../../../Components/Supporter/Header";
import { useNavigate, useParams } from "react-router-dom";

const SupporterProfile = ({ supporterData, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const { supporterUserName } = useParams();

  useEffect(() => {
    if (
      supporterUserName !== supporterData.userName &&
      supporterData.userName !== ""
    ) {
      navigate(`/${supporterData.userName}/profile`);
    }
  }, []);

  return (
    <div>
      <SupHeader setIsLoggedIn={setIsLoggedIn} supporterData={supporterData} />
    </div>
  );
};

export default SupporterProfile;