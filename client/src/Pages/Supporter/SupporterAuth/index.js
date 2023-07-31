import React, { useState } from "react";
import { toast } from "react-toastify";
import { Supporter } from "../../../service";
import { ColorRing } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import "./index.css";

const SupporterAuth = () => {
  const { supporterUserName } = useParams();

  const [password, setPassword] = useState("");

  const [btnClick, setBtnClick] = useState(false);
  const loginSubmit = async () => {
    if (!supporterUserName) {
      return toast.error("UserName Not Found!!");
    }

    if (password !== "") {
      setBtnClick(true);
      toast.success("Login in progress, please wait!");

      const res = await Supporter.login({
        userName: supporterUserName,
        password: password,
      });

      toast.dismiss();
      if (res.status === 200) {
        window.location = window.location.href;
        toast.success("Login Successful!!");
      } else {
        toast.error(res.data);
        setBtnClick(false);
      }
    } else {
      toast.error("Please provide a password");
    }
  };

  return (
    <div className="authCon">
      <div className="card">
        <h2>Welcome, {supporterUserName}</h2>
        <div>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                loginSubmit();
              }
            }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

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
            <button className={"authBtn"} onClick={loginSubmit}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupporterAuth;
