import EmployeeType from './employee.type';

export const fetchEmployeeStart = () => ({
  type: EmployeeType.FETCH_EMPLOYEE_START
})

export const fetchEmployeeSuccess = (payload) => ({
  type: EmployeeType.FETCH_EMPLOYEE_SUCCESS,
  payload
})

export const fetchEmployeeFail = (err) => ({
  type: EmployeeType.FETCH_EMPLOYEE_FAIL,
  payload: err
})

export const createEmployee = (payload) => ({
  type: EmployeeType.CREATE_EMPLOYEE,
  payload
})

export const saveCreateEmployeeStart = (payload) => ({
  type: EmployeeType.SAVE_CREATE_EMPLOYEE_START,
  payload
})

export const saveCreateEmployeeSuccess = (payload) => ({
  type: EmployeeType.SAVE_CREATE_EMPLOYEE_SUCCESS,
  payload
})

export const saveCreateEmployeeFail = (err) => ({
  type: EmployeeType.SAVE_CREATE_EMPLOYEE_FAIL,
  payload: err
})

export const deleteEmployee = (payload) => ({
  type: EmployeeType.DELETE_EMPLOYEE,
  payload
})

export const saveDeleteEmployeeStart = (payload) => ({
  type: EmployeeType.SAVE_DELETE_EMPLOYEE_START,
  payload
})

export const saveDeleteEmployeeSuccess = (payload) => ({
  type: EmployeeType.SAVE_DELETE_EMPLOYEE_SUCCESS,
  payload
})

export const saveDeleteEmployeeFail = (err) => ({
  type: EmployeeType.SAVE_DELETE_EMPLOYEE_FAIL,
  payload: err
})

export const editEmployeeStart = (payload) => ({
  type: EmployeeType.EDIT_EMPLOYEE_START,
  payload
})

export const editEmployeeSuccess = (payload) => ({
  type: EmployeeType.EDIT_EMPLOYEE_SUCESS,
  payload
})

export const editEmployeeFail = (err) => ({
  type: EmployeeType.EDIT_EMPLOYEE_FAIL,
  payload: err
})