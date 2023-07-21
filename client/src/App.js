import React, { useEffect, useState } from "react";
import "./App.css";

//importing Router functionality
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth } from "./service";
import Home from "./Pages/Home";
import AuthPage from "./Pages/Auth";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Components/Header";
import IndiePledge from "./Pages/IndiePlege";
import About from "./Pages/About";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    user_id: "",
    name: "",
  });

  const [isAuthDone, setIsAuthDone] = useState(false);

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

    await setIsAuthDone(true);
  };

  useEffect(() => {
    valLogin();
  }, [isLoggedIn]);

  return (
    <Router>
      <div className="App">
        <ToastContainer />

        {isAuthDone && (
          <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        )}

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
                {isAuthDone &&
                  (!isLoggedIn ? (
                    <AuthPage setIsLoggedIn={setIsLoggedIn} />
                  ) : (
                    <IndiePledge userName={userData.name} />
                  ))}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
