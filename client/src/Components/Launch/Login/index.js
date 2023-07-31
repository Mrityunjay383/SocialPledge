import React, { useState } from "react";
import { toast } from "react-toastify";
import "./index.css";

const LaunchLogin = ({ setIsLoggedIn }) => {
  const [password, setPassword] = useState("");

  const loginSubmit = async () => {
    if (password === "SocialPledge@launch0101") {
      toast.success("Login Successful");

      setIsLoggedIn(true);
    } else {
      toast.error("Incorrect Password!!");
    }
  };

  return (
    <div className="launchCon">
      <div className="card">
        <div>
          <input
            type="password"
            id="password"
            placeholder="Enter the password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button className={"launchBtn"} onClick={loginSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LaunchLogin;
