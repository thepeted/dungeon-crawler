import * as t from '../constants/action-types';

let messages = [
  "Player 1 died",
  "Player 1 won",
  "Player 1 attacks orc for 3XP",
  "etc..",
  "Game over",
  "You win",
  "Entering new dungeon"
]

const initialState = {
  fogMode: true,
  messages
}

export default (state = initialState, action) => {
  switch(action.type){
    case t.TOGGLE_FOG_MODE:
      return Object.assign({}, state, {fogMode: !state.fogMode})
    default:
      return state;
  }
}
