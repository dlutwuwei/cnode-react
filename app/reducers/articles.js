import * as types from '../constants/ActionTypes';
export const fetchArticles = (type) => {
    return {
        type: types.FETCH_ARTICALS,
        articleType: type
    };
};

