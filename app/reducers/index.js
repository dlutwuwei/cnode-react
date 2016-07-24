import { combineReducers } from 'redux';

import { articles } from './articles.js';

const todoApp = combineReducers({
  articles,
});

export default todoApp;
