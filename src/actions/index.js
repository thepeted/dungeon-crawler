import _ from 'lodash';
import { MODIFY_HEALTH, PLAYER_MOVE, ADD_WEAPON, UPDATE_ENEMY, ADD_XP } from '../constants/action-types';
//todo - should rename destination variable


function playerMove(player, newCoords) {
  return {
    type: PLAYER_MOVE,
    payload: { player, newCoords }
  }
}

function modifyHealth(amount) {
  return {
    type: MODIFY_HEALTH,
    payload: amount
  }
}

function addXP(){
  return {
    type: ADD_XP
  }
}

function addWeapon(weapon){
  return {
    type: ADD_WEAPON,
    payload: weapon
  }
}

function updateEnemy(entity, newCoords) {
  return {
    type: UPDATE_ENEMY,
    payload: { entity, newCoords }
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
      case 'enemy':
        let playerLevel = Math.floor(state.game.playerXP / 100);
        destination.health-= Math.floor(
        state.game.playerWeapon.damage * _.random(1,1.3) * playerLevel
        );
        console.log(`playerlevel:${playerLevel} Damage Dealt:${Math.floor(
        state.game.playerWeapon.damage * _.random(1,1.3) * playerLevel
      )}`);
        let damageTaken = 0 - Math.floor(
          (_.random(5,7) * state.game.dungeonLevel)
        );
        if (destination.health > 0) {
          dispatch(updateEnemy(destination, newPosition));
          dispatch(modifyHealth(damageTaken));
          break
        }
        if (destination.health <= 0){
          dispatch(modifyHealth(damageTaken));
          dispatch(addXP());
          dispatch(playerMove(player, newPosition));
          break
        }
      case 'floor':
        dispatch(playerMove(player, newPosition));
        break
      case 'potion':
        dispatch(modifyHealth(20));
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
