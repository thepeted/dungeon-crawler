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

      let [ x, y ] = state.playerPosition.slice(0); //get current location
      let [ vectorX, vectorY ] = action.payload; //get modifier
      let newPosition = [vectorX + x, vectorY + y]; //define where we're moving to

      let entities = _.cloneDeep(state.entities);
      entities[newPosition[1]][newPosition[0]] = entities[y][x]; //move the player
      entities[y][x] = { type: 'floor' } // replace current location with a floor tile

      return Object.assign({}, state, {playerPosition: newPosition}, { entities })
    default:
      return state;
  }
}
