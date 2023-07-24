import React from "react";

import Original from "./Domains/Original";
import SupporterSec from "./Domains/Supporter";

function App() {
  if (window.location.host.split(".")[0] === "supporter") {
    return <SupporterSec />;
  } else {
    return <Original />;
  }
}

export default App;
