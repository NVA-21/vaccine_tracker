import "./App.css";
import React, { useState } from "react";
import { fetchApiData, PUBLIC_IMAGE_PATH } from "./utils/Constants";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pinCode, setPinCode] = useState("");

  async function searchVaccineSlots(searchQuery) {
    const responseValue = await fetchApiData(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${searchQuery}&date=13-05-2021`
    );

    // Sending Push notification when vaccine center exists
    if (responseValue.sessions.length) {
      sendNotification();
    }
  }

  function sendNotification() {
    alert("Notifcation");
  }

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
