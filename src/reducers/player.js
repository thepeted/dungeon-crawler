import * as t from '../constants/action-types';

const initialState = {
	health: 100,
	xp: 100,
	weapon: {
		name: 'Taser',
		damage: 10
	}
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case t.ADD_WEAPON:
			return { ...state, weapon: payload };
		case t.ADD_XP:
			return { ...state, xp: state.xp + payload };
		case t.MODIFY_HEALTH:
			return { ...state, health: payload };
		case t.RESTART:
			return initialState;
		default:
			return state;
	}
};
