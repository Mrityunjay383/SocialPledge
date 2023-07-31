import React from "react";
import "./index.css";

const CtaBtn = ({ Text, fontSize, onClick, className }) => {
  return (
    <button
      className={`button-3d ${className}`}
      style={{ fontSize: `${fontSize}px` }}
      onClick={onClick}
    >
      {Text}
    </button>
  );
};

export default CtaBtn;
