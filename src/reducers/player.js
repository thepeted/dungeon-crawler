import _ from 'lodash';

import { PLAYER_MOVE } from '../constants/action-types';
import { STARTING_ROOM_POSITION } from '../constants/settings';


const initialState = {
  position: STARTING_ROOM_POSITION
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PLAYER_MOVE:
      let [x,y] = state.position.slice(0);
      let [nextX, nextY] = action.payload;
      let newLocation = [(x + nextX), (y + nextY)]
      return Object.assign({},state, {position: newLocation});
    default:
      return state;
  }
}
