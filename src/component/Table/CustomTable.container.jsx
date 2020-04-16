import TableComponent from "./CustomTable.component";
import { connect } from "react-redux";
import { 
  fetchEmployeeStart, 
  createEmployee, 
  deleteEmployee, 
  saveCreateEmployeeStart,
  saveDeleteEmployeeStart,
  editEmployeeStart,
} from '../../redux/employee/employee.action';

const mapStateToProps = state => ({
  employees: state.employees.data,
  loading: state.employees.loading,
  error: state.employees.error,
  dataCreate: state.employees.dataCreate,
  dataDelete: state.employees.dataDelete,
})
const mapDispatchToProps = dispatch => ({
  fetchEmployeeStart: () => dispatch(fetchEmployeeStart()),
  createEmployee: (payload) => dispatch(createEmployee(payload)),
  deleteEmployee: (payload) => dispatch(deleteEmployee(payload)),
  editEmployeeStart: (payload) => dispatch(editEmployeeStart(payload)),
  saveCreateEmployeeStart: (payload) => dispatch(saveCreateEmployeeStart(payload)),
  saveDeleteEmployeeStart: (payload) => dispatch(saveDeleteEmployeeStart(payload))
})

const TableContainer = connect(mapStateToProps, mapDispatchToProps)(TableComponent)

export default TableContainer