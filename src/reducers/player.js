import * as t from '../constants/action-types';

const initialState = {
  playerHealth: 100,
  playerXP: 100,
  playerWeapon: {
    name: 'Taser',
    damage: 10
  }
}

export default (state = initialState, action) => {
  switch (action.type){
    case t.ADD_WEAPON:
      return Object.assign({}, state, {playerWeapon: action.payload});
    case t.ADD_XP:
      return Object.assign({}, state, {playerXP: state.playerXP + action.payload});
    case t.MODIFY_HEALTH:
      return Object.assign({},state,{playerHealth: state.playerHealth + action.payload});
    default:
      return state;
  }
}
