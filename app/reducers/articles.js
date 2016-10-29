import * as types from '../constants/ActionTypes';

export function articleList(state = {}, action) {
	switch (action.type) {
		case types.FETCH_LIST:
			if (!action.isAppend) {
				return Object.assign({}, state, {
					data: action.posts,
					loading: false,
					appending: false,
					page: 1
				});
			} else {
				return Object.assign({}, state, {
					data: state.data.concat(action.posts),
					loading: false,
					appending: false,
					page: action.page
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

export function articlePage(state = {}, action) {
	switch (action.type) {
		case types.FETCH_ARTICLE:
			if(action.data && action.data.data.replies){
				let replies = action.data.data.replies;
				replies = replies.map(function(item){
					var l = item.ups.length;
					item.ups = l;
					return item;
				});
			}
			return Object.assign({}, state, action.data, {
				loading: false
			});
		case types.ISLOADING_ARTICLE:
			return Object.assign({}, state, {
				loading: true
			});
		case types.UP_REPLY:
			if (action.success && action.action === 'up') {
				state.data.replies[action.index].ups += 1;
			} else if(action.success && action.action === 'down'){
				state.data.replies[action.index].ups -= 1;
			}
			return {
				...state
			};
		default:
			return state;
	}
}

export function inputBox(state = {}, action) {
	switch (action.type) {
		case types.OPEN_INPUT:
			return {
				...state,
				canInput: action.value,
				author: action.author,
				reply_id: action.reply_id
			};
		case types.CLOSE_INPUT:
			return {
				...state,
				canInput: action.value
			};
		case types.INPUT_VALUE:
			return {
				...state,
				value: action.value
			};
		default:
			return state;
	}
}
