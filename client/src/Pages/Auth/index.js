import React from "react";
import Header from "../../Components/Header";
import "./index.css";

const AuthPage = () => {
  return (
    <div>
      <Header />

      {/*Auth Section*/}
      <div className="auth">
        {/*Login Section*/}
        <div id="loginCon" className="login-box">
          <h2>Login</h2>
          <form>
            <div className="user-box">
              <input type="number" />
              <label>Mobile Number</label>
            </div>
            <div className="user-box">
              <input type="password" />
              <label>Password</label>
            </div>
            <a href="#">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </a>

            <p className="shift">
              Don't have an account, <span>Register here &rarr;</span>
            </p>
          </form>
        </div>

        {/*Register section*/}
        <div id="regCon" className="login-box register-box unShow">
          <h2>Register</h2>
          <form>
            <div className="user-box">
              <input type="text" name="" required="" />
              <label>Full Name</label>
            </div>
            <div className="user-box">
              <input type="number" name="" required="" />
              <label>Mobile Number</label>
            </div>

            <div className="user-box regAfterInp unShow">
              <input type="number" name="" required="" />
              <label>OTP</label>
            </div>
            <div className="user-box regAfterInp unShow">
              <input type="password" name="" required="" />
              <label>Password</label>
            </div>
            <div className="user-box regAfterInp unShow">
              <input type="password" name="" required="" />
              <label>Confirm Password</label>
            </div>
            <a id="otpBtn" href="#">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Send Otp
            </a>

            <p className="shift">
              Already have an account, <span>Login here &rarr;</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
