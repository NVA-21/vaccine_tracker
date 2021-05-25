import "./App.css";
import React, { useEffect, useState } from "react";
import {
  fetchApiData,
  NUMBER_REGEX,
  PUBLIC_IMAGE_PATH,
  getDate,
} from "./utils/Constants";
import { borderRadius, primaryColor } from "./utils/Theme";
import useInterval from "./utils/useInterval";
import MaxWidthWrapper from "./Components/MaxWidthWrapper/MaxWidthWrapper";
import Modal from "./Components/Modal/Modal";
import ToggleSlider from "./Components/ToggleSlider/ToggleSlider";
import Checkbox from "./Components/Checkbox/Checkbox";
// import Dropdown from "./Components/Dropdown/Dropdown";
import HelpModal from "./Components/Modal/HelpModal";
import Button from "./Components/Button/Button";
import SlotCard from "./Components/SlotsCard/SlotsCard";
import Footer from "./Components/Footer/Footer";
import * as statesData from "./JsonData/states.json";
import SelectBox from "./Components/SelectBox/SelectBox";

function App() {
  // Input values
  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState(false);

  // District array
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectBoxError, setSelectBoxError] = useState({
    state: false,
    district: false,
  });

  // Toggle between pincode and district search
  const [searchMode, setSearchMode] = useState("pincode");
  //pincodes value when search btn clicked
  const [searchQuery, setSearchQuery] = useState("");

  // Starts to fetch from api only if pincode entered is valid.
  const [apiFetching, setApiFetching] = useState(false);
  // Keeps track whether notification prev sent or not
  const [notificationSent, setNotificationSent] = useState(false);

  // Storing api data
  const [data, setData] = useState([]);

  const [count, setCount] = useState(0);

  // Modal opening.
  const [showModal, setShowModal] = useState({
    notifGuid: false,
    needHelp: false,
  });

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
      const date = getDate();
      // console.log(date);

      const apiData = async () => {
        if (searchMode === "pincode") {
          const responseValue = await fetchApiData(
            `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${searchQuery}&date=${date}`
          );
          console.log(responseValue);
          return responseValue.centers;
        } else if (searchMode === "district") {
          console.log("DISTRICT SEARCHING");
          const responseValue = await fetchApiData(
            `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${selectedDistrict}&date=${date}`
          );
          console.log(responseValue);
          return responseValue.centers;
        }
      };
      var dataa = await apiData();
      console.log(dataa);
      try {
        const filtered = await dataa.map(center => ({
          ...center,
          sessions: center.sessions.filter(
            session => session.available_capacity > 0
          ),
        }));

        const finalResult = filtered.filter(
          center => center.sessions.length > 0
        );
        // const filtered = dataa.map(center => ({
        //   ...center,
        //   sessions: center.sessions.filter(
        //     session => session.available_capacity > 0
        //   ),
        // }));

        // const finalResult = filtered.filter(
        //   center => center.sessions.length > 0
        // );

        console.log(finalResult);

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
        setCount(count + 1);
      } catch (e) {
        console.log(count);
        console.log(e);
      }
    }
  }, 5000);

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

  async function getDistricts(stateID) {
    setDistricts([]);
    // https://cdn-api.co-vin.in/api/v2/admin/location/districts/37
    console.log(stateID);
    const responseValue = await fetchApiData(
      "https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + stateID
    );
    console.log(responseValue);
    setDistricts(responseValue);
  }

  function handleSearch() {
    // If not searching from API
    if (!apiFetching) {
      if (searchMode === "pincode") {
        if (input.length < 6) {
          setInputError(true);
          return false;
        }

        // Disabling inputError
        setInputError(false);

        // Setting input value as Search Query value
        setSearchQuery(input);
      } else {
        if (districts.length < 1) {
          setSelectBoxError({ ...selectBoxError, state: true });
        } else if (!selectedDistrict) {
          setSelectBoxError({ ...selectBoxError, state: false });
          console.log("Select district first");
          setSelectBoxError({ ...selectBoxError, state: true });
          return false;
        }
      }

      // To start the api call
      setApiFetching(true);

      // just for build purpose delete later
      // setSearchMode(searchMode);
    }
    // To cancel the api call
    else {
      setApiFetching(false);
    }
  }

  // console.log(data);
  return (
    <div className="App">
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
              Get notified when your area has available slots.
            </h1>

            <ToggleSlider setSearchMode={value => setSearchMode(value)} />

            {searchMode === "pincode" && (
              // PINCODE SEARCH
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
            )}

            {searchMode === "district" && (
              // DISTRICT SEARCH
              <div className="toggle-pin-dist">
                <SelectBox
                  title="Select State"
                  array={statesData.states}
                  idValue={"state_id"}
                  labelValue={"state_name"}
                  error={selectBoxError.state}
                  executeFunction={value => {
                    getDistricts(value);
                  }}
                />

                <SelectBox
                  title="Select District"
                  array={districts.districts}
                  idValue={"district_id"}
                  labelValue={"district_name"}
                  error={selectBoxError.district}
                  executeFunction={value => {
                    setSelectedDistrict(value);
                  }}
                />
                {/* <Dropdown
                  title="Select State"
                  array={statesData.states}
                  keyValue={"state_name"}
                /> */}
                {/* <Dropdown title="Select District" /> */}
              </div>
            )}

            <div className="checklistContainer">
              <div className="checklistTop">
                <Checkbox text="18-44" />
                <Checkbox text="45+" />
                <Checkbox text="Free" />
                <Checkbox text="Paid" />
              </div>
              <div className="checklistBottom">
                <Checkbox text="Covaxin" />
                <Checkbox text="Covishield" />
                <Checkbox text="Sputnik V" />
              </div>
            </div>

            <div className="btnContainer">
              <Modal
                show={showModal.needHelp}
                close={() => setShowModal({ ...showModal, needHelp: false })}
                title="Need Help?"
                children={<HelpModal />}
              />
              <Button
                text="Need Help?"
                background={"#fff"}
                color={primaryColor}
                borderRadius={borderRadius}
                onClick={() => setShowModal({ needHelp: true })}
              />

              <Button
                text="Get Notified"
                borderRadius={borderRadius}
                animate={input.length === 6 && true}
                onClick={() => {
                  handleSearch();
                }}
              />
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
