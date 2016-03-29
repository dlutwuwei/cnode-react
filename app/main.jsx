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
  Nav,
  CollapsibleNav
} from 'amazeui-react';


require('./main.less')

import RouteLink from './components/RouteLink.jsx';
// import SiteFooter from './components/SiteFooter.jsx';

const App = React.createClass({

  render() {
    return (
      <div className="page">
        <Topbar
          brand="CNODEJS"
          brandLink="/"
          inverse
          toggleNavKey="nav"
          fixedTop='true'
        >
          <CollapsibleNav eventKey="nav">
            <Nav topbar>
              <RouteLink to="/index" type='' className='fa fa-align-justify'>全部</RouteLink>
              <RouteLink to="/good" type='good' className='fa-thumbs-up'>精华</RouteLink>
              <RouteLink to="/ask" type='ask' className='fa-question-circle'>问答</RouteLink>
              <RouteLink to="/share" type='share' className='fa-share-alt'>分享</RouteLink>
              <RouteLink to="/job" type='job' className='fa-male'>招聘</RouteLink>
              <RouteLink to="/me" type='job' className='fa-male'>登陆</RouteLink>
            </Nav>
          </CollapsibleNav>
        </Topbar>
        <main id="main" className="main 3d">
          {this.props.children}
        </main>
      </div>
    );
  },
});

// Pages
import Index from './components/App.jsx';
import article from './components/Article.jsx';
import me from'./components/Me.jsx';

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="/:type" component={Index} />
      <Route path="/article/:id" component={article}/>
      <Route path="/me/" component={me}/>
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', () => {
  render(routes, document.body);
});