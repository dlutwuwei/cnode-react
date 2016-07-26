import * as types from '../constants/ActionTypes';

export function articleList(state = {}, action) {
	switch (action.type) {
		case types.FETCH_LIST:
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
			return Object.assign({}, state, {
				appending: true
			});
		default:
			return state;
	}
}

export function fetchArticle(state = {}, action) {
	console.log(action.type, state)

	switch (action.type) {
		case types.FETCH_ARTICLE:
			return Object.assign({}, state, action.data, {
				loading: false
			});
		case types.ISLOADING_ARTICLE:
			return Object.assign({}, state, {
				loading: true
			});
		default:
			return state;
	}
}