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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    user_id: "",
    name: "",
  });

  const valLogin = async () => {
    const res = await Auth.root();

    if (res.status === 200) {
      setUserData({
        user_id: res.data.user.user_id,
        name: res.data.user.name,
      });
      setIsLoggedIn(true);
    } else {
      setUserData({ user_id: "", name: "" });
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    valLogin();
  }, [isLoggedIn]);

  return (
    <Router>
      <div className="App">
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

          {/*Auth Route have Login Register */}
          <Route
            path="/auth"
            element={
              <div>
                <AuthPage setIsLoggedIn={setIsLoggedIn} />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
