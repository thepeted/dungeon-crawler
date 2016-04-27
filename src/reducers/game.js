import update from 'react-addons-update';

import createLevel from '../bin/map-creator';
import { STARTING_ROOM_POSITION } from '../constants/settings';
import { FOG_MODE, PLAYER_MOVE, MODIFY_HEALTH, ADD_WEAPON, UPDATE_ENEMY, ADD_XP,
ADVANCE_DUNGEON, CREATE_LEVEL } from '../constants/action-types'


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
    case ADD_WEAPON:
      return Object.assign({}, state, {playerWeapon: action.payload});
    case ADD_XP:
      return Object.assign({}, state, {playerXP: state.playerXP + action.payload});
    case ADVANCE_DUNGEON:
      return Object.assign({}, state, {dungeonLevel: state.dungeonLevel + 1});
    case CREATE_LEVEL:
      return Object.assign({}, state, {playerPosition: STARTING_ROOM_POSITION}, {entities: action.payload});
    case FOG_MODE:
      console.log("fogMode");
      return Object.assign({}, state, {fogMode: !state.fogMode})
    case MODIFY_HEALTH:
      return Object.assign({},state,{playerHealth: state.playerHealth + action.payload});
    case PLAYER_MOVE:
      let [ playerX, playerY ] = state.playerPosition.slice(0); //cache current location
      let [ destX, destY ] = action.payload.newCoords; //cache destination
      let entitiesWithUpdatedFloor =  update(state.entities, {
        [playerY]: {
          [playerX]: {$set: {type: 'floor' }}
        }
      })
      let entitiesWithUpdatedPlayer = update(entitiesWithUpdatedFloor, {
        [destY]: {
          [destX]: {$set: action.payload.player}
        }
      })
      return Object.assign({}, state, {playerPosition: [ destX, destY ]}, { entities: entitiesWithUpdatedPlayer });
    case UPDATE_ENEMY:
      let [ enemyX, enemyY ] = action.payload.newCoords; //cache destination
      let entitiesWithUpdatedEnemy = update(state.entities, {
        [enemyY]: {
          [enemyX]: {$set: action.payload.entity}
        }
      })
      return Object.assign({},state, { entities: entitiesWithUpdatedEnemy });
    default:
      return state;
  }
}
