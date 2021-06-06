import './SelectBox.css';

const SelectBox = props => {
	let arr = [];
	if (props.array) {
		arr = props.array;
	}

	return (
		<div
			className="selectBoxBase"
			style={{
				border: props.error && '1px solid red'
			}}
		>
			<select
				name="select"
				id="select"
				defaultValue={'DEFAULT'}
				onChange={e => {
					props.executeFunction(e.target.value);
				}}
			>
				<option disabled={true} value={'DEFAULT'}>
					{props.title}
				</option>
				{arr.map((item, index) => (
					<option value={item[props.idValue]} key={index}>
						{item[props.labelValue]}
					</option>
				))}
			</select>
		</div>
	);
};

export default SelectBox;
