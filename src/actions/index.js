import { ADD_HEALTH, PLAYER_MOVE, ADD_WEAPON } from '../constants/action-types';

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

function addWeapon(weapon){
  return {
    type: ADD_WEAPON,
    payload: { weapon }
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
    let destination = state.game.entities[y + vectorY][x + vectorX]; //whats in the cell we're heading to

    switch(destination.type){
      case 'floor':
        dispatch(playerMove(player ,newPosition));
        break
      case 'potion':
        dispatch(addHealth());
        dispatch(playerMove(player ,newPosition));
        break
      case 'weapon':
        dispatch(addWeapon(destination));
        dispatch(playerMove(player ,newPosition));
        break
      default:
        return //do nothing
    }
  }

}
