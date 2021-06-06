import React, { useState } from "react";
import "./Button.css";
import PropTypes from "prop-types";

export default function Button(props) {
  const [animate, setAnimate] = useState(false);

  function handleClick(e) {
    if (props.onClick) {
      props.onClick(e);
    }

    props.animate && setAnimate(!animate);
  }

  return (
    <button
      type="submit"
      className={animate ? "animate" : "default"}
      style={{
        background: props.background,
        borderRadius: props.borderRadius,
      }}
      onClick={(e) => handleClick(e)}
    >
      <span
        className="button_text"
        style={{ color: props.color, fontSize: props.fontSize }}
      >
        {props.text}
      </span>
    </button>
  );
}

Button.prototype = {
  animate: PropTypes.bool,
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  background: PropTypes.string,
  borderColor: PropTypes.string,
  borderRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Button.defaultProps = {
  animate: false,
};
