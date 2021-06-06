import React from 'react';
import './Checkbox.css';

const Checkbox = props => {
	return (
		<div className="checkBoxBase">
			<label className="check-color">
				<input
					type="checkbox"
					value={props.value}
					defaultChecked={props.checked}
					onClick={e =>
						props.executeFunction([e.target.checked, e.target.value])
					}
				/>
				<span className="change-color" />
			</label>
			<label className="check-label">{props.text}</label>
		</div>
	);
};

export default Checkbox;
