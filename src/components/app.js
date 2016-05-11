import React from 'react';

import Footer from '../components/footer'
import Game from '../containers/game';
import Header from '../containers/header';
import Messages from '../containers/messages';
import PlayerSettings from '../containers/player-settings';
import Scoreboard from '../containers/scoreboard';

export default () => {
	return (
		<div>
			<Header/>
			<div id="app">
				<Game/>
				<div className="sidebar">
					<Scoreboard/>
					<PlayerSettings/>
					<Messages/>
				</div>
			</div>
			<Footer/>
		</div>

	);
};
