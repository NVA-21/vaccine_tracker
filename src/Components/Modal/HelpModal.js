import React from 'react';
import { PUBLIC_IMAGE_PATH } from '../../utils/Constants';
import ProfileCard from '../ProfileCard/ProfileCard';
import './HelpModal.css';

export default function HelpModal() {
	return (
		<>
			<div className="helpModal-head">
				<h2 className="helpModal-topicHead">How to enable notification?</h2>
				<br />
				<div className="notif-help">
					<img src={PUBLIC_IMAGE_PATH + 'notifgif.gif'} alt="help gif" />
					<br />
					<h5>
						<ol className="notif-helpList">
							<li>Open the View Site Information</li>
							<li>Click on the Notfications Dropdown</li>
							<li>Click on Allow and Close.</li>
						</ol>
					</h5>
				</div>
			</div>

			<div className="helpModal-head">
				<h2 className="helpModal-topicHead">
					How to Register and Schedule the Vaccine?
				</h2>
				<br />
				<b>On Cowin platform:</b>
				<br />
				<ol className="helpModal-list">
					<li>Click on 'Register/Sign in yourself'.</li>
					<li>Enter valid mobile number. Click on 'Get OTP'.</li>

					<li>Enter the OTP within 180 seconds and click on 'Verify'.</li>
					<li>
						Once the OTP is validated, the 'Register for Vaccination' page
						appears.
					</li>
					<li>
						Enter required details such as name, photo ID proof & number, age
						and gender.
					</li>
					<li> Click 'Register' at the bottom right.</li>
					<li>
						You will receive a confirmation message upon successful
						registration.
					</li>
				</ol>

				<br />
				<b>On Aarogya Setu app:</b>

				<ol className="helpModal-list">
					<li>Open 'Aarogya Setu' app.</li>
					<li>Select 'Vaccination Registration' and enter mobile number.</li>
					<li>You'll receive an OTP on your mobile. Enter it on site.</li>
					<li>
						Once your mobile number is verified, enter your details and click
						'Register'.
					</li>
				</ol>
				<br />
				<b>How to Schedule the vaccine:</b>

				<ol className="helpModal-list">
					<li>
						Click on ‘Schedule Appointment’ on the platform that you are on and
						you will get an option to ‘book appointment for vaccination.’
					</li>
					<li>Check on our website for the availability of slots.</li>
					<li>
						Now accordingly choose the state, district, block, and pin code.
						Once done, you will get a list of vaccination centres, as per the
						details you have entered.
					</li>
					<li>
						Select the vaccination centre, after which you will get the dates
						and the number of slots available on a day.
					</li>
					<li>
						Once everything is done, just click on the ‘Book’ button and an
						‘Appointment Confirmation’ page will appear.
					</li>
					<li>
						After this verify all the details and click on ‘Confirm’. Then, you
						are all set to get the vaccine.
					</li>
				</ol>
			</div>

			<div className="helpModal-head">
				<h2 className="helpModal-topicHead">Why us?</h2>
				<br />
				<p>
					Tired of staying up all night looking for slots for the vaccine? Don't
					you worry! Our web app will send you a notification as soon as there
					are slots available and you can book it first!
					<br /> Our web app doesn't gather any user information by the use of
					cookies or other third-party software or ads. It only asks for
					permission to enable notification. If you are facing any issues with
					notification you can check out the solutions given above.
				</p>
			</div>

			{/* <br /> */}
			<div className="helpModal-head">
				<h2 className="helpModal-topicHead">How does this site work?</h2>
				<br />
				<p>
					This site was built using React JS. React JS is a javascript library
					maintained by Facebook which helps this site to be blazing fast. We
					use the free APIs provided by the Government of India to gather the
					data, which we filter and provide results according to your needs.
				</p>
				<div className="api-link">
					API link: &nbsp;
					<a
						className="helpModal-Links"
						href="https://apisetu.gov.in/public/marketplace/api/cowin/cowin-public-v2"
						target="_blank"
						rel="noreferrer"
					>
						https://apisetu.gov.in/public/marketplace/api/cowin/cowin-public-v2
					</a>
				</div>

				<div className="api-link">
					Source Code: &nbsp;
					<a
						className="helpModal-Links"
						href="https://github.com/NVA-21/vaccine_tracker"
						target="_blank"
						rel="noreferrer"
					>
						https://github.com/NVA-21/vaccine_tracker
					</a>
				</div>
			</div>

			<div className="helpModal-head">
				<h2 className="helpModal-topicHead">Who are we?</h2>
				<br />
				<p>
					We are a group of three friends (
					<a
						className="developerNames"
						href="https://www.linkedin.com/in/g-vishakh/"
						target="_blank"
						rel="noreferrer"
					>
						G. Vishakh
					</a>
					,{' '}
					<a
						className="developerNames"
						href="https://www.linkedin.com/in/arunsamuel08/"
						target="_blank"
						rel="noreferrer"
					>
						Arun Saji Samuel
					</a>
					,{' '}
					<a
						className="developerNames"
						href="https://www.linkedin.com/in/nikhil-singh-payaal-a41809169/"
						target="_blank"
						rel="noreferrer"
					>
						Nikhil Singh Payaal
					</a>
					) who always wanted to do innovative projects together. Hence we took
					up this project as a side hobby to contribute to society in these
					testing times!
					<br /> Since this is our first project, there may be some bugs or
					problems with the site that we may have missed. We urge you to join
					this telegram group and alert us if you find any bugs or problems with
					this site.
				</p>
				<br />
				<a
					className="helpModal-Links"
					href="https://t.me/NVA_CovidVaccineTracker"
					target="_blank"
					rel="noreferrer"
				>
					Click here to go to the Telegram Channel!
				</a>
			</div>

			<div className="helpModal-head">
				<h2 className="helpModal-topicHead">Contact Us</h2>
				<br />
				<p>
					In case of any doubts, queries, or want our help/contributions in your
					current/future projects, feel free to contact us.
				</p>
				<br />

				<div className="profileCards">
					<ProfileCard
						profileImage="nikhil.png"
						name="Nikhil Singh Payaal"
						designation="UI/UX Designer"
						behance="https://www.behance.net/nspdesigns"
						linkedin="https://www.linkedin.com/in/nikhil-singh-payaal-a41809169/"
						mail="mailto:npayaal007@gmail.com"
					/>

					<ProfileCard
						profileImage="vishakh.png"
						name="G. Vishakh"
						designation="Fullstack Developer"
						github="https://github.com/vishakhg98/"
						linkedin="https://www.linkedin.com/in/g-vishakh/"
						mail="mailto:vishakhg98@gmail.com"
					/>

					<ProfileCard
						profileImage="arun.png"
						name="Arun Saji Samuel"
						designation="Front End Developer"
						github="https://github.com/arunsamuel08"
						linkedin="https://www.linkedin.com/in/arunsamuel08/"
						mail="mailto:arun.samuel08@gmail.com"
					/>
				</div>
			</div>
		</>
	);
}
