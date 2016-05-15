import update from 'react-addons-update';
import * as t from '../constants/action-types';

const initialState = {
	entities: [[]],
	dungeonLevel: 0,
	playerPosition: []
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case t.CHANGE_ENTITY: {
			const [x, y] = payload.coords;
			const entities =	update(state.entities, {
				[y]: {
					[x]: {$set: payload.entity }
				}
			});
			return { ...state, entities };
		}
		case t.CHANGE_PLAYER_POSITION:
			return { ...state, playerPosition: payload };
		case t.CREATE_LEVEL:
			return {
				...state,
				playerPosition: payload.playerPosition,
				entities: payload.entities
			};
		case t.SET_DUNGEON_LEVEL:
			return { ...state, dungeonLevel: payload };
		default:
			return state;
	}
};
