import React from "react";
import "./ToggleSlider.css";

const ToggleSlider = () => {
  return (
    <div class="toggle">
      <input
        type="radio"
        name="sizeBy"
        value="weight"
        id="sizeWeight"
        checked="checked"
      />
      <label for="sizeWeight">Search by PIN</label>
      <input
        type="radio"
        name="sizeBy"
        value="dimensions"
        id="sizeDimensions"
      />
      <label for="sizeDimensions">Search by District</label>
    </div>
  );
};

export default ToggleSlider;
