import "./App.css";
import React, { useEffect, useState } from "react";
import { fetchApiData, PUBLIC_IMAGE_PATH } from "./utils/Constants";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // console.log(Notification.permission);

    if (Notification.permission === "default") {
      // alert("do nothing");
      Notification.requestPermission();
    }

    // sendNotification();
  }, []);

  async function searchVaccineSlots(searchQuery) {
    if (searchQuery.length < 6) {
      return false;
    }
    const responseValue = await fetchApiData(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${searchQuery}&date=13-05-2021`
    );

    // Sending Push notification when vaccine center exists
    if (responseValue.sessions.length) {
      sendNotification();
    }
  }

  function sendNotification() {
    // alert("Notifcation");
    const notification = new Notification("New message");
  }

  return (
    <div className="App">
      <h1>COVID VACCINE TRACKER</h1>
      <label>Enter your Pincode:</label>
      <input
        style={{
          border: "3px solid",
          borderColor: searchQuery.length < 6 ? "red" : "blue",
        }}
        type="text"
        className="input"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        maxLength={6}
      />

      <div
        className="searchBtn"
        onClick={() => {
          searchVaccineSlots(searchQuery);
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
