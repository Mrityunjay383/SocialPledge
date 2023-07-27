import { ColorRing } from "react-loader-spinner";
import React from "react";

const Spinner = () => {
  return (
    <ColorRing
      visible={true}
      height="40"
      width="40"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={["#FF5A60", "#FF5A60", "#FF5A60", "#FF5A60", "#FF5A60"]}
    />
  );
};
export default Spinner;
