import * as t from '../constants/action-types';

let messages = []

const initialState = {
  fogMode: true,
  messages
}

export default (state = initialState, action) => {
  switch(action.type){
    case t.NEW_MESSAGE:
      let messages = state.messages.concat(action.payload)
      return Object.assign({}, state, { messages });
    case t.TOGGLE_FOG_MODE:
      return Object.assign({}, state, {fogMode: !state.fogMode});
    case t.RESTART:
     return initialState;
    default:
      return state;
  }
}
