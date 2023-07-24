import React, { useEffect, useState } from "react";
import "../App.css";

//importing Router functionality
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingScreen from "react-loading-screen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SupporterAuth from "../Pages/SupporterAuth";

const Supporter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [supporterData, setSupporterData] = useState({
    supporter_id: "",
    name: "",
    logo: "",
  });

  const [isLoading, setIsLoading] = useState(false);

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
                  <SupporterAuth />
                </div>
              }
            />
          </Routes>
        </LoadingScreen>
      </div>
    </Router>
  );
};

export default Supporter;
