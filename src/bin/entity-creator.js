export const createEnemy = (level) => {

  return {
    health: 100,
    level,
    type: 'enemy'
  }
}

export const createPlayer = () => {
  let player = {
    level: 1,
    type: 'player',
    weapon: {
      type: 'Wooden Sword',
      damage: 10
    }
  }
  return player
}
