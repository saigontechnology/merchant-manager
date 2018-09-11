import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import routerHistory from './routerHistory.js';
import { connectRouter, routerMiddleware } from 'connected-react-router';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, routerMiddleware(routerHistory)];

let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
  connectRouter(routerHistory)(rootReducer),
  composeEnhancers(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);

export default store;
