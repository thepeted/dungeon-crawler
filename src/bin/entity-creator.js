import _ from 'lodash';
import * as c from '../constants/settings';

export default (gameMap, level = 1) => {
	// 1. create the entities
	const bosses = [];
	if (level === 4) {
		bosses.push({
			health: 400,
			level: 5,
			type: 'boss'
		});
	}

	const enemies = [];
	for (let i = 0; i < 7; i++) {
		enemies.push({
			health: level * 30 + 40,
			// half of the enememies will be a level higher or lower (except on
			// level 1, where ~1/4 enemies are a level higher)
			level: _.random(level, _.random(level - 1 ? level - 1 : level, level + 1)),
			type: 'enemy'
		});
	}

	const exits = [];
	if (level < 4) {
		exits.push({
			type: 'exit'
		});
	}

	const players = [
		{
			type: 'player'
		}
	];

	const potions = [];
	for (let i = 0; i < 5; i++) {
		potions.push({ type: 'potion' });
	}

	const weaponTypes = [
		{
			name: 'Laser Pistol',
			damage: 15
		},
		{
			name: 'Laser Rifle',
			damage: 19
		},
		{
			name: 'Plasma Pistol',
			damage: 26
		},
		{
			name: 'Plasma Rifle',
			damage: 28
		},
		{
			name: 'Electric ChainSaw',
			damage: 31
		},
		{
			name: 'Railgun',
			damage: 33
		},
		{
			name: 'Dark Energy Cannon',
			damage: 40
		},
		{
			name: 'B.F.G',
			damage: 43
		}
	];

	const weapons = [];
	// weapon types will vary based on the level passed to the parent function
	const qualifying = weaponTypes
		.filter(weapon => weapon.damage < level * 10 + 10)
			.filter(weapon => weapon.damage > level * 10 - 10);
	for (let i = 0; i < 3; i++) {
		const weapon = Object.assign({}, qualifying[_.random(0, qualifying.length - 1)]);
		weapon.type = 'weapon';
		weapons.push(weapon);
	}

	// 2. randomly place all the entities on to floor cells on the game map.

	// we'll need to return the players starting co-ordinates
	let playerPosition = [];
	[potions, enemies, weapons, exits, players, bosses].forEach(entities => {
		while (entities.length) {
			const x = Math.floor(Math.random() * c.GRID_WIDTH);
			const y = Math.floor(Math.random() * c.GRID_HEIGHT);
			if (gameMap[y][x].type === 'floor') {
				if (entities[0].type === 'player') {
					playerPosition = [x, y];
				}
				gameMap[y][x] = entities.pop();
			}
		}
	});

	// 3. we can now replace doors with floors
	for (let i = 0; i < gameMap.length; i++) {
		for (let j = 0; j < gameMap[0].length; j++) {
			if (gameMap[i][j].type === 'door') {
				gameMap[i][j].type = 'floor';
			}
		}
	}
	return {entities: gameMap, playerPosition};
};
