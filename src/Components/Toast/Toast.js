import React, { useEffect } from 'react';
import './Toast.css';

const Toast = props => {
	useEffect(() => {
		setTimeout(function () {
			props.resetToast();
			console.log('resetRequested');
		}, 3000);
	}, []);

	return (
		<div id="toast" className={'show'}>
			{/* <h4>Please Turn on Notifications!</h4>
			<p>To know how to enable it click 'Need Help'</p> */}
			<p className="toast-head">{props.heading}</p>
			<p className="toast-content">{props.content}</p>
		</div>
	);
};

export default Toast;
