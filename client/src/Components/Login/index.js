import React from "react";
import CtaBtn from "../CtaBtn";

const Login = ({ setAuthToggle }) => {
  return (
    <div id="loginCon" className="login-box">
      <h2>Login</h2>
      <div>
        <div className="user-box">
          <input type="number" />
          <label>Mobile Number</label>
        </div>
        <div className="user-box">
          <input type="password" />
          <label>Password</label>
        </div>
        <CtaBtn Text={"Login"} fontSize={16} />

        <p className="shift">
          Don't have an account,{" "}
          <span
            onClick={() => {
              setAuthToggle(true);
            }}
          >
            Register here &rarr;
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
