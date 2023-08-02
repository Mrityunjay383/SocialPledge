import React, { useEffect, useState } from "react";
import "../App.css";

//importing Router functionality
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingScreen from "react-loading-screen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Auth } from "../service";
import Home from "../Pages/Original/Home";
import AuthPage from "../Pages/Original/Auth";
import Header from "../Components/Original/Header";
import IndiePledge from "../Pages/Original/IndiePlege";
import About from "../Pages/Original/About";
import Footer from "../Components/Original/Footer";
import IndieCertificate from "../Pages/Original/IndieCertificate";
import Pledges from "../Pages/Original/Pledges";

const Original = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    user_id: "",
    name: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  const [internetIssue, setInternetIssue] = useState(false);
  const valLogin = async () => {
    try {
      const res = await Auth.root();

      if (res.status === 200) {
        await setUserData({
          user_id: res.data.user.user_id,
          name: res.data.user.name,
        });
        await setIsLoggedIn(true);
      } else {
        await setUserData({ user_id: "", name: "" });
        await setIsLoggedIn(false);
      }

      await setIsLoading(false);
    } catch (err) {
      console.log(`#202321419122932 err`, err);
      await setIsLoading(false);
      setInternetIssue(true);
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

          {!internetIssue ? (
            <div>
              <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

              <Routes>
                {/*Home Route have Landing Page */}
                <Route
                  path="/"
                  element={
                    <div>
                      <Home />
                    </div>
                  }
                />

                {/*Home Route have Landing Page */}
                <Route
                  path="/about"
                  element={
                    <div>
                      <About />
                    </div>
                  }
                />

                {/*Auth Route have Login Register */}
                <Route
                  path="/auth"
                  element={
                    <div>
                      <AuthPage setIsLoggedIn={setIsLoggedIn} />
                    </div>
                  }
                />

                <Route
                  path="/pledges"
                  element={
                    <div>
                      <Pledges />
                    </div>
                  }
                />

                {/* Indie Pledge Route*/}
                <Route
                  path="/pledge/:pledgeName"
                  element={
                    <div>
                      {!isLoggedIn ? (
                        <AuthPage setIsLoggedIn={setIsLoggedIn} />
                      ) : (
                        <IndiePledge userData={userData} />
                      )}
                    </div>
                  }
                />

                <Route
                  path="/certificate/:certificateUid"
                  element={
                    <div>
                      <IndieCertificate />
                    </div>
                  }
                />
              </Routes>

              <Footer />
            </div>
          ) : (
            <div className={"rootSup"}>
              <img
                src={
                  "https://res.cloudinary.com/ddb1evz5g/image/upload/v1689918515/SocialPledgeLogo_usyssj.png"
                }
                alt={"SocialPledgeLogo"}
              />

              <p className={"fiChild"}>There is some internal server issue.</p>

              <p className={"SecChild"}>Please try again in some time</p>
            </div>
          )}
        </LoadingScreen>
      </div>
    </Router>
  );
};

export default Original;
