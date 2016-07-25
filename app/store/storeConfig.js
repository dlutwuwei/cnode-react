import React from 'react';
import { createStore, applyMiddleware, combineReducers} from 'redux';
import * as reducers from '../reducers';
import thunkMiddleware from 'redux-thunk';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import { routerReducer } from 'react-router-redux';

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
)(createStore);

const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
        <LogMonitor theme="tomorrow" preserveScrollTop={false} />
    </DockMonitor>
);

const rootReducers = combineReducers({
    ...reducers,
    routing: routerReducer
});

export default function configureStore() {
    const store = createStoreWithMiddleware(rootReducers, DevTools.instrument());
    //const store = createStore(rootReducers);
    if (module.hot) {
        // 启动Webpack的reducers模块热替换
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers').default;
            store.replaceReducer(nextReducer);
        });
    }
    return store;
}
