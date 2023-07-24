import React from "react";
import "./index.css";

const CtaBtn = ({ Text, fontSize, onClick }) => {
  return (
    <button
      className="button-3d"
      style={{ fontSize: `${fontSize}px` }}
      onClick={onClick}
    >
      {Text}
    </button>
  );
};

export default CtaBtn;
