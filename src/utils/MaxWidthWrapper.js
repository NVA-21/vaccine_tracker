import React from 'react';

export default function MaxWidthWrapper({ children }) {
	return (
		<div
			style={{
				maxWidth: 1280,
				margin: 'auto',
				height: '100%'
			}}
		>
			{children}
		</div>
	);
}
