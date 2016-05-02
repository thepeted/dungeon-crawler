import React from 'react';

export default ({ cell, distance, visible, zone }) => {
	let opacityValue = cell.opacity;
	if (visible && distance > 10) {
		opacityValue = 0;
	} else if (cell.type !== 0) {
		opacityValue = 1;
	}

	return (
		<div
			className={cell.type ? `${cell.type} cell` : `back-${zone} cell`}
			style={{opacity: opacityValue}}
			/>
	);
};
