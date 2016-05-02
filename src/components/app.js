import React from 'react';

import Game from '../containers/game';
import Messages from '../containers/messages';
import PlayerSettings from '../containers/player-settings';
import Scoreboard from '../containers/scoreboard';

export default () => {
	return (
		<div id="app">
			<Game/>
			<div className="sidebar">
				<Scoreboard/>
				<PlayerSettings/>
				<Messages/>
			</div>
		</div>
	);
};
