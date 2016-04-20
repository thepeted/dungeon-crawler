import _ from 'lodash'
import createLevel from '../bin/map-creator';
import { STARTING_ROOM_POSITION } from '../constants/settings';
import { PLAYER_MOVE, MODIFY_HEALTH, ADD_WEAPON, UPDATE_ENEMY, ADD_XP,
ADVANCE_DUNGEON, CREATE_LEVEL } from '../constants/action-types'


let initialState = {
  entities: createLevel(),
  dungeonLevel: 1,
  playerHealth: 100,
  playerPosition: STARTING_ROOM_POSITION,
  playerXP: 100,
  playerWeapon: {
    name: 'Taser',
    damage: 10
  }
}

export default (state = initialState, action) => {

  switch(action.type) {
    case ADD_WEAPON:
      return Object.assign({}, state, {playerWeapon: action.payload});
    case ADD_XP:
      return Object.assign({}, state, {playerXP: state.playerXP + action.payload});
    case ADVANCE_DUNGEON:
      return Object.assign({}, state, {dungeonLevel: state.dungeonLevel + 1});
    case CREATE_LEVEL:
      return Object.assign({}, state, {playerPosition: STARTING_ROOM_POSITION}, {entities: action.payload});
    case MODIFY_HEALTH:
      return Object.assign({},state,{playerHealth: state.playerHealth + action.payload});
    case PLAYER_MOVE:
      let entities = _.cloneDeep(state.entities);
      let [ x, y ] = state.playerPosition.slice(0); //cache current location
      let [ destX, destY ] = action.payload.newCoords; //cache destination
      entities[destY][destX] = action.payload.player; //move the player to dest
      entities[y][x] = { type: 'floor' } // replace current location with a floor tile
      return Object.assign({}, state, {playerPosition: [ destX, destY ]}, { entities });
    case UPDATE_ENEMY:
      let entities1 = _.cloneDeep(state.entities);
      let [ enemyX, enemyY ] = action.payload.newCoords; //cache destination
      entities1[enemyX][enemyY] = action.payload.entity;
      return Object.assign({},state, { entities1 });
    default:
      return state;
  }
}
