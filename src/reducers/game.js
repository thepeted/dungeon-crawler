import _ from 'lodash'
import createLevel from '../bin/level-creator';
import { STARTING_ROOM_POSITION } from '../constants/settings';
import * as types from '../constants/action-types'


let initialState = {
  entities: createLevel(),
  playerPosition: { x: STARTING_ROOM_POSITION + 2, y: STARTING_ROOM_POSITION + 2}
}

export default (state = initialState, action) => {
  switch(action.type) {
    case types.PLAYER_MOVE:
      let { x, y } = state.playerPosition;
      let [ nextX, nextY ] = action.payload;
      //if the move isn't valid don't move the player
      if (!state.entities[y + nextY][x + nextX]) return state;
      //if the move is valid we can update the state
      let newState = _.clone(state);
      newState.entities[y][x] = 1; //replace the old space with a floor tile
      newState.entities[y + nextY][x + nextX] = 2;
      newState.playerPosition.x = x + nextX;
      newState.playerPosition.y = y + nextY;

      return newState;
    default:
      return state;
  }
}
