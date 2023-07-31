import React, { useState } from "react";
import LaunchLogin from "../Components/Launch/Login";
import { ToastContainer } from "react-toastify";
import Rocket from "../Components/Launch/Rocket";

const Launch = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <ToastContainer />

      {!isLoggedIn ? <LaunchLogin setIsLoggedIn={setIsLoggedIn} /> : <Rocket />}
    </div>
  );
};

export default Launch;
