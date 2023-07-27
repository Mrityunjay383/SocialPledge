import React, { useState } from "react";
import CtaBtn from "../CtaBtn";
import { Auth } from "../../../service";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

const Register = ({ setAuthToggle, setIsLoggedIn }) => {
  const { pledgeName } = useParams();

  const navigate = useNavigate();

  const [regBtnText, srtRegBtnText] = useState("Send OTP");

  const [generatedOtp, setGeneratedOtp] = useState(0);
  const [regFormData, setRegFormData] = useState({
    name: "",
    mobNo: "",
    otp: "",
    password: "",
  });

  const [btnClick, setBtnClick] = useState(false);
  const regSubmit = async () => {
    if (regBtnText === "Send OTP") {
      if (regFormData.name === "") {
        return toast.error("Please enter your full name");
      }
      if (regFormData.mobNo === "" || regFormData.mobNo.length < 10) {
        toast.error("Please enter your correct Mobile Number");
      } else {
        setBtnClick(true);
        const res = await Auth.opt({ mobNo: regFormData.mobNo });

        if (res.status === 200) {
          toast.success("OTP Sent successfully!!!");
          setGeneratedOtp(res.data.otp);
          srtRegBtnText("Submit");
        } else {
          toast.error(res.data);
        }
        setBtnClick(false);
      }
    } else {
      if (regFormData.name !== "" && regFormData.password !== "") {
        if (regFormData.otp === generatedOtp) {
          setBtnClick(true);
          toast.success("Registration in progress, please wait!");

          const res = await Auth.register({
            name: regFormData.name,
            mobNo: regFormData.mobNo,
            password: regFormData.password,
          });

          toast.dismiss();
          if (res.status === 200) {
            setIsLoggedIn(true);
            toast.success("Account Created Successfully!!!");
            if (pledgeName) {
              navigate(`/pledge/${pledgeName}`);
            } else {
              navigate("/");
            }
          } else {
            toast.error(res.data);
            setBtnClick(false);
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

        {btnClick ? (
          <ColorRing
            visible={true}
            height="40"
            width="40"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#FF5A60", "#FF5A60", "#FF5A60", "#FF5A60", "#FF5A60"]}
          />
        ) : (
          <CtaBtn Text={regBtnText} fontSize={16} onClick={regSubmit} />
        )}

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
