import React from 'react';
import "./Switch.css"

const Switch = () => {
  return <label className="switch">
          <input type='checkbox'/>
          <span className="slider" />
         </label>
}

export default Switch