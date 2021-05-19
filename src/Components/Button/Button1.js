import React from "react";
import "./Button1.css";

window.onload = function () {
  const btn = document.querySelector(".get_notified");
  btn.addEventListener("click", () => {
    btn.classList.toggle("loading");
  });
};

const Button1 = () => {
  return (
    <div className="button1">
      <button1 type="submit" className="get_notified">
        <span className="button1_text">Get Notified</span>
      </button1>
    </div>
  );
};

export default Button1;
