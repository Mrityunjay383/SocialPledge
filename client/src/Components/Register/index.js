import React, { useState } from "react";
import CtaBtn from "../CtaBtn";

const Register = ({ setAuthToggle }) => {
  const [regBtnText, srtRegBtnText] = useState("Send OTP");

  const regSubmit = () => {
    if (regBtnText === "Send OTP") {
      srtRegBtnText("Submit");
    } else {
    }
  };

  return (
    <div className="login-box register-box">
      <h2>Register</h2>
      <div>
        <div className="user-box">
          <input type="text" />
          <label>Full Name</label>
        </div>
        <div className="user-box">
          <input type="number" />
          <label>Mobile Number</label>
        </div>

        {regBtnText === "Submit" && (
          <div>
            <div className="user-box">
              <input type="number" />
              <label>OTP</label>
            </div>
            <div className="user-box">
              <input type="password" />
              <label>Password</label>
            </div>
            <div className="user-box">
              <input type="password" />
              <label>Confirm Password</label>
            </div>
          </div>
        )}

        <CtaBtn Text={regBtnText} fontSize={16} onClick={regSubmit} />

        {/*< id="otpBtn" href="#">*/}
        {/*  <span></span>*/}
        {/*  <span></span>*/}
        {/*  <span></span>*/}
        {/*  <span></span>*/}
        {/*  {regBtnText}*/}
        {/*</>*/}

        <p className="shift">
          Already have an account,{" "}
          <span
            onClick={() => {
              setAuthToggle(false);
            }}
          >
            Login here &rarr;
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
