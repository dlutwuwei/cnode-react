// import React from 'react';
// import ReactDOM from 'react-dom';


// import App from './components/App.jsx';
// require('./index.js')



// ReactDOM.render(
//   <App/>,
//   document.body.appendChild(document.createElement('div'))
// );

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

import {
  Topbar,
  CollapsibleNav
} from 'amazeui-react';


require('./main.less')

import RouteLink from './components/RouteLink.jsx';
// import SiteFooter from './components/SiteFooter.jsx';


// Pages
import Index from './components/App.jsx';
import article from './components/Article.jsx';
import me from'./components/Me.jsx';
import login from './components/Login.jsx';
import Nav from './components/Nav.jsx';


const App = React.createClass({

  render() {
    var loginname = localStorage.getItem('loginname');
    return (
      <div className="page">
        <Nav></Nav>
        <main id="main" className="main 3d">
          {this.props.children}
        </main>
      </div>
    );
  },
});


const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
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