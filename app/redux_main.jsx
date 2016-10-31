import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import configureStore from './store/storeConfig.js';


// Pages
import Index from './containers/App.jsx';
import article from './containers/Article.jsx';
import me from'./components/Me.jsx';
import login from './components/Login.jsx';
import Nav from './components/Nav.jsx';
import Notice from './containers/Notice.jsx';
import About from './components/About.jsx';

require('./amaze.ui.css');
require('./main.less');


class Main extends React.Component {
  constructor(props, context) {
      super(props, context);
  }
  render() {
    // const loginname = localStorage.getItem('loginname');
    return (
      <div className="page">
        <Nav/>
        <div id="main" className="main 3d">
          {this.props.children}
        </div>
      </div>
    );
  }
}



const store = configureStore();
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);
const routes = (
  <Router history={history}>
    <Route path="/" component={Main}>
      <IndexRoute component={Index} />
      <Route path="/me" component={me}/>
      <Route path="/about" component={About}/>
      <Route path="/notice" component={Notice}/>
      <Route path="/login" component={login}/>
      <Route path="/:type" component={Index} />
      <Route path="/article/:id" component={article}/>
    </Route>
  </Router>
);


ReactDOM.render(
  <Provider store={store}>
    <div>
    {routes}
    </div>
  </Provider>,
  document.getElementById('mount')
);
