import React, { useState } from "react";
import CtaBtn from "../../Components/Original/CtaBtn";
import { toast } from "react-toastify";
import { Auth } from "../../service";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

const HybridAuth = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [loginFormData, setLoginFormData] = useState({
    mobNo: "",
    otp: "",
    name: "",
  });

  const [btnClick, setBtnClick] = useState(false);
  const [formState, setFormState] = useState("OTP");
  const [userExist, setUserExist] = useState(false);
  const [user_id, setUser_id] = useState("");

  const authSubmit = async () => {
    console.log(`#20232301307430 formState`, formState);

    if (formState === "OTP") {
      if (loginFormData.mobNo.length === 10) {
        setBtnClick(true);

        const res = await Auth.opt({
          mobNo: loginFormData.mobNo,
        });

        console.log(`#2023230123242368 res.data`, res.data);

        toast.dismiss();
        if (res.status === 200) {
          setFormState("Auth");
          toast.success("OTP Sent Successful!!");
          setUserExist(res.data.userExist);
          setUser_id(res.data.user_id);
        } else {
          toast.error(res.data);
        }
        setBtnClick(false);
      } else {
        toast.error("Please Provide Correct Mobile Number");
      }
    } else if (formState === "Auth") {
      if (loginFormData.otp.length === 4) {
        if (!userExist) {
          if (loginFormData.name === "") {
            return toast.error("Please provide your name!");
          }
        }

        toast.success("Verification in progress, please wait...");

        const res = await Auth.register({ ...loginFormData, user_id });

        toast.dismiss();
        if (res.status === 200) {
          setIsLoggedIn(true);

          toast.success("Verification Done!");
          navigate(-1);
        } else {
          toast.error(res.data);
        }
      } else {
        toast.error("Please Fill Correct OTP");
      }
    }
  };

  const keyPress = async (e) => {
    if (e.key === "Enter") {
      authSubmit();
    }
  };

  return (
    <div className="auth">
      <div id="loginCon" className="login-box">
        <h2>Verify</h2>
        <div>
          <div className="user-box">
            <input
              type="number"
              onKeyDown={keyPress}
              disabled={formState === "Auth"}
              onChange={(e) => {
                setLoginFormData((curr) => {
                  return { ...curr, mobNo: e.target.value };
                });
              }}
            />
            <label className={loginFormData.mobNo !== "" && "upLabel"}>
              Mobile Number
            </label>
          </div>

          {formState === "Auth" && (
            <div className="user-box">
              <input
                type="number"
                onKeyDown={keyPress}
                onChange={(e) => {
                  setLoginFormData((curr) => {
                    return { ...curr, otp: e.target.value };
                  });
                }}
              />
              <label className={loginFormData.otp !== "" && "upLabel"}>
                OTP
              </label>
            </div>
          )}

          {formState === "Auth" && !userExist && (
            <div className="user-box">
              <input
                type="test"
                onKeyDown={keyPress}
                onChange={(e) => {
                  setLoginFormData((curr) => {
                    return { ...curr, name: e.target.value };
                  });
                }}
              />
              <label className={loginFormData.name !== "" && "upLabel"}>
                Name
              </label>
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
            <CtaBtn
              Text={formState === "OTP" ? "Send OTP" : "Submit"}
              fontSize={16}
              onClick={authSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HybridAuth;
