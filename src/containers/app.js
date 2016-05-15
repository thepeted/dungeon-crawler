import { connect } from 'react-redux';
import React from 'react';


import Footer from '../containers/footer'
import Game from '../containers/game';
import Header from '../components/header';
import Messages from '../containers/messages';
import PlayerSettings from '../containers/player-settings';
import Scoreboard from '../components/scoreboard';

const App = ({grid, player}) => {
	return (
		<div>
			<Header level={grid.dungeonLevel}/>
			<div id="app">
				<Game/>
				<div className="sidebar">
					<Scoreboard player={player}/>
					<PlayerSettings/>
					<Messages/>
				</div>
			</div>
			<Footer/>
		</div>
	);
};

const mapStateToProps = ({ grid, player }) => {
	return { grid, player }
}

export default connect(mapStateToProps)(App);
