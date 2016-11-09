import React from 'react';
import { createStore, applyMiddleware, combineReducers} from 'redux';
import * as reducers from '../reducers';
//import thunkMiddleware from 'redux-thunk';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import { routerReducer } from 'react-router-redux';

// middle redux test
function thunkMiddleware({ dispatch, getState }, ...extraArgument) {
    //闭包 dispatch,getState
    return next => action => {
        if (typeof action === 'function') {
            return action(dispatch, getState, extraArgument);
        }
        return next(action);
    }
};

const requireLoginPath = ['/notice'];

function requireLoginMiddleware( {dispatch, getState }, ...extraArgument) {
    return next => action => {
        let accesstoken = localStorage.getItem('accesstoken');
        console.log(action);
        if(!accesstoken) {
            if(action.isRequiredLogin || (action.payload && requireLoginPath.includes(action.payload.pathname))) {
                return next({
                    type: '@@router/LOCATION_CHANGE',
                    payload: {
                        action: 'POP',
                        pathname: '/login',
                        key: '1gpxd0',
                        query: {},
                        hash: '',
                    }
                })
            }
        }
        return next(action);
    }
}
const createStoreWithMiddleware = applyMiddleware( 
    thunkMiddleware,
    requireLoginMiddleware
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
