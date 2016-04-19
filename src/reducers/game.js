import _ from 'lodash'
import createLevel from '../bin/map-creator';
import { STARTING_ROOM_POSITION } from '../constants/settings';
import { PLAYER_MOVE, ADD_HEALTH, ADD_WEAPON } from '../constants/action-types'


let initialState = {
  entities: createLevel(),
  playerPosition: STARTING_ROOM_POSITION,
  playerHealth: 100,
  playerWeapon: {
    name: 'Wooden Sword',
    damage: 10
  }
}

export default (state = initialState, action) => {
  switch(action.type) {
    case PLAYER_MOVE:
      let [ x, y ] = state.playerPosition.slice(0); //cache current location
      let [ destX, destY ] = action.payload.newCoords; //cache destination
      let entities = _.cloneDeep(state.entities);
      entities[destY][destX] = action.payload.player; //move the player to dest
      entities[y][x] = { type: 'floor' } // replace current location with a floor tile
      return Object.assign({}, state, {playerPosition: [ destX, destY ]}, { entities })
    case ADD_HEALTH:
      return Object.assign({},state,{playerHealth: state.playerHealth + 20})
    default:
      return state;
    case ADD_WEAPON:
    console.log(action.payload.weapon)
      return Object.assign({}, state, {playerWeapon: action.payload.weapon})
  }
}
