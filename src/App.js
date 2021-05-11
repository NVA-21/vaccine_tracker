import "./App.css";
import React, { useEffect, useState } from "react";
import { fetchApiData, PUBLIC_IMAGE_PATH } from "./utils/Constants";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pinCode, setPinCode] = useState("");

  // useEffect(() => {
  //   console.log("useEffect Called");
  //   searchVaccineSlots("110031");
  //   // sendNotification();
  // }, [pinCode]);

  async function searchVaccineSlots(searchQuery) {
    const responseValue = await fetchApiData(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${searchQuery}&date=13-05-2021`
    );
    console.log(responseValue.sessions);
    // Sending Push notification when vaccine center exists
    if (responseValue.sessions.length) {
      sendNotification();
    }
  }

  function sendNotification() {
    console.log("Notification sent");
    alert("Notifcation");
  }

  console.log(searchQuery);
  return (
    <div className="App">
      <input
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
        <image src={PUBLIC_IMAGE_PATH + "search.svg"} />
      </div>
    </div>
  );
}

export default App;
