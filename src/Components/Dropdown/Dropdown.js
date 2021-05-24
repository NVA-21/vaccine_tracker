import React, { useState } from "react";
import { PUBLIC_IMAGE_PATH } from "../../utils/Constants";
import "./Dropdown.css";

const Dropdown = props => {
  const [active, setActive] = useState(false);
  // var arr = ["New Delhi", "Goa", "Maharashtra"];
  let arr = [];
  if (props.array) {
    arr = props.array;
  }

  return (
    <div className="drop-cont">
      <div className="select-box">
        <div
          className={active ? "options-container-active" : "options-container"}
        >
          {arr.map((item, index) => (
            <div className="option" key={index}>
              <input type="radio" className="radio" id="admn" name="category" />
              <label htmlFor="automobile">{item[props.keyValue]}</label>
            </div>
          ))}
        </div>

        <div className="selected" onClick={() => setActive(!active)}>
          <h6>{props.title}</h6>
          <img src={PUBLIC_IMAGE_PATH + "downarrow.png"} alt="v" />
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
