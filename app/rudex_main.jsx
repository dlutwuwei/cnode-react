import React from 'react';
import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import { createHistory } from 'history';
import { Route } from 'react-router';


// Pages
import Index from './components/App.jsx';
import article from './components/Article.jsx';
import me from'./components/Me.jsx';
import login from './components/Login.jsx';
import Nav from './components/Nav.jsx';

// Configure routes like normal
const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Index} />
      <Route path="/me" component={me}/>
      <Route path="/login" component={login}/>
      <Route path="/:type" component={Index} />
      <Route path="/article/:id" component={article}/>
    </Route>
  </Router>
);

// Configure reducer to store state at state.router
// You can store it elsewhere by specifying a custom `routerStateSelector`
// in the store enhancer below
const reducer = combineReducers({
  router: routerStateReducer,
  //app: rootReducer, //you can combine all your other reducers under a single namespace like so
});

// Compose reduxReactRouter with other store enhancers
const store = compose(
  applyMiddleware(m1, m2, m3),
  reduxReactRouter({
    routes,
    createHistory
  }),
  devTools()
)(createStore)(reducer);