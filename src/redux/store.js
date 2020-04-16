import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

console.log('object', process.env.NODE_ENV)
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
   applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

export default store
