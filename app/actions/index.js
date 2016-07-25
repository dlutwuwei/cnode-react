import * as types from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';


function receivePosts(category, page, json) {
  return {
    type: types.FETCH_ARTICALES,
    category: category,
    page: page,
    posts: json.data,
    isAppend: page>1?true:false, //区分是否是下拉数据请求
    receivedAt: Date.now()
  };
}

function fetchPosts(category, page) {
  if (category.indexOf('.html') > 0) category = '';
  return dispatch => {
      dispatch(isAppending());

    return fetch(`//cnodejs.org/api/v1/topics?tab=${category || ''}&limit=30&page=${page || 1}`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(category, page, json)));
  };
}

export const fetchArticles = (category, page) => {
  return (dispatch) => {
    return dispatch(fetchPosts(category, page));
  };
};

export function isAppending(){
  return {
    type: types.ISAPPENDING_ARTICALES,
    value: true
  }
}
