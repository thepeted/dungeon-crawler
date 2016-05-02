import update from 'react-addons-update';
import createLevel from '../bin/map-creator';
import populateEntities from '../bin/entity-creator';
import * as t from '../constants/action-types';

const {
  entities,
  dungeonLevel,
  playerPosition
} = populateEntities(createLevel());

let initialState = { entities, dungeonLevel, playerPosition };

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case t.CHANGE_ENTITY:
      let [x, y] = payload.coords;
      let entities =  update(state.entities, {
        [y]: {
          [x]: {$set: payload.entity }
        }
      });
      return { ...state, entities }
    case t.CHANGE_PLAYER_POSITION:
      return { ...state, playerPosition: payload };
    case t.CREATE_LEVEL:
      return {
        ...state,
        playerPosition: payload.playerPosition,
        entities: payload.entities
      };
    case t.SET_DUNGEON_LEVEL:
      return { ...state, dungeonLevel: payload };
    default:
      return state;
  }
}
