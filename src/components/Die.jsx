import React from "react";
import "./Die.css";

const Die = (props) => {
  return (
    <div className="die">
      <div className="die-item">
        <h2>{props.value}</h2>
      </div>
    </div>
  );
};

export default Die;
