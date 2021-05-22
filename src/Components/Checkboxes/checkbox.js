import React from 'react';
import "./checkbox.css"

const Checkbox = (props) => {
  return(
    <div>
    <label className="check-color">
      <input type='checkbox' />
      <span className="change-color" />
    </label>
    <label className="check-label">{props.text}</label>
    </div>
  )
}

export default Checkbox