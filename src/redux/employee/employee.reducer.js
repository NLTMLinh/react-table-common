import EmployeeType from './employee.type';
import * as employeeUtil from './empoyeee.util';

const initialState = {
  data: [],
  dataCreate: [],
  dataDelete: [],
  loading: null,
  error: false,
}

function employeeReducer(state = initialState, action) {
  switch (action.type) {
    case EmployeeType.FETCH_EMPLOYEE_START: 
    return {
      ...state,
      loading: true
    }
    case EmployeeType.FETCH_EMPLOYEE_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    }
    case EmployeeType.CREATE_EMPLOYEE: {
      return {
        ...state,
        data: [action.payload, ...state.data],
        dataCreate: [action.payload, ...state.dataCreate],
      }
    }
    case EmployeeType.DELETE_EMPLOYEE: {
      return {
        ...state,
        data: [...state.data.filter(item => !employeeUtil.filterRecordLiesInCreateAndDelete(state, action).includes(item.id))],
        dataDelete: employeeUtil.filterRecordDelete(state, action),
        dataCreate: employeeUtil.filterRecordCreate(state, action)
      }
    }
    case EmployeeType.SAVE_CREATE_EMPLOYEE_START: {
      return {
        ...state,
        loading: true,
      }
    }
    case EmployeeType.SAVE_CREATE_EMPLOYEE_SUCCESS: {
      return {
        ...state,
        data: employeeUtil.filterDataSaved(state, action),
        dataCreate: [],
        dataDelete: [],
        loading: false,
      }
    }
    case EmployeeType.SAVE_CREATE_EMPLOYEE_FAIL: {
      return {
        ...state,
        data: [...state.data.filter(item => !!item["id"])],
        dataCreate: [],
        dataDelete: [],
        loading: false,
        error: true
      }
    }
    case EmployeeType.SAVE_DELETE_EMPLOYEE_START: {
      return {
        ...state,
        loading: true,
      }
    }
    case EmployeeType.SAVE_DELETE_EMPLOYEE_SUCCESS: {
      return {
        ...state,
        data: [...state.data.filter(item => !action.payload.includes(item.id))],
        dataCreate: [],
        dataDelete: [],
        loading: false,
      }
    }
    case EmployeeType.SAVE_DELETE_EMPLOYEE_FAIL: {
      return {
        ...state,
        dataCreate: [],
        dataDelete: [],
        loading: false,
        error: true
      }
    }
    case EmployeeType.EDIT_EMPLOYEE_START: {
      return {
        ...state,
        loading: true,
      }
    }
    case EmployeeType.EDIT_EMPLOYEE_SUCESS: {
      return {
        ...state,
        data: [...state.data.map(item => item.id === action.payload.id ? action.payload : item )],
        loading: false,
      }
    }
    case EmployeeType.FETCH_EMPLOYEE_FAIL: 
    case EmployeeType.EDIT_EMPLOYEE_FAIL: {
      return {
        ...state,
        loading: false,
        error: true
      }
    }
    default:
      return state
  }
}

export default employeeReducer