import React from "react";

import Original from "./Domains/Original";
import SupporterSec from "./Domains/Supporter";
import Launch from "./Domains/Launch";

function App() {
  if (window.location.host.split(".")[0] === "supporter") {
    return <SupporterSec />;
  } else if (window.location.host.split(".")[0] === "launch") {
    return <Launch />;
  } else {
    return <Original />;
  }
}

export default App;
