import React from 'react';
import { secondaryColor } from '../../utils/Theme';
import './SlotsCard.css';

const SlotCard = props => {
	const data = props.data;

	return (
		<>
			<h5 className="center-name">{data.name}</h5>
			<p className="center-location">
				{data.district_name} - {data.pincode}
			</p>

			<div className="center-vaccineDetails">
				<div>{data.sessions[0].vaccine && data.sessions[0].vaccine}</div>

				<div>
					{data.sessions[0].min_age_limit && data.sessions[0].min_age_limit < 45
						? '18-44'
						: '45+'}
				</div>

				<div>
					{data.fee_type && data.fee_type === 'Paid' ? (
						<>
							Paid{' '}
							<span style={{ color: secondaryColor, fontSize: '12px' }}>
								(₹{data.vaccine_fees[0].fee && data.vaccine_fees[0].fee})
							</span>
						</>
					) : (
						'Free'
					)}
				</div>
			</div>

			{data.sessions &&
				data.sessions.map((session, index) => (
					<div className="center-vaccineDetails" key={index}>
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
					</div>
				))}
		</>
	);
};

export default SlotCard;
