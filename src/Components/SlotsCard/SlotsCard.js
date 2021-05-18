import React from 'react';
import "./SlotsCard.css"

const SlotCard = () => {
  return (
  <div className="info-card">
    <h5>DGD KONDLI MAYUR VIHAR PHASE 3</h5>
    <p>Pocket A 2 Sector C Gharoli Delhi, 
       East Delhi, Delhi, 110096</p>
    <div className="main-info">
      <h6>Covishield</h6>
      <h6>Age 18-44</h6>
    </div>

    <div className="date-line1">
      <div className="date1">
        <h6>17 May 2021</h6>
        <h6>150</h6>
      </div>
      <div className="date2">
        <h6>18 May 2021</h6>
        <h6>150</h6>
      </div>
    </div>

    <div className="date-line2">
      <div className="date3">
        <h6>19 May 2021</h6>
        <h6>150</h6>
      </div>
      <div className="date4">
        <h6>20 May 2021</h6>
        <h6>150</h6>
      </div>
    </div>

  </div>
  )
}

export default SlotCard
