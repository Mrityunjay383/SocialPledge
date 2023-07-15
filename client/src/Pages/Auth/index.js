import React, { useState } from "react";
import Header from "../../Components/Header";
import "./index.css";
import Login from "../../Components/Login";
import Register from "../../Components/Register";

const AuthPage = () => {
  const [authToggle, setAuthToggle] = useState(false);

  return (
    <div>
      <Header />

      {/*Auth Section*/}
      <div className="auth">
        {!authToggle ? (
          <Login setAuthToggle={setAuthToggle} />
        ) : (
          <Register setAuthToggle={setAuthToggle} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
