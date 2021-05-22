import "./App.css";
import React, { useEffect, useState } from "react";
import {
  fetchApiData,
  NUMBER_REGEX,
  PUBLIC_IMAGE_PATH,
  getDate,
} from "./utils/Constants";
import useInterval from "./utils/useInterval";
import Footer from "./Components/Footer/Footer";
import ToggleSlider from "./Components/ToggleSlider/ToggleSlider";
import SlotCard from "./Components/SlotsCard/SlotsCard";
import Button from "./Components/Button/Button";
import MaxWidthWrapper from "./Components/MaxWidthWrapper/MaxWidthWrapper";
import { borderRadius, primaryColor } from "./utils/Theme";
import Checkbox from "./Components/Checkboxes/checkbox";
import HelpModal from "./Components/HelpModal/HelpModal";
import Dropdown from "./Components/Dropdown/Dropdown";

function App() {
  const [searchMode, setSearchMode] = useState("pincode");

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
  const [data, setData] = useState([]);

  // Modal opening.
  const [isOpen, setisOpen] = useState(false);

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    if (Notification.permission === "denied") {
      // alert("Notification permission is denied in your system");
    }

    Notification.requestPermission();
  }, []);

  useInterval(async () => {
    if (apiFetching) {
      // const date = "17-05-2021";
      const date = getDate();
      // console.log(date);

      if (searchMode === "pincode") {
        const responseValue = await fetchApiData(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${searchQuery}&date=${date}`
        );
        // console.log(responseValue);

        const filtered = await responseValue.centers.map(center => ({
          ...center,
          sessions: center.sessions.filter(
            session => session.available_capacity > 0
          ),
        }));

        const finalResult = filtered.filter(
          center => center.sessions.length > 0
        );

        if (finalResult.length > 0 && !notificationSent) {
          // if atleast one center pops up
          handleNotification();
        } else if (JSON.stringify(finalResult) !== JSON.stringify(data)) {
          // If new center arives or new slot date
          setNotificationSent(false);
          handleNotification();
        }
        console.log(JSON.stringify(finalResult) === JSON.stringify(data));

        setData(finalResult);
      }
    }
  }, 3000);

  function handleNotification() {
    // Sending notif first time
    if (!notificationSent) {
      console.log("Notif SEND BOII");
      setNotificationSent(true);
      sendNotification(
        "Hurry Up New Vaccination Center just available",
        "Open the tab see the Center"
      );
    }
  }

  function sendNotification(title, body) {
    new Notification(title, {
      icon: PUBLIC_IMAGE_PATH + "logo.png",
      body: body,
    });

    // notification.onclick = () => window.open("http://localhost:3000/");
  }

  function handleInput(value) {
    if (NUMBER_REGEX.test(value) || value === "") {
      setInput(value);
    }
  }

  function handleSearch() {
    // If not searching from API
    if (!apiFetching) {
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

      // just for build purpose delete later
      setSearchMode(searchMode);
    }
    // To cancel the api call
    else {
      setApiFetching(false);
    }
  }
  console.log(data);
  return (
    <div
      className="App"
      // style={{
      //   background: `url(${PUBLIC_IMAGE_PATH}background.png)`,
      //   backgroundRepeat: "no-repeat",
      //   backgroundPosition: "right 20% bottom",
      // }}
    >
      <div className="backgroundCircle"></div>
      <MaxWidthWrapper>
        <div className="contentContainers">
          <div className="leftContainer">
            <img
              src={PUBLIC_IMAGE_PATH + "logo-title.png"}
              className="brandLogo"
              alt="COVID VACCINE TRACKER"
            />

            <h1 className="mainHead">
              Get Notified when your <br />
              area has a slots availability.
            </h1>

            <ToggleSlider />

            <div
              className="inputContainer"
              style={{
                border: inputError && `1px solid red`,
                borderRadius: borderRadius,
              }}
            >
              <input
                placeholder="Enter your Pincode"
                type="text"
                className="input"
                value={input}
                onChange={e => {
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

            <div className="toggle-pin-dist">
              <Dropdown text="Select State" />
              <Dropdown text="Select District" />
            </div>

            <div className="checklists">
              <div className="checklist1">
                <Checkbox text="18-44" />
                <Checkbox text="45+" />
                <Checkbox text="Free" />
                <Checkbox text="Paid" />
              </div>
              <div className="checklist2">
                <Checkbox text="Covaxin" />
                <Checkbox text="Covishield" />
                <Checkbox text="Sputnik V" />
              </div>
            </div>
            <div className="btnContainer">
              {/* <div className="helpBtn"> */}
              <Button
                text="Need Help?"
                background={"#fff"}
                color={primaryColor}
                borderRadius={borderRadius}
                onClick={() => setisOpen(true)}
              />
              <HelpModal open={isOpen} onclose={() => setisOpen(false)} />

              {/* </div> */}
              {/* <div className="searchBtn"> */}
              <Button
                text="Get Notified"
                borderRadius={borderRadius}
                animate={true}
                onClick={() => {
                  handleSearch();
                }}
              />
              {/* </div> */}
            </div>
          </div>

          <div className="rightContainer">
            <div className="slotsContainer">
              <h4>SLOTS AVAILABLE</h4>
              <div className="slotsContainerScrollbar">
                {data.map((center, index) => (
                  <div className="slotCard" key={index}>
                    <SlotCard data={center} />
                  </div>
                ))}
              </div>
            </div>
            <div className="registerContainer">
              <h3 className="registerContainer-head">Register through</h3>
              <a
                href="https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en_IN&gl=US"
                target="blank"
              >
                <img
                  src={PUBLIC_IMAGE_PATH + "arogya.png"}
                  className="registerContainer-img"
                  alt=""
                />
              </a>
              <a href="https://web.umang.gov.in/landing/" target="blank">
                <img
                  src={PUBLIC_IMAGE_PATH + "umang.png"}
                  className="registerContainer-img"
                  alt=""
                />
              </a>
              <a href="https://www.cowin.gov.in/home" target="blank">
                <img
                  src={PUBLIC_IMAGE_PATH + "cowin.png"}
                  className="registerContainer-img"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
      <Footer />
    </div>
  );
}

export default App;
