import React, { Component } from 'react';

class Footer extends Component {
	constructor() {
		super();
		this.state = {
			tips: [
				`Use WASD or arrow keys to move`,
				`Defeat the Boss in Zone 4 to win`,
				`Toggle Fog Mode with the 'F' key`,
				`Restart the game with the 'R' key`,
				`Defeat enemies to increase your XP`,
				`Level up to increase your damage`
			],
			displayIdx: 1,
			intervalId: null
		}
	}
	componentDidMount() {
		let counter = 0;
		this.state.intervalId = setInterval(()=> {
			if (counter === this.state.tips.length) {
				counter = 0;
			}
			this.setState({
				displayIdx: counter
			});
			counter++;
		},10000);
	}
	componentWillUnmount() {
		clearInterval(this.state.intervalId);
	}
	render() {
		return (
			<div className='strip'>
	    	<p> Tip: {this.state.tips[this.state.displayIdx]}</p>
	    </div>
		)
	}
}

export default Footer
