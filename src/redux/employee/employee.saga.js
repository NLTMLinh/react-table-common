import { message } from 'antd';
import { put, all, call, takeLatest } from 'redux-saga/effects';
import EmployeeType from './employee.type';
import EmployeeService from './../../service/employee';
import {
  fetchEmployeeFail,
  fetchEmployeeSuccess,
  saveCreateEmployeeSuccess,
  saveCreateEmployeeFail,
  saveDeleteEmployeeSuccess,
  saveDeleteEmployeeFail,
  editEmployeeSuccess,
  editEmployeeFail,

} from './employee.action'
function* fetchEmployee() {
  try {
    const result = yield EmployeeService.get();
    yield put(fetchEmployeeSuccess(result))
  } catch (err) {
    yield put(fetchEmployeeFail())
  }
}
function* fetchEmployeeSaga() {
  yield takeLatest(EmployeeType.FETCH_EMPLOYEE_START, fetchEmployee)
}

function* saveCreateEmployee(action) {
  try {
    const result = yield EmployeeService.save(action.payload, "CREATE");
    yield put(saveCreateEmployeeSuccess(result))
    message.success("Create successfully.")
  } catch (error) {
    yield put(saveCreateEmployeeFail())
  }
}

function* saveCreateEmployeeSaga() {
  yield takeLatest(EmployeeType.SAVE_CREATE_EMPLOYEE_START, saveCreateEmployee)
}

function* saveDeleteEmployee(action) {
  try {
    const result = yield EmployeeService.save(action.payload, "DELETE");
    const ids = result.map(item => item.id)
    yield put(saveDeleteEmployeeSuccess(ids))
    message.success("Delete successfully.")
  } catch (error) {
    yield put(saveDeleteEmployeeFail())
  }
}

function* saveDeleteEmployeeSaga() {
  yield takeLatest(EmployeeType.SAVE_DELETE_EMPLOYEE_START, saveDeleteEmployee)
}

function* editEmployee(action) {
  try {
    const result = yield EmployeeService.put(action.payload);
    yield put(editEmployeeSuccess(result))
    message.success("Edit successfully.")
  } catch (error) {
    yield put(editEmployeeFail())
  }
}

function* editEmployeeSaga() {
  yield takeLatest(EmployeeType.EDIT_EMPLOYEE_START, editEmployee)
}

export default function* employeeSaga() {
  yield all([
    call(fetchEmployeeSaga),
    call(saveCreateEmployeeSaga),
    call(saveDeleteEmployeeSaga),
    call(editEmployeeSaga)
  ])
}