import React, { useState } from "react";
import CtaBtn from "../CtaBtn";
import { toast } from "react-toastify";
import { Auth } from "../../service";
import { useNavigate, useParams } from "react-router-dom";

const Login = ({ setAuthToggle, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const { pledgeId } = useParams();

  const [loginFormData, setLoginFormData] = useState({
    mobNo: "",
    password: "",
  });

  const loginSubmit = async () => {
    if (loginFormData.mobNo !== "" && loginFormData.password !== "") {
      toast.success("Login in progress, please wait!");

      const res = await Auth.login({
        mobNo: loginFormData.mobNo,
        password: loginFormData.password,
      });

      toast.dismiss();
      if (res.status === 200) {
        setIsLoggedIn(true);
        toast.success("Login Successful!!");
        if (pledgeId) {
          navigate(`/pledge/${pledgeId}`);
        } else {
          navigate("/");
        }
      } else {
        toast.error(res.data);
      }
    } else {
      toast.error("Please Provide all details");
    }
  };

  return (
    <div id="loginCon" className="login-box">
      <h2>Login</h2>
      <div>
        <div className="user-box">
          <input
            type="number"
            onChange={(e) => {
              setLoginFormData((curr) => {
                return { ...curr, mobNo: e.target.value };
              });
            }}
          />
          <label>Mobile Number</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            onChange={(e) => {
              setLoginFormData((curr) => {
                return { ...curr, password: e.target.value };
              });
            }}
          />
          <label>Password</label>
        </div>
        <CtaBtn Text={"Login"} fontSize={16} onClick={loginSubmit} />

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
