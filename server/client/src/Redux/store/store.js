import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './rootReducer';
import { rootWatcher } from './rootWatcher.saga';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    rootReducer, 
    applyMiddleware(sagaMiddleware));



sagaMiddleware.run(rootWatcher)


export default store;