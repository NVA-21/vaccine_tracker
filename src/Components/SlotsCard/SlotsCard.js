import React from 'react';
import './SlotsCard.css';

const SlotCard = props => {
	const data = props.data;
	console.log(props.data);
	return (
		<>
			<h5 className="center-name">
				{/* DGD KONDLI MAYUR VIHAR PHASE 3 */}
				{data.name}
			</h5>
			<p className="center-location">
				{/* Pocket A 2 Sector C Gharoli Delhi, East Delhi, Delhi, 110096 */}
				{/* {data.address}, */}
				{data.district_name} - {data.pincode}
			</p>

			<div className="center-vaccineDetails">
				<div>{data.sessions[0].vaccine}</div>

				<div>{data.sessions[0].min_age_limit < 45 ? '18-44' : '45+'}</div>

				<div>
					{data.fee_type === 'Paid' ? (
						<>
							Paid{' '}
							<span style={{ color: 'red' }}>
								(₹{data.vaccine_fees[0].fee})
							</span>
						</>
					) : (
						'Free'
					)}
				</div>
			</div>

			{data.sessions.map((session, index) => (
				<div className="center-vaccineDetails" key={index}>
					{/* <div className="slots-table-set"> */}
					<div className="date">{session.date}</div>
					<div
						className="slots"
						style={{
							background:
								session.available_capacity_dose1 > 0 &&
								session.available_capacity_dose1 < 11
									? 'yellow'
									: !session.available_capacity_dose1 && 'red',
							color: !session.available_capacity_dose1 && '#fff'
						}}
					>
						<span>Dose 1</span>
						<span className="slots-value">
							{session.available_capacity_dose1}
						</span>
					</div>
					<div
						className="slots"
						style={{
							background:
								session.available_capacity_dose2 > 0 &&
								session.available_capacity_dose2 < 11
									? 'yellow'
									: !session.available_capacity_dose2 && 'red',
							color: !session.available_capacity_dose2 && '#fff'
						}}
					>
						<span>Dose 2</span>
						<span className="slots-value">
							{session.available_capacity_dose2}
						</span>
					</div>
					{/* </div> */}
				</div>
			))}
		</>
	);
};

export default SlotCard;
