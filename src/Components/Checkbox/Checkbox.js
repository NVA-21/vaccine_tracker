import React from "react";
import "./Checkbox.css";

const Checkbox = props => {
  return (
    <div className="checkBoxBase">
      <label className="check-color">
        <input type="checkbox" />
        <span className="change-color" />
      </label>
      <label className="check-label">{props.text}</label>
    </div>
  );
};

export default Checkbox;
