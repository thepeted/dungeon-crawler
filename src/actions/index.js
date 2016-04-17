import * as types from '../constants/action-types';

export function playerMove(vector) {
  return {
    type: types.PLAYER_MOVE,
    payload: vector
  }
}
