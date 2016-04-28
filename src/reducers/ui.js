import * as t from '../constants/action-types';

const initialState = {
  fogMode: true
}

export default (state = initialState, action) => {
  switch(action.type){
    case t.TOGGLE_FOG_MODE:
      return Object.assign({}, state, {fogMode: !state.fogMode})
    default:
      return state;
  }
}
