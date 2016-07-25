import * as types from '../constants/ActionTypes';

export function articleList(state = {}, action) {
	console.log(action.type, state)
	switch (action.type) {
		case types.FETCH_ARTICALES:
			if (!action.isAppend) {
				return Object.assign({}, state, {
					data: action.posts,
					loading: false,
					appending: false
				});
			} else {
				return Object.assign({}, state, {
					data: state.data.concat(action.posts),
					loading: false,
					appending: false
				});
			}
		case types.ISAPPENDING_ARTICALES:
			return Object.assign({}, state,{
				appending: true
			});
		default:
			return state;
	}
}