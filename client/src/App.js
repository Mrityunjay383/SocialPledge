import React from "react";

import Original from "./Domains/Original";
import Supporter from "./Domains/Supporter";

function App() {
  if (window.location.host.split(".")[0] === "supporter") {
    return <Supporter />;
  } else {
    return <Original />;
  }
}

export default App;
