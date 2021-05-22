import React, { useState } from "react";
import { PUBLIC_IMAGE_PATH } from "../../utils/Constants";
import "./Dropdown.css";

const Dropdown = props => {
  const [active, setActive] = useState(false);
  var arr = ["New Delhi", "Goa", "Maharashtra"];

  return (
    <div className="drop-cont">
      <div className="select-box">
        <div
          className={active ? "options-container-active" : "options-container"}
        >
          {arr.map((item, index) => (
            <div className="option" key={index}>
              <input type="radio" className="radio" id="admn" name="category" />
              <label for="automobile">{item}</label>
            </div>
          ))}
        </div>
        <div className="selected" onClick={() => setActive(!active)}>
          <h6>{props.text}</h6>
          <img src={PUBLIC_IMAGE_PATH + "downarrow.png"} />
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
