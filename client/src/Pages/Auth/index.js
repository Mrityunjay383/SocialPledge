import React, { useState } from "react";
import "./index.css";
import Login from "../../Components/Login";
import Register from "../../Components/Register";

const AuthPage = ({ setIsLoggedIn, setIsLoading }) => {
  const [authToggle, setAuthToggle] = useState(false);

  return (
    <div>
      {/*Auth Section*/}
      <div className="auth">
        {!authToggle ? (
          <Login
            setAuthToggle={setAuthToggle}
            setIsLoggedIn={setIsLoggedIn}
            setIsLoading={setIsLoading}
          />
        ) : (
          <Register
            setAuthToggle={setAuthToggle}
            setIsLoggedIn={setIsLoggedIn}
            setIsLoading={setIsLoading}
          />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
