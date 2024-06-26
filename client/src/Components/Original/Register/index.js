import React, { useState } from "react";
import CtaBtn from "../CtaBtn";
import { Auth } from "../../../service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

const Register = ({ setAuthToggle, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [regBtnText, srtRegBtnText] = useState("Send OTP");

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
          srtRegBtnText("Submit");
        } else {
          toast.error(res.data);
        }
        setBtnClick(false);
      }
    } else {
      if (regFormData.name !== "" && regFormData.password !== "") {
        setBtnClick(true);
        toast.success("Registration in progress, please wait!");

        const res = await Auth.register({
          name: regFormData.name,
          mobNo: regFormData.mobNo,
          password: regFormData.password,
          otp: regFormData.otp,
        });

        toast.dismiss();
        if (res.status === 200) {
          setIsLoggedIn(true);
          toast.success("Account Created Successfully!!!");
          navigate(-1);
        } else {
          toast.error(res.data);
          setBtnClick(false);
        }
      } else {
        toast.error("All Fields are required!!");
      }
    }
  };

  const keyPress = async (e) => {
    if (e.key === "Enter") {
      regSubmit();
    }
  };

  return (
    <div className="login-box register-box">
      <h2>Register</h2>
      <div>
        <div className="user-box">
          <input
            type="text"
            onKeyDown={keyPress}
            onChange={(e) => {
              setRegFormData((curr) => {
                return { ...curr, name: e.target.value };
              });
            }}
            disabled={regBtnText === "Submit"}
          />
          <label className={regFormData.name !== "" && "upLabel"}>
            Full Name
          </label>
        </div>
        <div className="user-box">
          <input
            type="number"
            onKeyDown={keyPress}
            onChange={(e) => {
              setRegFormData((curr) => {
                return { ...curr, mobNo: e.target.value };
              });
            }}
            disabled={regBtnText === "Submit"}
          />
          <label className={regFormData.mobNo !== "" && "upLabel"}>
            Mobile Number
          </label>
        </div>

        {regBtnText === "Submit" && (
          <div>
            <div className="user-box">
              <input
                type="number"
                onKeyDown={keyPress}
                onChange={(e) => {
                  setRegFormData((curr) => {
                    return { ...curr, otp: e.target.value };
                  });
                }}
              />
              <label className={regFormData.otp !== "" && "upLabel"}>OTP</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                onKeyDown={keyPress}
                onChange={(e) => {
                  setRegFormData((curr) => {
                    return { ...curr, password: e.target.value };
                  });
                }}
              />
              <label className={regFormData.password !== "" && "upLabel"}>
                Password
              </label>
            </div>
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
