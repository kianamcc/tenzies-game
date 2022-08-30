import React from "react";
import "./Die.css";

const Die = (props) => {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF",
  };

  return (
    <div className="die">
      <div className="die-item" style={styles} onClick={props.holdDie}>
        <h2 className="die-num">{props.value}</h2>
      </div>
    </div>
  );
};

export default Die;
