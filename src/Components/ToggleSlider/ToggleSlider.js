import React from "react";
import "./ToggleSlider.css";

const ToggleSlider = () => {
  return (
    <div className="toggle">
      <input type="checkbox" />
      <label for="" className="pin">
        Search by PIN
      </label>
      <label for="" className="dist">
        Search by District
      </label>
    </div>
  );
};

export default ToggleSlider;
