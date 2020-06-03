import { createStore, applyMiddleware } from '../redux';
import reducer from './reducers/index';
import thunk from './middlewares/redux-thunk';
import logger from './middlewares/redux-logger';
import promise from './middlewares/redux-promise';

const middlewares = [thunk, promise, logger];

const store = applyMiddleware(...middlewares)(createStore)(reducer);

export default store;
