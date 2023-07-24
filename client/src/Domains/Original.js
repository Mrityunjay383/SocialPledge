import React, { useEffect, useState } from "react";
import "../App.css";

//importing Router functionality
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingScreen from "react-loading-screen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Auth } from "../service";
import Home from "../Pages/Home";
import AuthPage from "../Pages/Auth";
import Header from "../Components/Header";
import IndiePledge from "../Pages/IndiePlege";
import About from "../Pages/About";
import Footer from "../Components/Footer";

const Original = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    user_id: "",
    name: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  const valLogin = async () => {
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

            {/* Indie Pledge Route*/}
            <Route
              path="/pledge/:pledgeId"
              element={
                <div>
                  {!isLoggedIn ? (
                    <AuthPage
                      setIsLoggedIn={setIsLoggedIn}
                      setIsLoading={setIsLoading}
                    />
                  ) : (
                    <IndiePledge
                      userData={userData}
                      setIsLoading={setIsLoading}
                    />
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

export default Original;
