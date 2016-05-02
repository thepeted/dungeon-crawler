import React from 'react';
import { connect } from 'react-redux';

import { toggleFogMode } from '../actions';

const PlayerSettings = ({ fogMode, toggleFogMode }) => {
	return (
		<div className="panel">
			<div className="score-item">
				<input
					onChange={toggleFogMode}
					id="toggle"
					type="checkbox"
					checked={fogMode}
					/>
				<label htmlFor="toggle">
				Toggle fog mode
				</label>
			</div>
		</div>
	);
};

const mapStateToProps = ({ ui }) => {
	return { fogMode: ui.fogMode };
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleFogMode: () => dispatch(toggleFogMode())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerSettings);
