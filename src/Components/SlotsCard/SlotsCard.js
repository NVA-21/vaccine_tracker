import React from "react";
import "./SlotsCard.css";

const SlotCard = () => {
  return (
    <div className="slotCard">
      <h5 className="center-name">DGD KONDLI MAYUR VIHAR PHASE 3</h5>
      <p className="center-location">
        Pocket A 2 Sector C Gharoli Delhi, East Delhi, Delhi, 110096
      </p>
      <div className="vaccine-category">
        <p>Covishield</p>
        <p>Age 18-44</p>
      </div>

      <div className="slots-table-container">
        <div className="slots-table-set">
          <h6 className="date">17 May 2021</h6>
          <h6 className="slots first-col">150</h6>
        </div>

        {/* <div className="slots-table-set-empty"></div> */}
      </div>
    </div>
  );
};

export default SlotCard;
