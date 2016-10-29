import * as types from '../constants/actionTypes';
import fetch from 'isomorphic-fetch';

export const fetchNotices = (accesstoken) => {
    return dispatch => {
        fetch(`//cnodejs.org/api/v1/messages?accesstoken=${accesstoken}`, {
            method: 'GET'
        }).then(resp => resp.json()).then( data => {
             dispatch({
                type: types.NOTICE_LOADED,
                data: data.data
            });
        }).catch(e => {
            console.log(e);
        });
    };
};
