import * as types from '../constants/ActionTypes';

export function noticePage(state = {}, action) {
	switch (action.type) {
		case types.NOTICE_LOADED:
			return Object.assign({}, state, {
				data: action.data
			});
		default:
			return state;
	}
}
