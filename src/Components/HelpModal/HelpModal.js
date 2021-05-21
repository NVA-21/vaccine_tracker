import React from 'react';
import "./HelpModal.css"

const HelpModal = ({open, onclose}) => {
  if(!open) return null
  return(
    <div className="modal">
      <div className="modal-main">
        <div className="modal-heading">
          <h1>Need Help?</h1>
          <button onClick={onclose}>X</button>
        </div>
        <div className="scroll">
          <div className="why-us">
            <h2>Why us?</h2><br/>
            <p>Tired of staying up all night looking for slots for the vaccine? 
              Don't you worry! Our web app will send you a notification as soon 
              as there are slots available and you can book it first!<br/><br/> Our web app 
              doesn't gather any user information by the use of cookies or other 
              third-party software or ads. It only asks for permission to enable 
              notification. If you are facing any issues with notification you can 
              check out the help given below.</p><br/>
          </div>
          <div className="howtoregister">
            <h2>How to Register and Schedule the Vaccine?</h2><br/>
            <b>On Cowin platform:</b><br/><br/>
            <p>
              1. Click on 'Register/Sign in yourself'.<br/>
              2. Enter valid mobile number. Click on 'Get OTP.<br/>
              3. Enter the OTP within 180 seconds and click on 'Verify'.<br/>
              4. Once the OTP is validated, the 'Register for Vaccination' page appears.<br/>
              5. Enter required details such as name, photo ID proof & number, age and gender.<br/>
              6. Click 'Register' at the bottom right.<br/>
              7. You will receive a confirmation message upon successful registration.<br/>
            </p>
            <br/>
            <b>On Arogya Setu app:</b><br/><br/>
            <p>
              1. Open 'Aarogya Setu' app.<br />
              2. Click on the CoWin tab on home screen.<br />
              3. Select 'Vaccination Registration' and enter mobile number.<br />
              4. You ll receive an OTP on your mobile, enter it on site.<br />
              5. Once your mobile number is verified, enter your details and click 'Register'.<br />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpModal