import React, { useEffect, useState } from "react";
import "./App.css";

//importing Router functionality
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth } from "./service";
import Home from "./Pages/Home";
import AuthPage from "./Pages/Auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const valLogin = async () => {
    const res = await Auth.root();

    if (res.status === 200) {
      setUserData(res.data.user);
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    // valLogin();
  }, []);

  return (
    <Router>
      <div className="App">
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
                <AuthPage />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
