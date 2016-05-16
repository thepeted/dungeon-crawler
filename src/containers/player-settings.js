import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleFogMode, restartGame } from '../actions';

class PlayerSettings extends Component {
	constructor() {
		super();
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyPress);
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyPress);
	}

	render() {
		const { fogMode, restartGame, toggleFogMode } = this.props;
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
				<div className="score-item">
					<div onClick={restartGame} className="restart-btn"></div>
					<span onClick={restartGame} className="setting-label">Restart</span>
				</div>
			</div>
		);
	}
	handleKeyPress(e) {
		switch (e.keyCode) {
			// north
			case 70:
				this.props.toggleFogMode();
				break;
			case 82:
				this.props.restartGame();
				break;
			default:
				return;
		}
	}
}

const mapStateToProps = ({ ui }) => {
	return { fogMode: ui.fogMode };
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleFogMode: () => dispatch(toggleFogMode()),
		restartGame: () => dispatch(restartGame())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerSettings);
