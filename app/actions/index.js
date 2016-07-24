import * as types from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch'


function receivePosts(category, page, json) {
  return {
    type: types.FETCH_ARTICALS,
    category: category,
    page: page,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchPosts(category,page) {
  return dispatch => {
    dispatch(requestPosts(category))
    return fetch(`//cnodejs.org/api/v1/topics?tab=${type||''}&limit=30&page=${page||1}`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(category, page, json)))
  }
}

export const fetchArticles = (category, page) => {
    return (dispatch, getState) => {
	      return dispatch(fetchPosts(category,page));
	    }
  	}
};
