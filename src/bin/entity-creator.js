import _ from 'lodash';
import * as c from '../constants/settings';

export default (world, level = 1) => {
  //set starting player posiiton

  let bosses = [];
  if (level === 4){
    bosses.push({
      health: 20, // value is just for testing :)
      level: 1, // value is just for testing :)
      type: 'boss',
    })
  }

  let enemies = [];
  for (let i = 0; i < 7; i++) {
    enemies.push({
      health: 100,
      //half of the enememies will be a level higher or lower (except on
      //level 1, where ~1/4 enemies level higher)
      level: _.random(level, _.random(level - 1 ? level -1 : level, level + 1)),
      type: 'enemy'
    });
  }

  let potions = [];
  for (let i = 0; i < 5; i++) {
    potions.push({ type: 'potion' });
  }

  let weaponTypes = [
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

  let weapons = [];
  let qualifying = weaponTypes
    .filter(weapon => weapon.damage < level * 10 + 20 )
      .filter(weapon => weapon.damage > level * 10 - 10)

  for (let i =0; i < 3; i++) {
    let randomNum = _.random(0,qualifying.length-1);
    let weapon = _.clone(qualifying[randomNum]);
    weapon.type = 'weapon';
    weapons.push(weapon);
  }

  let exits = [];
  if (level < 4){
    exits.push({
      type: 'exit'
    })
  }

  let players = [
    {
      type: 'player'
    }
  ];

  let playerStartingPosition = [];

  let entityCollection = [potions, enemies, weapons, exits, players, bosses];
  entityCollection.forEach(entities => {
    while(entities.length){
      let x = Math.floor(Math.random()*c.GRID_WIDTH)
      let y = Math.floor(Math.random()*c.GRID_HEIGHT)
      if (world[y][x].type === 'floor') {
        if (entities[0].type === 'player') {

          playerStartingPosition = [x,y]
        }
        world[y][x] = entities.pop();
      }
    }
  });

  const availableFloorCells = []
  world.map((row, i) => {
    return row.forEach((cell, j) => {
      if (cell.type === "floor") {
        availableFloorCells.push({x: j, y: i})
      }
    })
  })

return {entities: world, playerPosition: _.clone(playerStartingPosition), dungeonLevel: level};
}
