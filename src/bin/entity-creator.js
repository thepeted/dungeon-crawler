import _ from 'lodash';
import * as c from '../constants/settings';

export default (world, level = 1) => {
// set starting player posiiton

	const bosses = [];
	if (level === 4) {
		bosses.push({
			health: 20,
			level: 1,
			type: 'boss'
		});
	}

	const enemies = [];
	for (let i = 0; i < 7; i++) {
		enemies.push({
			health: 100,
			// half of the enememies will be a level higher or lower (except on
			// level 1, where ~1/4 enemies level higher)
			level: _.random(level, _.random(level - 1 ? level - 1 : level, level + 1)),
			type: 'enemy'
		});
	}

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
			damage: 23
		},
		{
			name: 'Plasma Pistol',
			damage: 26
		},
		{
			name: 'Plasma Rifle',
			damage: 30
		},
		{
			name: 'Electric ChainSaw',
			damage: 33
		},
		{
			name: 'Railgun',
			damage: 37
		},
		{
			name: 'Dark Energy Cannon',
			damage: 40
		},
		{
			name: 'B.F.G',
			damage: 49
		}
	];

	const weapons = [];
	const qualifying = weaponTypes
		.filter(weapon => weapon.damage < level * 10 + 20)
      .filter(weapon => weapon.damage > level * 10 - 10);

	for (let i = 0; i < 3; i++) {
		const randomNum = _.random(0, qualifying.length - 1);
		const weapon = _.clone(qualifying[randomNum]);
		weapon.type = 'weapon';
		weapons.push(weapon);
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

	let playerStartingPosition = [];

	const entityCollection = [potions, enemies, weapons, exits, players, bosses];
	entityCollection.forEach(entities => {
		while (entities.length) {
			const x = Math.floor(Math.random() * c.GRID_WIDTH);
			const y = Math.floor(Math.random() * c.GRID_HEIGHT);
			if (world[y][x].type === 'floor') {
				if (entities[0].type === 'player') {
					playerStartingPosition = [x, y];
				}
				world[y][x] = entities.pop();
			}
		}
	});

	const availableFloorCells = [];
	world.map((row, i) => {
		return row.forEach((cell, j) => {
			if (cell.type === 'floor') {
				availableFloorCells.push({x: j, y: i});
			}
		});
	});

	return {entities: world, playerPosition: _.clone(playerStartingPosition), dungeonLevel: level};
};
