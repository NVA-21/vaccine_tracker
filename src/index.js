import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ProfileCard from "./Components/Name Card/profilecard";

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <div className="team-container">
      <ProfileCard
        path="PIC.png"
        name="Nikhil Singh Payaal"
        designation="UI/UX Designer"
        github="https://github.com/arunsamuel08"
        linkedin="https://www.linkedin.com/in/arunsamuel08/"
        mail="mailto:arun.samuel08@gmail.com"
      />
      <ProfileCard
        path="vishakh.png"
        name="G. Vishakh"
        designation="Fullstack Developer"
        github="https://github.com/arunsamuel08"
        linkedin="https://www.linkedin.com/in/arunsamuel08/"
        mail="mailto:arun.samuel08@gmail.com"
      />
      <ProfileCard
        path="arunphoto.png"
        name="Arun Saji Samuel"
        designation="Front End Developer"
        github="https://github.com/arunsamuel08"
        linkedin="https://www.linkedin.com/in/arunsamuel08/"
        mail="mailto:arun.samuel08@gmail.com"
      />
    </div> */}
  </React.StrictMode>,
  document.getElementById("root")
);
