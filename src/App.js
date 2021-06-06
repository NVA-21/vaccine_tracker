import './App.css';
import React, { useEffect, useState } from 'react';
import {
	COUNT_NAMESPACE,
	COUNT_KEY,
	fetchApiData,
	NUMBER_REGEX,
	PUBLIC_IMAGE_PATH,
	getDate
} from './utils/Constants';
import * as statesData from './JsonData/states.json';
import { borderRadius, primaryColor } from './utils/Theme';
import useInterval from './utils/useInterval';
import MaxWidthWrapper from './utils/MaxWidthWrapper';
import Modal from './Components/Modal/Modal';
import ToggleSlider from './Components/ToggleSlider/ToggleSlider';
import Checkbox from './Components/Checkbox/Checkbox';
import HelpModal from './Components/Modal/HelpModal';
import Button from './Components/Button/Button';
import SlotCard from './Components/SlotsCard/SlotsCard';
import Footer from './Components/Footer/Footer';
import SelectBox from './Components/SelectBox/SelectBox';
import Toast from './Components/Toast/Toast';
import Loader from './Components/Loader/Loader';

function App() {
	const [isMobile, setIsMobile] = useState(false);

	// Toggle between pincode and district search
	const [toggleValue, setToggleValue] = useState('pincode');
	const [searchMode, setSearchMode] = useState('pincode');

	// Starts to fetch from api only if pincode entered is valid || district is selected.
	const [apiFetching, setApiFetching] = useState(false);

	// Input values
	const [input, setInput] = useState('');
	const [inputError, setInputError] = useState(false);
	//pincodes value when search btn clicked
	const [searchQuery, setSearchQuery] = useState('');

	// District array
	const [districts, setDistricts] = useState([]);
	const [selectedDistrict, setSelectedDistrict] = useState('');
	const [selectBoxError, setSelectBoxError] = useState({
		state: false,
		district: false
	});

	const [showToast, setShowToast] = useState({
		status: false,
		message: { head: '', content: '' }
	});

	// Filter Checbox Modes Selected
	const [filterModes, setFilterModes] = useState({
		// Default 18years only selected
		ageLimit: [18],
		fee: ['Free', 'Paid'],
		vaccine_type: ['COVAXIN', 'COVISHIELD', 'SPUTNIK V']
	});

	// Storing api Unfiltered data: to quickly show filtered data than wait for next api call
	const [data, setData] = useState([]);
	// Storing Filtered Data
	const [filteredData, setFilteredData] = useState([]);

	// Modal opening.
	const [showModal, setShowModal] = useState(false);

	// Counts each visit - Analytics purpose
	useEffect(() => {
		fetchApiData(
			`https://api.countapi.xyz/update/${COUNT_NAMESPACE}/${COUNT_KEY}?amount=1`
		);
	}, []);

	useEffect(() => {
		// Check for Notification Permission granted or not at Page Load
		if (!('Notification' in window)) {
			alert(
				'This browser does not support Push Notification; Desktop browsers are preferred to avoid such issues.'
			);
		}

		// Try catch to avoid running into issue with safari and other Notification-Api non supported browsers.
		try {
			if (Notification.permission === 'denied') {
				// Toast for 3s when notif permission denied
				setShowToast({
					status: true,
					message: {
						head: 'Please Turn on Notifications!',
						content: "To know how to enable it click 'Need Help'."
					}
				});
			}
			// Requesting permission if notif permission is set as default
			Notification.requestPermission();
		} catch (err) {
			console.log(err);
		}

		// To scroll to Available Slots Container in mobile view
		if (window.innerWidth <= 768) setIsMobile(true);

		// To add above feature in resizing too
		window.addEventListener('resize', () =>
			window.innerWidth <= 768 ? setIsMobile(true) : setIsMobile(false)
		);
	}, []);

	// To prevent api switching when toggle slider switches
	useEffect(() => {
		setSearchMode(toggleValue);

		// Next line is required to disable a warning
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [apiFetching]);

	// Calls When new filter parameter is set
	useEffect(() => {
		filterData(data);

		// Next line is required to disable a warning
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterModes]);

	// Repeating Api call at 5s to get uptodate data If apiFetching mode is ON.
	useInterval(() => {
		if (apiFetching) {
			fetchingApiData();
		}
	}, 5000);

	// Fetching Data From api Setu public api
	async function fetchingApiData() {
		const date = getDate();

		const apiData = async () => {
			if (searchMode === 'pincode') {
				// To fix Promises issue faced when instant api call used
				let pincode;
				if (searchQuery === '') {
					pincode = input;
				} else {
					pincode = searchQuery;
				}

				const responseValue = await fetchApiData(
					`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${date}`
				);

				if (responseValue.message) {
					setApiFetching(false);
					setShowToast({
						status: true,
						message: {
							head: responseValue.message,
							content: 'Please try another'
						}
					});
					setInputError(true);
					return [];
				}
				return responseValue.centers;
			} else if (searchMode === 'district') {
				const responseValue = await fetchApiData(
					`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${selectedDistrict}&date=${date}`
				);

				return responseValue.centers;
			}
		};
		const totalData = await apiData();
		// Filtering Total Data according to checbkox conditions
		await filterData(totalData);
		setData(totalData);
	}

	// Filters Data according to checbox filter conditions and calls notification function
	async function filterData(totalData) {
		try {
			const filtered = await totalData.map(center => ({
				...center,
				sessions: center.sessions.filter(
					session =>
						session.available_capacity > 0 &&
						filterModes.vaccine_type.includes(session.vaccine) &&
						filterModes.ageLimit.includes(session.min_age_limit)
				)
			}));

			const finalFilteredData = filtered.filter(
				center =>
					center.sessions.length > 0 &&
					filterModes.fee.includes(center.fee_type)
			);

			// Notification Logic
			// Negative conditions : 1) If Old filtered data size >= New filter Data dont send. 2) If Old Total Unfiltered Data >=  New Total Unfiltered Data 3) If Both filtered and unfiltered data NEW and OLD are same
			// Total Unfiltered data is checked so that notification bombard doesn't happen when filter conditions are changed.
			// Don't send Notification

			if (
				JSON.stringify(totalData).length <= JSON.stringify(data).length ||
				JSON.stringify(totalData) === JSON.stringify(data) ||
				JSON.stringify(finalFilteredData).length <=
					JSON.stringify(filteredData).length ||
				JSON.stringify(finalFilteredData) === JSON.stringify(filteredData) ||
				!JSON.stringify(totalData).length
			) {
				// Do nothing
			} else {
				handleNotification();
			}

			setFilteredData(finalFilteredData);
		} catch (err) {
			console.log(err);
		}
	}

	function handleNotification() {
		let title;
		if (searchMode === 'pincode') {
			title = `Vaccination centers available at pincode: ${input}`;
		} else {
			let districtSelectedLabel = districts.districts.find(
				district => district.district_id === parseInt(selectedDistrict)
			).district_name;

			title = `Vaccination centers available at district: ${districtSelectedLabel}`;
		}

		// Sending notification
		const notification = new Notification(title, {
			icon: PUBLIC_IMAGE_PATH + 'logo.png',
			body: 'Click here to see the centers'
		});

		// To open same tab in which site is running
		notification.onclick = () => window.focus();
	}

	// If api is working on pincode then district call doesnt happen unless user cancel pincode search and search on district.
	function handleToggle(toggleMode) {
		if (apiFetching) {
			setToggleValue(toggleMode);
		} else {
			setToggleValue(toggleMode);
			setSearchMode(toggleMode);
		}
	}

	// Only allows numbers in pincode input
	function handleInput(value) {
		if (NUMBER_REGEX.test(value) || value === '') {
			setInput(value);
		}
	}

	// get Districts of that state when a state is selected
	async function getDistricts(stateID) {
		setDistricts([]);
		const responseValue = await fetchApiData(
			'https://cdn-api.co-vin.in/api/v2/admin/location/districts/' + stateID
		);
		setDistricts(responseValue);
	}

	// When user changes district while district search is running toast is given for 3s
	function handleDistrictChange(value) {
		if (apiFetching && searchMode === 'district') {
			setShowToast({
				status: true,
				message: {
					head: 'District updated!',
					content: 'New District data will be scanned now.'
				}
			});
		}
		setSelectedDistrict(value);
	}

	// Checkbox Filter Logic
	// (If all selected of a type (Age, Fee, Vaccine_Type) or none selected) = All selected
	function handleCheckboxFilterModes(mode, value) {
		const handleTwoFilters = (obj, value, defaultValue) => {
			// When both gets removed
			if (filterModes[obj].length === 1 && !value[0]) {
				setFilterModes({ ...filterModes, [obj]: defaultValue });
			}

			// When one enabled and new has to enable
			else if (filterModes[obj].length === 1) {
				let arr = filterModes[obj];
				arr.push(value[1]);

				setFilterModes({
					...filterModes,
					[obj]: arr
				});
			}

			// To remove one when both enabled already
			else if (filterModes[obj].length === 2 && !value[0]) {
				let arr = filterModes[obj];
				arr = arr.filter(i => i !== value[1]);

				setFilterModes({
					...filterModes,
					[obj]: arr
				});
			}
			// When everything is removed and automatically both values are added then adding one sets value to that value
			else {
				setFilterModes({ ...filterModes, [obj]: [value[1]] });
			}
		};

		if (mode === 'age') {
			handleTwoFilters('ageLimit', [value[0], parseInt(value[1])], [18, 45]);
		}

		if (mode === 'fee') {
			handleTwoFilters('fee', value, ['Free', 'Paid']);
		}

		if (mode === 'vaccine') {
			// When both gets removed
			if (filterModes.vaccine_type.length === 1 && !value[0]) {
				setFilterModes({
					...filterModes,
					vaccine_type: ['COVAXIN', 'COVISHIELD', 'SPUTNIK V']
				});
			} else if (filterModes.vaccine_type.length < 3 && value[0]) {
				let arr = filterModes.vaccine_type;
				arr.push(value[1]);
				setFilterModes({ ...filterModes, vaccine_type: arr });
			} else if (filterModes.vaccine_type.length <= 3 && !value[0]) {
				let arr = filterModes.vaccine_type;
				arr = arr.filter(i => i !== value[1]);
				setFilterModes({ ...filterModes, vaccine_type: arr });
			} else {
				setFilterModes({ ...filterModes, vaccine_type: [value[1]] });
			}
		}
	}

	// Cancels search if already searching else starts searching
	async function handleSearch() {
		// If not searching from API
		if (!apiFetching) {
			if (searchMode === 'pincode') {
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
					setSelectBoxError({ ...selectBoxError, state: true, district: true });
					return false;
				} else if (!selectedDistrict) {
					setSelectBoxError({ ...selectBoxError, state: false });

					return false;
				} else {
					setSelectBoxError({ ...selectBoxError, district: false });
				}
			}

			// To start the api call
			setApiFetching(true);

			// Calling api first time to avoid 3s wait
			fetchingApiData();

			// Scrolling down to Available Slots Container if mobile view
			if (isMobile) document.getElementById('rightContainer').scrollIntoView();
		}
		// To cancel the api call
		else {
			setApiFetching(false);
		}
	}

	return (
		<div className="App">
			<div className="backgroundCircle"></div>
			<MaxWidthWrapper>
				<div className="contentContainers">
					<div className="leftContainer">
						<img
							src={PUBLIC_IMAGE_PATH + 'logo-title.png'}
							className="brandLogo"
							alt="COVID VACCINE TRACKER"
						/>

						<h1 className="mainHead">
							Get notified when your area has available slots
						</h1>

						<ToggleSlider setSearchMode={value => handleToggle(value)} />

						{toggleValue === 'pincode' && (
							// PINCODE SEARCH
							<div
								className="inputContainer"
								style={{
									border: inputError && `1px solid red`,
									borderRadius: borderRadius
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
									src={PUBLIC_IMAGE_PATH + 'search.svg'}
									className="searchIcon"
									alt=""
									width={22}
									height={23}
								/>
							</div>
						)}

						{toggleValue === 'district' && (
							// DISTRICT SEARCH
							<div className="selectBoxContainer">
								<SelectBox
									title="Select State"
									array={statesData.states}
									idValue={'state_id'}
									labelValue={'state_name'}
									error={selectBoxError.state}
									executeFunction={value => {
										getDistricts(value);
									}}
								/>

								<SelectBox
									title="Select District"
									array={districts.districts}
									idValue={'district_id'}
									labelValue={'district_name'}
									error={selectBoxError.district}
									executeFunction={value => {
										handleDistrictChange(value);
									}}
								/>
							</div>
						)}

						<div className="checklistContainer">
							<div className="checklistTop">
								<Checkbox
									text="18-44"
									checked={true}
									value={18}
									executeFunction={value =>
										handleCheckboxFilterModes('age', value)
									}
								/>
								<Checkbox
									text="45+"
									value={45}
									executeFunction={value =>
										handleCheckboxFilterModes('age', value)
									}
								/>

								<Checkbox
									text="Free"
									value={'Free'}
									executeFunction={value =>
										handleCheckboxFilterModes('fee', value)
									}
								/>
								<Checkbox
									text="Paid"
									value="Paid"
									executeFunction={value =>
										handleCheckboxFilterModes('fee', value)
									}
								/>
							</div>

							<div className="checklistBottom">
								<Checkbox
									text="Covaxin"
									value="COVAXIN"
									executeFunction={value =>
										handleCheckboxFilterModes('vaccine', value)
									}
								/>
								<Checkbox
									text="Covishield"
									value="COVISHIELD"
									executeFunction={value =>
										handleCheckboxFilterModes('vaccine', value)
									}
								/>
								<Checkbox
									text="Sputnik V"
									value="SPUTNIK V"
									executeFunction={value =>
										handleCheckboxFilterModes('vaccine', value)
									}
								/>
							</div>
						</div>

						<div className="btnContainer">
							<span className="btnFrame">
								<Button
									text="Need Help?"
									background={'#fff'}
									color={primaryColor}
									borderRadius={borderRadius}
									onClick={() => setShowModal(true)}
								/>
							</span>

							<span className="btnFrame">
								<Button
									text="Get Notified"
									borderRadius={borderRadius}
									animate={
										(input.length === 6 && true) ||
										(selectedDistrict.length && true)
									}
									onClick={() => {
										handleSearch();
									}}
								/>
							</span>

							<Modal
								show={showModal}
								close={() => setShowModal(false)}
								title="Need Help?"
								children={<HelpModal />}
							/>
						</div>
					</div>

					<div className="rightContainer" id="rightContainer">
						<div className="slotsContainer">
							<h4>SLOTS AVAILABLE</h4>
							<div className="slotsContainerScrollbar">
								{filteredData.length > 0 ? (
									filteredData.map((center, index) => (
										<div className="slotCard" key={index}>
											<SlotCard data={center} />
										</div>
									))
								) : (
									<div
										className="slotsNotFoundContainer"
										style={{ display: !apiFetching && 'none' }}
									>
										<span>
											No slots available according to your filters <br /> We
											will notify you as soon as a vacant slot appears!
										</span>
										<div className="loader-cont">
											<Loader />
										</div>
									</div>
								)}
							</div>
						</div>
						<div className="registerContainer">
							<h3 className="registerContainer-head">Register through</h3>
							<a
								href="https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en_IN&gl=US"
								target="blank"
							>
								<img
									src={PUBLIC_IMAGE_PATH + 'arogya.png'}
									className="registerContainer-img"
									alt=""
								/>
							</a>
							<a href="https://web.umang.gov.in/landing/" target="blank">
								<img
									src={PUBLIC_IMAGE_PATH + 'umang.png'}
									className="registerContainer-img"
									alt=""
								/>
							</a>
							<a href="https://www.cowin.gov.in/home" target="blank">
								<img
									src={PUBLIC_IMAGE_PATH + 'cowin.png'}
									className="registerContainer-img"
									alt=""
								/>
							</a>
						</div>
					</div>
				</div>

				{showToast.status && (
					<Toast
						heading={showToast.message.head}
						content={showToast.message.content}
						resetToast={() =>
							setShowToast({
								status: false,
								message: { head: '', content: '' }
							})
						}
					/>
				)}
			</MaxWidthWrapper>

			<Footer />
		</div>
	);
}

export default App;
