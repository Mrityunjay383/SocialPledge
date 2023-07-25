import React, { useEffect, useState } from "react";
import "../App.css";

//importing Router functionality
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingScreen from "react-loading-screen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SupporterAuth from "../Pages/Supporter/SupporterAuth";
import SupporterDashboard from "../Pages/Supporter/SupporterDashboard";
import { Supporter } from "../service";
import SupporterProfile from "../Pages/Supporter/SupporterProfile";
import SupHome from "../Pages/Supporter/Home";
import SupReports from "../Pages/Supporter/SupporterReports";
import Footer from "../Components/Original/Footer";

const SupporterSec = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [supporterData, setSupporterData] = useState({
    supporter_id: "",
    name: "",
    logo: "",
    userName: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const valLogin = async () => {
    const res = await Supporter.root();

    if (res.status === 200) {
      await setSupporterData({
        supporter_id: res.data.supporter.supporter_id,
        name: res.data.supporter.name,
        logo: res.data.supporter.logo,
        userName: res.data.supporter.userName,
      });
      await setIsLoggedIn(true);
    } else {
      await setSupporterData({
        supporter_id: "",
        name: "",
        logo: "",
        userName: "",
      });
      await setIsLoggedIn(false);
    }
  };

  const authFunc = async () => {
    await setIsLoading(true);
    await valLogin();
    await setIsLoading(false);
  };

  useEffect(() => {
    authFunc();
  }, [isLoggedIn]);

  return (
    <Router>
      <div className="App">
        <LoadingScreen
          loading={isLoading}
          bgColor="#f1f1f1"
          spinnerColor="#FF5A60"
          textColor="#FF5A60"
          logoSrc="https://res.cloudinary.com/ddb1evz5g/image/upload/v1689918515/SocialPledgeLogo_usyssj.png"
          text="Loading..."
        >
          <ToastContainer />

          <Routes>
            {/*Home Route have Landing Page */}
            <Route
              path="/"
              element={
                <div>
                  <SupHome />
                </div>
              }
            />

            <Route
              path="/:supporterUserName"
              element={
                <div>
                  {isLoggedIn ? (
                    <SupporterDashboard supporterData={supporterData} />
                  ) : (
                    <SupporterAuth />
                  )}
                </div>
              }
            />

            <Route
              path="/:supporterUserName/reports"
              element={
                <div>
                  {isLoggedIn ? (
                    <SupReports supporterData={supporterData} />
                  ) : (
                    <SupporterAuth />
                  )}
                </div>
              }
            />

            <Route
              path="/:supporterUserName/profile"
              element={
                <div>
                  {isLoggedIn ? (
                    <SupporterProfile supporterData={supporterData} />
                  ) : (
                    <SupporterAuth />
                  )}
                </div>
              }
            />
          </Routes>
          <Footer />
        </LoadingScreen>
      </div>
    </Router>
  );
};

export default SupporterSec;
