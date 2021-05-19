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
// import ToggleSlider from "./Components/ToggleSlider/ToggleSlider";
import SlotCard from "./Components/SlotsCard/SlotsCard";
import Button from "./Components/Button/Button";
import MaxWidthWrapper from "./Components/MaxWidthWrapper/MaxWidthWrapper";

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
  const [data, setData] = useState([
    {
      address:
        "Shaheed Budh Ram Singh Marg, Abhimanyu Appartment, Vasundhara Enclave, New Delhi, Delhi",
      block_name: "Not Applicable",
      center_id: 605943,
      district_name: "East Delhi",
      fee_type: "Free",
      from: "09:00:00",
      lat: 28,
      long: 77,
      name: "DGD Vasundhara Enclave",
      pincode: 110096,
      sessions: [
        {
          available_capacity: 1,
          available_capacity_dose1: 0,
          available_capacity_dose2: 1,
          date: "25-05-2021",
          min_age_limit: 45,
          session_id: "cfe1c59e-88c8-4be3-a798-c6140ca28b6c",
          slots: [
            "09:00AM-11:00AM",
            "11:00AM-01:00PM",
            "01:00PM-03:00PM",
            "03:00PM-05:00PM",
          ],
          vaccine: "COVISHIELD",
        },
        {
          available_capacity: 3,
          available_capacity_dose1: 0,
          available_capacity_dose2: 1,
          date: "26-05-2021",
          min_age_limit: 45,
          session_id: "cfe1c59e-88c8-4be3-a798-c6140ca28b6c",
          slots: [
            "09:00AM-11:00AM",
            "11:00AM-01:00PM",
            "01:00PM-03:00PM",
            "03:00PM-05:00PM",
          ],
          vaccine: "COVISHIELD",
        },
      ],
      state_name: "Delhi",
      to: "17:00:00",
    },
    {
      address:
        "Shaheed Budh Ram Singh Marg, Abhimanyu Appartment, Vasundhara Enclave, New Delhi, Delhi",
      block_name: "Not Applicable",
      center_id: 605943,
      district_name: "East Delhi",
      fee_type: "Free",
      from: "09:00:00",
      lat: 28,
      long: 77,
      name: "DGD Vasundhara Enclave",
      pincode: 110096,
      sessions: [
        {
          available_capacity: 1,
          available_capacity_dose1: 0,
          available_capacity_dose2: 1,
          date: "25-05-2021",
          min_age_limit: 45,
          session_id: "cfe1c59e-88c8-4be3-a798-c6140ca28b6c",
          slots: [
            "09:00AM-11:00AM",
            "11:00AM-01:00PM",
            "01:00PM-03:00PM",
            "03:00PM-05:00PM",
          ],
          vaccine: "COVISHIELD",
        },
        {
          available_capacity: 3,
          available_capacity_dose1: 0,
          available_capacity_dose2: 1,
          date: "26-05-2021",
          min_age_limit: 45,
          session_id: "cfe1c59e-88c8-4be3-a798-c6140ca28b6c",
          slots: [
            "09:00AM-11:00AM",
            "11:00AM-01:00PM",
            "01:00PM-03:00PM",
            "03:00PM-05:00PM",
          ],
          vaccine: "COVISHIELD",
        },
      ],
      state_name: "Delhi",
      to: "17:00:00",
    },
    {
      address:
        "Shaheed Budh Ram Singh Marg, Abhimanyu Appartment, Vasundhara Enclave, New Delhi, Delhi",
      block_name: "Not Applicable",
      center_id: 605943,
      district_name: "East Delhi",
      fee_type: "Free",
      from: "09:00:00",
      lat: 28,
      long: 77,
      name: "DGD Vasundhara Enclave",
      pincode: 110096,
      sessions: [
        {
          available_capacity: 1,
          available_capacity_dose1: 0,
          available_capacity_dose2: 1,
          date: "25-05-2021",
          min_age_limit: 45,
          session_id: "cfe1c59e-88c8-4be3-a798-c6140ca28b6c",
          slots: [
            "09:00AM-11:00AM",
            "11:00AM-01:00PM",
            "01:00PM-03:00PM",
            "03:00PM-05:00PM",
          ],
          vaccine: "COVISHIELD",
        },
        {
          available_capacity: 3,
          available_capacity_dose1: 0,
          available_capacity_dose2: 1,
          date: "26-05-2021",
          min_age_limit: 45,
          session_id: "cfe1c59e-88c8-4be3-a798-c6140ca28b6c",
          slots: [
            "09:00AM-11:00AM",
            "11:00AM-01:00PM",
            "01:00PM-03:00PM",
            "03:00PM-05:00PM",
          ],
          vaccine: "COVISHIELD",
        },
      ],
      state_name: "Delhi",
      to: "17:00:00",
    },
    {
      address: "Pocket A 2, Sector C, Gharoli, Delhi",
      block_name: "Not Applicable",
      center_id: 605931,
      district_name: "East Delhi",
      fee_type: "Free",
      from: "09:00:00",
      lat: 28,
      long: 77,
      name: "DGD Kondli Mayur Vihar Phase 3",
      pincode: 110096,
      sessions: [
        {
          available_capacity: 200,
          available_capacity_dose1: 0,
          available_capacity_dose2: 2,
          date: "20-05-2021",
          min_age_limit: 45,
          session_id: "9a0018ab-1dd4-4dc2-add1-f7049b845960",
          slots: [
            "09:00AM-11:00AM",
            "11:00AM-01:00PM",
            "01:00PM-03:00PM",
            "03:00PM-06:00PM",
          ],
          vaccine: "COVISHIELD",
        },
      ],
      state_name: "Delhi",
      to: "18:00:00",
    },
  ]);

  useEffect(() => {}, []);

  useInterval(async () => {
    if (apiFetching) {
      // `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${input}&date=16-05-2021`
      // const date = "17-05-2021";
      const date = getDate();
      console.log(date);
      const responseValue = await fetchApiData(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${searchQuery}&date=${date}`
      );
      // console.log(responseValue);

      async function filter() {
        let filtered = await responseValue.centers.map((center) => ({
          ...center,
          sessions: center.sessions.filter(
            (session) => session.available_capacity > 0

            /*  transactions: product.transactions.filter(
               transaction => transaction.purchase === dataItem.purchase
             )*/
          ),
        }));

        let finalResult = filtered.filter(
          (center) => center.sessions.length > 0
        );
        setData(finalResult);
      }

      filter();
      // let result = responseValue.centers.filter((center) =>
      //   center.sessions.some((c) => c.available_capacity > 0)
      // );
      // console.log(result);

      handleNotification();
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
  console.log(data);
  return (
    <div
      className="App"
      // style={{
      //   background: `url(${PUBLIC_IMAGE_PATH}background.png)`,
      //   backgroundRepeat: "no-repeat",
      //   backgroundPosition: "right -100px bottom",
      // }}
    >
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
            {/* <ToggleSlider /> */}

            <div
              className="inputContainer"
              style={{ border: inputError && `1px solid red` }}
            >
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
            <div className="btnContainer">
              <div className="helpBtn">
                <Button />
              </div>
              <div
                className="searchBtn"
                onClick={() => {
                  handleSearch();
                }}
              >
                {/* <Button /> */}
              </div>
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
