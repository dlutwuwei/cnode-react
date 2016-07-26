import * as types from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';


function receivePosts(category, page, json) {
  return {
    type: types.FETCH_LIST,
    category: category,
    page: page,
    posts: json.data,
    isAppend: (page > 1 ? true : false), //区分是否是下拉数据请求
    receivedAt: Date.now()
  };
}

function receiveArticle(data) {
  return {
    type: types.FETCH_ARTICLE,
    data: data
  };
}


export const fetchList = (category, page) => {
  if (category.indexOf('.html') > 0) category = '';
  return dispatch => {
    dispatch(isAppending());

    return fetch(`//cnodejs.org/api/v1/topics?tab=${category || ''}&limit=30&page=${page || 1}`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(category, page, json)));
  };
};

export const fetchArticle = (id) =>{
   return dispatch => {
    dispatch(isLoading());

    return fetch(`//cnodejs.org/api/v1/topic/${id || ''}`)
      .then(response => response.json())
      .then(json => dispatch(receiveArticle(json)));
  };
}


export function isAppending() {
  return {
    type: types.ISAPPENDING_ARTICLES,
    value: true
  }
}

export function isLoading(){
  return {
    type: types.ISLOADING_ARTICLE,
    value: true
  }
}
