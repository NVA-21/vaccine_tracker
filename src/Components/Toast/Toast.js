import React, { useEffect } from 'react';
import './Toast.css';

const Toast = ({ resetToast, heading, content }) => {
	// Disabling toast after 3second
	useEffect(() => {
		setTimeout(function () {
			resetToast();
		}, 3000);
	}, [resetToast]);

	return (
		<div id="toast" className={'show'}>
			<p className="toast-head">{heading}</p>
			<p className="toast-content">{content}</p>
		</div>
	);
};

export default Toast;
