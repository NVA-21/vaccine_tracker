import React from "react";
import "./Checkbox.css";

const Checkbox = props => {
  return (
    <>
      <label className="check-color">
        <input type="checkbox" />
        <span className="change-color" />
      </label>
      <label className="check-label">{props.text}</label>
    </>
  );
};

export default Checkbox;
