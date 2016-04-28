import _ from 'lodash';
import {batchActions} from 'redux-batched-actions';
import createMap from '../bin/map-creator';
import populateEntities from '../bin/entity-creator';
import * as t from '../constants/action-types';

function addWeapon(payload){
  return {
    type: t.ADD_WEAPON,
    payload
  }
}

function addXP(payload){
  return {
    type: t.ADD_XP,
    payload
  }
}

function advanceDungeonLevel() {
  return {
    type: t.ADVANCE_DUNGEON
  }
}

function changeEntity(entity, coords){
  return {
    type: t.CHANGE_ENTITY,
    payload: {entity, coords}
  }
}

function changePlayerPosition(payload){
  return {
    type: t.CHANGE_PLAYER_POSITION,
    payload
  }
}

function createLevel(level){
  return {
    type: t.CREATE_LEVEL,
    payload: populateEntities(createMap(),level)
  }
}

function modifyHealth(payload) {
  return {
    type: t.MODIFY_HEALTH,
    payload
  }
}

export function toggleFogMode() {
  return {
    type: t.TOGGLE_FOG_MODE
  }
}

//a thunk!
export default (vector) => {
  return (dispatch, getState) => {
    const state = getState();
    let [ x, y ] = state.grid.playerPosition.slice(0); //get current location
    let [ vectorX, vectorY ] = vector; //get direction modifier
    let newPosition = [vectorX + x, vectorY + y]; //define where we're moving to
    let player = _.clone(state.grid.entities[y][x]);
    let destination = _.clone(state.grid.entities[y + vectorY][x + vectorX]); //whats in the cell we're heading to

    //move the player unless destination is an enemy or a '0' cell
    if (destination.type && destination.type !== 'enemy') {
      dispatch(batchActions([
        changeEntity({ type: 'floor'}, [x,y] ),
        changeEntity(player, newPosition),
        changePlayerPosition(newPosition)
      ]));
    }

    switch(destination.type){
      case 'enemy':
        let playerLevel = Math.floor(state.player.playerXP / 100);

        //player attacks enemy
        destination.health-= Math.floor(state.player.playerWeapon.damage * _.random(1,1.3) * playerLevel);

        if (destination.health > 0) {
          //enemy attacks player
          let damageTaken = 0 - Math.floor(_.random(5,7) * destination.level);
          dispatch(changeEntity(destination , newPosition));
          dispatch(modifyHealth(damageTaken));
        }
        if (destination.health <= 0){
          //the fight is over and the player has won
          //add XP and move the player
          dispatch(batchActions([
            addXP(20 * destination.level),
            changeEntity({ type: 'floor'}, [x,y] ),
            changeEntity(player, newPosition),
            changePlayerPosition(newPosition)
          ]));
        }
        break
      case 'exit':
        dispatch(createLevel(state.grid.dungeonLevel + 1))
        dispatch(advanceDungeonLevel());
        break
      case 'potion':
        dispatch(modifyHealth(20));
        break
      case 'weapon':
        dispatch(addWeapon(destination));
        break
      default:
        return //do nothing
    }
  }
}
