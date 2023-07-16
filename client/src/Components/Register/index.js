import React, { useState } from "react";
import CtaBtn from "../CtaBtn";
import { Auth } from "../../service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = ({ setAuthToggle, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [regBtnText, srtRegBtnText] = useState("Send OTP");

  const [generatedOtp, setGeneratedOtp] = useState(0);
  const [regFormData, setRegFormData] = useState({
    name: "",
    mobNo: "",
    otp: "",
    password: "",
  });

  const regSubmit = async () => {
    if (regBtnText === "Send OTP") {
      if (regFormData.mobNo === "" || regFormData.mobNo.length < 10) {
        toast.error("Please enter your correct Mobile Number");
      } else {
        const res = await Auth.opt({ mobNo: regFormData.mobNo });

        if (res.status === 200) {
          toast.success("OTP Sent successfully!!!");
          setGeneratedOtp(res.data.otp);
          srtRegBtnText("Submit");
        } else {
          toast.error(res.data);
        }
      }
    } else {
      if (regFormData.name !== "" && regFormData.password !== "") {
        if (regFormData.otp === generatedOtp) {
          const res = await Auth.register({
            name: regFormData.name,
            mobNo: regFormData.mobNo,
            password: regFormData.password,
          });

          if (res.status === 200) {
            toast.success("Account Created Successfully!!!");
            setIsLoggedIn(true);
            navigate("/");
          } else {
            toast.error(res.data);
          }
        } else {
          toast.error("Invalid OTP!!");
        }
      } else {
        toast.error("All Fields are required!!");
      }
    }
  };

  return (
    <div className="login-box register-box">
      <h2>Register</h2>
      <div>
        <div className="user-box">
          <input
            type="text"
            onChange={(e) => {
              setRegFormData((curr) => {
                return { ...curr, name: e.target.value };
              });
            }}
          />
          <label>Full Name</label>
        </div>
        <div className="user-box">
          <input
            type="number"
            onChange={(e) => {
              setRegFormData((curr) => {
                return { ...curr, mobNo: e.target.value };
              });
            }}
          />
          <label>Mobile Number</label>
        </div>

        {regBtnText === "Submit" && (
          <div>
            <div className="user-box">
              <input
                type="number"
                onChange={(e) => {
                  setRegFormData((curr) => {
                    return { ...curr, otp: e.target.value };
                  });
                }}
              />
              <label>OTP</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                onChange={(e) => {
                  setRegFormData((curr) => {
                    return { ...curr, password: e.target.value };
                  });
                }}
              />
              <label>Password</label>
            </div>
            {/*<div className="user-box">*/}
            {/*  <input type="password" />*/}
            {/*  <label>Confirm Password</label>*/}
            {/*</div>*/}
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
