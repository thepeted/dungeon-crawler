import { ADD_HEALTH, PLAYER_MOVE } from '../constants/action-types';

function playerMove(player, newCoords) {
  return {
    type: PLAYER_MOVE,
    payload: { player, newCoords }
  }
}

function addHealth() {
  return {
    type: ADD_HEALTH
  }
}

//a thunk!
export default (vector) => {
  return (dispatch, getState) => {
    const state = getState();
    let [ x, y ] = state.game.playerPosition.slice(0); //get current location
    let [ vectorX, vectorY ] = vector; //get direction modifier
    let newPosition = [vectorX + x, vectorY + y]; //define where we're moving to
    let player = state.game.entities[y][x];
    let destination = state.game.entities[y + vectorY][x + vectorX].type; //whats in the cell we're heading to

    switch(destination){
      case 'floor':
        dispatch(playerMove(player, newPosition));
        break
      case 'potion':
        dispatch(addHealth());
        dispatch(playerMove(player,newPosition));
      default:
        return //do nothing
    }
  }


}
