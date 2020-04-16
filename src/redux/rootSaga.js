import { all, call } from 'redux-saga/effects';
import employeeSaga from './employee/employee.saga';

export default function* rootSaga() {
  yield all([
    call(employeeSaga),
  ]);
}