import React, { Component } from 'react';

export default class extends Component {
	constructor() {
		super();
		this.state = {
			tips: [
				`Use WASD or arrow keys to move`,
				`Defeat the Boss in Zone 4 to win`,
				`Toggle Fog Mode with the 'F' key`,
				`Restart the game with the 'R' key`,
				`Defeat enemies to increase your XP`,
				`Level up to increase your damage`,
				`A new weapon might not be as good as your current one `,
				`Be sure to gain as much XP as you can in each zone`
			],
			displayIdx: 0,
			intervalId: null
		};
	}
	componentDidMount() {
		let counter = 1;
		const intervalId = setInterval(() => {
			if (counter === this.state.tips.length) {
				counter = 0;
			}
			this.setState({
				displayIdx: counter
			});
			counter++;
		}, 10000);

		this.setState({
			intervalId
		});
	}
	componentWillUnmount() {
		clearInterval(this.state.intervalId);
	}
	render() {
		return (
			<div className="strip">
				<p> Tip: {this.state.tips[this.state.displayIdx]}</p>
			</div>
		);
	}
}
