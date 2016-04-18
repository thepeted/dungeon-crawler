import { PLAYER_MOVE } from '../constants/action-types';

export function playerMove(vector) {
  return {
    type: PLAYER_MOVE,
    payload: vector
  }
}
