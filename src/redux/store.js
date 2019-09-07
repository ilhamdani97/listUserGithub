import { createStore, applyMiddleware } from 'redux';
import middlewares from './middlewares/middleware';
import appReducer from './reducers';

const Store = createStore(appReducer, {}, applyMiddleware(...middlewares))
export {Store};