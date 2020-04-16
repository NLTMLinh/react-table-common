import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const middlewares = [];
if(process.env.NODE_ENV === 'development') {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
   applyMiddleware(sagaMiddleware, ...middlewares),
);

sagaMiddleware.run(rootSaga);

export default store