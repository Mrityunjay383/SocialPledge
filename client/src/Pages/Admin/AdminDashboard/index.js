import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";
import AdminHeader from "../../../Components/Admin/Header";

const AdminDashboard = ({ adminData }) => {
  const navigate = useNavigate();
  const { adminUserName } = useParams();

  useEffect(() => {
    if (adminUserName !== adminData.userName && adminData.userName !== "") {
      navigate(`/${adminData.userName}`);
    }
  }, []);

  return (
    <div className={"centerCon"}>
      <AdminHeader adminData={adminData} />

      <div className={"bodyCom"}>
        <div className={"card w-100"}></div>
      </div>
    </div>
  );
};

export default AdminDashboard;
