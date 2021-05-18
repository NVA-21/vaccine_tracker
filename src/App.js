import "./App.css";
import React, { useState } from "react";
import {
  fetchApiData,
  NUMBER_REGEX,
  PUBLIC_IMAGE_PATH,
  getDate,
} from "./utils/Constants";
import useInterval from "./utils/useInterval";
import Footer from "./Components/Footer/Footer";
// import ToggleSlider from "./Components/ToggleSlider/ToggleSlider";
import SlotCard from "./Components/SlotsCard/SlotsCard";

function App() {
  // Input values
  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState(false);

  //pincodes value when search btn clicked
  const [searchQuery, setSearchQuery] = useState("");
  // Starts to fetch from api only if pincode entered is valid.
  const [apiFetching, setApiFetching] = useState(false);
  // Keeps track whether notification prev sent or not
  const [notificationSent, setNotificationSent] = useState(false);

  // Storing api data
  const [data, setData] = useState({});

  useInterval(async () => {
    if (apiFetching) {
      // `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${input}&date=16-05-2021`
      // const date = "17-05-2021";
      const date = getDate();
      console.log(date);
      const responseValue = await fetchApiData(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${searchQuery}&date=${date}`
      );
      console.log(responseValue);

      // let result = responseValue.centers.filter((center) =>
      //   center.sessions.some((c) => c.available_capacity > 0)
      // );
      // console.log(result);

      // handleNotification();
    }
  }, 3000);

  function handleNotification() {
    // Sending notif first time
    if (!notificationSent) {
      console.log("Notif SEND BOII");
      setNotificationSent(true);
      sendNotification(
        "Hurry Up Vaccination available",
        "Click me to reach COWIN site"
      );
    }
  }

  function sendNotification(title, body) {
    const notification = new Notification(title, {
      icon: PUBLIC_IMAGE_PATH + "logo.png",
      body: body,
    });

    notification.onclick = () => window.open("https://www.cowin.gov.in/home");
  }

  function handleInput(value) {
    if (NUMBER_REGEX.test(value) || value === "") {
      setInput(value);
    }
  }

  function handleSearch() {
    if (input.length < 6) {
      setInputError(true);
      return false;
    }

    // Disabling inputError
    setInputError(false);

    // Setting input value as Search Query value
    setSearchQuery(input);

    // To start the api call
    setApiFetching(true);
  }

  return (
    <div
      className="App"
      // style={{
      //   background: `url(${PUBLIC_IMAGE_PATH}background.png)`,
      //   backgroundRepeat: "no-repeat",
      //   backgroundPosition: "right -100px bottom",
      // }}
    >
      <div className="contentContainers">
        <div className="leftContainer">
          <img
            src={PUBLIC_IMAGE_PATH + "logo-title.png"}
            className="brandLogo"
          />

          <h1 className="mainHead">
            Get Notified when your <br />
            area has a slots availability.
          </h1>
          {/* <ToggleSlider /> */}

          <div className="inputContainer">
            <input
              placeholder="Enter your Pincode"
              type="text"
              className="input"
              value={input}
              onChange={(e) => {
                handleInput(e.target.value);
              }}
              maxLength={6}
            />

            <img
              src={PUBLIC_IMAGE_PATH + "search.svg"}
              className="searchIcon"
              alt=""
              width={22}
              height={23}
            />
          </div>

          {/* <div
            className="searchBtn"
            onClick={() => {
              handleSearch();
            }}
          ></div> */}
        </div>

        <div className="rightContainer">
          <div className="slotsContainer">
            <h4>SLOTS AVAILABLE</h4>

            <SlotCard />
            <SlotCard />
            <SlotCard />
            <SlotCard />
            {/* <SlotCard /> */}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
