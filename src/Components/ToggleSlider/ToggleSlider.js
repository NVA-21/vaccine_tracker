import React from 'react';
import './ToggleSlider.css';

const ToggleSlider = props => {
	return (
		<div className="toggle">
			<input
				type="radio"
				name="toggleSlider"
				value="pincode"
				id="pincode"
				defaultChecked
			/>
			<label
				htmlFor="pincode"
				onClick={e => {
					props.setSearchMode(e.target.htmlFor);
				}}
			>
				Search by PIN
			</label>

			<input type="radio" name="toggleSlider" value="district" id="district" />
			<label
				htmlFor="district"
				onClick={e => {
					props.setSearchMode(e.target.htmlFor);
				}}
			>
				Search by District
			</label>
		</div>
	);
};

export default ToggleSlider;
