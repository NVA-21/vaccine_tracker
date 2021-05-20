import React from 'react';
import "./HelpModal.css"

const HelpModal = () => {
  return(
    <div className="modal-main">
      <div className="modal-heading">
        <h1>Need Help?</h1>
      </div>

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
        <ol>
          <li>Click on 'Register/Sign in yourself'.</li>
          <li>Enter valid mobile number. Click on 'Get OTP.</li>
          <li>Enter the OTP within 180 seconds and click on 'Verify'.</li>
          <li>Once the OTP is validated, the 'Register for Vaccination' page appears.</li>
          <li>Enter required details such as name, photo ID proof & number, age and gender.</li>
          <li>Click 'Register' at the bottom right.</li>
          <li>You will receive a confirmation message upon successful registration.</li>
        </ol><br/>
        <b>On Arogya Setu app:</b><br/><br/>
        <ol>
          <li>Open 'Aarogya Setu' app.</li>
          <li>Click on the CoWin tab on home screen.</li>
          <li>Select 'Vaccination Registration' and enter mobile number.</li>
          <li>You ll receive an OTP on your mobile, enter it on site.</li>
          <li>Once your mobile number is verified, enter your details and click 'Register'.</li>
        </ol>
      </div>
    </div>
  )
}

export default HelpModal