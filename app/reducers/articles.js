import * as types from '../constants/ActionTypes';

export function articleList(state = {}, action) {
    switch (action.type) {
        case types.FETCH_ARTICALS:
          return Object.assign({}, state, {
            data: action.posts,
            loading: false
          });
        default:
          return state;
    }
}
