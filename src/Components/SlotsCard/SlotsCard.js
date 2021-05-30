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

				<div>{data.sessions[0].min_age_limit}</div>

				<div>{data.fee_type}</div>
			</div>

			{data.sessions.map((session, index) => (
				<div className="slots-table-container" key={index}>
					<div className="slots-table-set">
						<h6 className="date">{session.date}</h6>
						<h6 className="slots">{session.available_capacity}</h6>
					</div>

					<div className="slots-table-set">
						<p className="vaccine-category">{session.vaccine}</p>
						<p className="vaccine-category">Age {session.min_age_limit}</p>
					</div>
				</div>
			))}
		</>
	);
};

export default SlotCard;
