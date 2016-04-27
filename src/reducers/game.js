import update from 'react-addons-update';

import createLevel from '../bin/map-creator';
import { STARTING_ROOM_POSITION } from '../constants/settings';
//import { ADD_WEAPON, ADD_XP, ADVANCE_DUNGEON, FOG_MODE, MODIFY_HEALTH, UPDATE_ENEMY,  CREATE_LEVEL } from '../constants/action-types'
import * as t from '../constants/action-types';

let initialState = {
  entities: createLevel(),
  dungeonLevel: 1,
  fogMode: true,
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
    case t.ADD_WEAPON:
      return Object.assign({}, state, {playerWeapon: action.payload});
    case t.ADD_XP:
      return Object.assign({}, state, {playerXP: state.playerXP + action.payload});
    case t.ADVANCE_DUNGEON:
      return Object.assign({}, state, {dungeonLevel: state.dungeonLevel + 1});
    case t.CHANGE_ENTITY:
      let [x, y] = action.payload.coords;
      let updatedEntities =  update(state.entities, {
        [y]: {
          [x]: {$set: action.payload.entity }
        }
      })
      return Object.assign({}, state, {entities: updatedEntities})
    case t.CHANGE_PLAYER_POSITION:
      return Object.assign({}, state, {playerPosition: action.payload})
    case t.CREATE_LEVEL:
      return Object.assign({}, state, {playerPosition: STARTING_ROOM_POSITION}, {entities: action.payload});
    case t.TOGGLE_FOG_MODE:
      return Object.assign({}, state, {fogMode: !state.fogMode})
    case t.MODIFY_HEALTH:
      return Object.assign({},state,{playerHealth: state.playerHealth + action.payload});
    default:
      return state;
  }
}
