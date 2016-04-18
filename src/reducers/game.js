import _ from 'lodash'
import createLevel from '../bin/map-creator';
import { STARTING_ROOM_POSITION } from '../constants/settings';
import { PLAYER_MOVE, ADD_HEALTH } from '../constants/action-types'


let initialState = {
  entities: createLevel(),
  playerPosition: STARTING_ROOM_POSITION,
  playerHealth: 100
}

export default (state = initialState, action) => {
  switch(action.type) {
    case PLAYER_MOVE:

      let [ x, y ] = state.playerPosition.slice(0); //get current location
      // let [ vectorX, vectorY ] = action.payload; //get modifier
      // let newPosition = [vectorX + x, vectorY + y]; //define where we're moving to
      let newPosition = action.payload.newCoords;
      let entities = _.cloneDeep(state.entities);
      entities[newPosition[1]][newPosition[0]] = action.payload.player; //move the player
      entities[y][x] = { type: 'floor' } // replace current location with a floor tile

      return Object.assign({}, state, {playerPosition: newPosition}, { entities })

    case ADD_HEALTH:
      return Object.assign({},state,{playerHealth: state.playerHealth + 20})
    default:
      return state;
  }
}
