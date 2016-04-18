import _ from 'lodash'
import createLevel from '../bin/map-creator';
import { STARTING_ROOM_POSITION } from '../constants/settings';
import { PLAYER_MOVE } from '../constants/action-types'


let initialState = {
  entities: createLevel(),
  playerPosition: STARTING_ROOM_POSITION
}

export default (state = initialState, action) => {
  switch(action.type) {
    case PLAYER_MOVE:
      let [ x, y ] = state.playerPosition;
      let [ nextX, nextY ] = action.payload;
      // if the move isn't valid don't move the player
      // if (!state.entities[y + nextY][x + nextX]) return state;
      // if the move is valid we can update the state
      let newState = _.clone(state);
      newState.entities[y + nextY][x + nextX] = state.entities[y][x]; //move existing player object
      newState.entities[y][x] = { type: 'floor'}; //replace the old space with a floor tile
      newState.playerPosition[1] = x + nextX;
      newState.playerPosition[0] = y + nextY;

      return newState;
    default:
      return state;
  }
}
