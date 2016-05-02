import * as t from '../constants/action-types';

const messages = [];

const initialState = {
	fogMode: true,
	messages
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case t.NEW_MESSAGE:
			return { ...state, messages: [ ...state.messages, payload ]};
		case t.TOGGLE_FOG_MODE:
			return { ...state, fogMode: !state.fogMode };
		case t.RESTART:
			return initialState;
		default:
			return state;
	}
};
