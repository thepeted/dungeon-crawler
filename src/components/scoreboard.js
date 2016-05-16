import React from 'react';
import Score from './score';

export default ({ grid, player }) => {
	return (
		<div className="panel scoreboard">
			<Score
				iconClass="potion"
				title="Health"
				value={player.health}
				/>
			<Score
				iconClass={`back-${grid.dungeonLevel}`}
				title="Zone"
				value={grid.dungeonLevel}
				/>
			<Score
				iconClass="weapon"
				title={"Weapon"}
				value={`${player.weapon.name} (DMG: ${player.weapon.damage})`}
				/>
			<Score
				iconClass="player"
				title="Level"
				value={Math.floor(player.xp / 100)}
				/>
			<Score
				iconClass="triangle"
				title="XP to level up"
				value={100 - player.xp % 100}
				/>
		</div>
	);
};
