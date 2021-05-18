import React from 'react';
import "./Button.css"

window.onload=function(){
  const btn = document.querySelector(".get_notified");
  btn.addEventListener('click', () => {
  btn.classList.toggle('loading')
})
}


const Button = () => {
  return(
    <div className="button">
      <button type="submit" className="get_notified">
        <span className="button_text">Get Notified</span>
      </button>
    </div>
  )
}

export default Button