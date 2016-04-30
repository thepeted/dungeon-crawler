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

function newMessage(payload) {
  return {
    type: t.NEW_MESSAGE,
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

    // cache some useful variables
    let [ x, y ] = state.grid.playerPosition.slice(0); //get current location
    let [ vectorX, vectorY ] = vector; //get direction modifier
    let newPosition = [vectorX + x, vectorY + y]; //define where we're moving to
    let player = _.clone(state.grid.entities[y][x]);
    let destination = _.clone(state.grid.entities[y + vectorY][x + vectorX]); //whats in the cell we're heading to

    // store the actions in array to be past to batchActions
    let actions = []

    //move the player unless destination is an enemy or a '0' cell
    if (destination.type && destination.type !== 'enemy') {
      actions.push(
        changeEntity({ type: 'floor'}, [x,y] ),
        changeEntity(player, newPosition),
        changePlayerPosition(newPosition)
      )
    }

    switch(destination.type){
      case 'enemy':
        let playerLevel = Math.floor(state.player.playerXP / 100);
        //player attacks enemy
        let enemyDamageTaken = Math.floor(state.player.playerWeapon.damage * _.random(1,1.3) * playerLevel);
        destination.health-= enemyDamageTaken

        if (destination.health > 0) {
          //enemy attacks player
          let playerDamageTaken = Math.floor(_.random(5,7) * destination.level);

          actions.push(
            changeEntity(destination , newPosition),
            modifyHealth(0 - playerDamageTaken),
            newMessage(`FIGHT! You hurt the enemy with attack of ${enemyDamageTaken}.  The enemy hits back with an attack of ${playerDamageTaken}`)
          );
        }

        if (destination.health <= 0){
          //the fight is over and the player has won
          //add XP and move the player
          actions.push(
            addXP(20 * destination.level),
            changeEntity({ type: 'floor'}, [x,y] ),
            changeEntity(player, newPosition),
            changePlayerPosition(newPosition),
            newMessage(`VICTORY! Your attack of ${enemyDamageTaken} is too powerful for the enemy, who dissolves before your very eyes.`)
          );

          setTimeout(() => dispatch(newMessage(`You gain 20XP and feel yourself growing stronger..`)),2500);

          if ((state.player.playerXP + 20) % 100 === 0) {
            setTimeout(() => dispatch(newMessage(`LEVEL UP!`)),5000)
          }
        }
        break
      case 'exit':
        actions.push(
          createLevel(state.grid.dungeonLevel + 1),
          advanceDungeonLevel(),
          newMessage(`The cells start to shift... you find yourself in zone ${state.grid.dungeonLevel + 1}`)
        );
        break
      case 'potion':
        actions.push(
          modifyHealth(20),
          newMessage(`You drink a potion for 20 health`)
        );
        break
      case 'weapon':
        actions.push(
          addWeapon(destination),
          newMessage(`You pick up the ${destination.name}`)
        )
        break
      default:
        break
    }
    dispatch(batchActions(actions));
  }
}
