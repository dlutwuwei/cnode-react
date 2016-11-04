import React from 'react';
import {
  render,
} from 'react-dom';

import {
  Router,
  Route,
  IndexRoute,
  hashHistory,
} from 'react-router';

require('./amaze.ui.css');
require('./main.less');

// import RouteLink from './components/RouteLink.jsx';
//import SiteFooter from './components/SiteFooter.jsx';


// Pages
import Index from './containers/App.jsx';
import article from './containers/Article.jsx';
import me from'./components/Me.jsx';
import login from './components/Login.jsx';
import Nav from './components/Nav.jsx';


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

document.addEventListener('DOMContentLoaded', () => {
  render(routes, document.body);
});