import * as types from '../constants/ActionTypes';
import post from '../utils/ajax.js';
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

function upSuccess(data, id, index) {
  return {
    type: types.UP_REPLY,
    success: data.success,
    action: data.action,
    id: id,
    index: index
  };
}

function postCommentSuccess(data) {
  return {
    type: types.POST_COMMENT,
    success: data.success
  }
}


export function isAppending() {
  return {
    type: types.ISAPPENDING_ARTICLES,
    value: true
  };
}

export function isLoading() {
  return {
    type: types.ISLOADING_ARTICLE,
    value: true
  };
}

export function canInput(author, replyId) {
  return {
    type: types.OPEN_INPUT,
    value: true,
    author: author,
    replyId: replyId || '',
    isRequiredLogin: true
  };
}

export function closeInput(refresh) {
  return {
    type: types.CLOSE_INPUT,
    value: false,
    refresh: refresh
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

export const fetchArticle = (id) => {
  return dispatch => {
    dispatch(isLoading());

    return fetch(`//cnodejs.org/api/v1/topic/${id || ''}`)
      .then(response => response.json())
      .then(json => dispatch(receiveArticle(json)));
  };
};

export const upReply = (id, index, accesstoken) => {
  return dispatch => {
    return post(`//cnodejs.org/api/v1/reply/${id}/ups`, {
      accesstoken: accesstoken
    })
      .then(response => dispatch(upSuccess(JSON.parse(response), id, index)));
  };
};

export const postReply = (id, replyid, accesstoken) => {
  return dispatch => {
    return post(`//cnodejs.org/api/v1/topic/${id}/replies`, {
      accesstoken: accesstoken,
      content: document.querySelector('.markdown-textarea #html').innerHTML,
      reply_id: replyid
    })
      .then(response => {
        const res = JSON.parse(response);
        if (res.success === true) {
          dispatch(closeInput(true));
          dispatch(fetchArticle(id));
        } else {
          alert('post failed');
        }
        // dispatch( postCommentSuccess(JSON.parse(response)) );
      });
  };
};

export const postArticle = (accesstoken) => {
  return dispatch => {
    return post('//cnodejs.org/api/v1/topics', {
      accesstoken: accesstoken,
      content: document.querySelector('.markdown-textarea #html').innerHTML,
      title: document.getElementById('title').value,
      tab: document.getElementById('tab').value
    }).then(response => {
      const res = JSON.parse(response);
      if (res.success === true) {
        dispatch(closeInput());
      } else {
        alert(res.error_msg);
      }
    });
  };
};
