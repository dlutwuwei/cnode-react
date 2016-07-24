import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import reducers from './reducers'


// Pages
import Index from './components/App.jsx';
import article from './components/Article.jsx';
import me from'./components/Me.jsx';
import login from './components/Login.jsx';
import Nav from './components/Nav.jsx';

require('./amaze.ui.css');
require('./main.less');


const Main = React.createClass({

  render() {
    const loginname = localStorage.getItem('loginname');
    return (
      <div className="page">
        <Nav></Nav>
        <div id="main" className="main 3d">
          {this.props.children}
        </div>
      </div>
    );
  },
});


const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Index} />
      <Route path="/me" component={me}/>
      <Route path="/login" component={login}/>
      <Route path="/:type" component={Index} />
      <Route path="/article/:id" component={article}/>
    </Route>
  </Router>
);

// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.body
)
