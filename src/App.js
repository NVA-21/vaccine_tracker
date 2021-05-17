import "./App.css";
import React, { useState } from "react";
import {
  fetchApiData,
  NUMBER_REGEX,
  PUBLIC_IMAGE_PATH,
  getDate,
} from "./utils/Constants";
import useInterval from "./utils/useInterval";

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
    <div className="App">
      {/* <h1>COVID VACCINE TRACKER</h1> */}
      <div className="brandLogo">
        <img src={PUBLIC_IMAGE_PATH + "logo-title.svg"} />
      </div>
      <label>Enter your Pincode:</label>
      <input
        style={{
          border: "3px solid",
          borderColor: inputError && "red",
        }}
        type="text"
        className="input"
        value={input}
        onChange={(e) => {
          handleInput(e.target.value);
        }}
        maxLength={6}
      />

      <div
        className="searchBtn"
        onClick={() => {
          handleSearch();
        }}
      >
        <img src={PUBLIC_IMAGE_PATH + "search.svg"} alt="Search" />
      </div>
      <p>
        This app will send you a notification as soon as there is a slot
        available in your area.
      </p>
    </div>
  );
}

export default App;
