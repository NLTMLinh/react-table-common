import './Table.style.scss';
import React, { useState, useEffect } from 'react';
import { Result, Form, Row, Col, message, Spin } from 'antd';
import TableCommon from './../../common/Table/Table.component';
import FormCommon from '../../common/Form/Form.component';
import ResizeableTitleCommon from '../../common/ResizeableTitle/ResizebleTitle.component';
const PAGE_SIZE = 9

const COLUMNS_TABLE = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    width: 50,
    sorter: (a, b) => +a.id - +b.id,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Employee Name',
    dataIndex: 'employee_name',
    key: 'employee_name',
    width: 200,
    sorter: (a, b) => a.employee_name.localeCompare(b.employee_name),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Salary',
    dataIndex: 'employee_salary',
    key: 'employee_salary',
    width: 100,
    sorter: (a, b) => +a.employee_salary - +b.employee_salary,
    sortDirections: ['descend', 'ascend'],
    render: (salary) => (<span>{salary.toString().replace(/^0/, '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>)
  },
  {
    title: 'Age',
    dataIndex: 'employee_age',
    key: 'employee_age',
    width: 100,
    sorter: (a, b) => +a.employee_age - +b.employee_age,
    sortDirections: ['descend', 'ascend'],
  }
]
const CustomTableComponent = ({
  employees,
  dataCreate,
  dataDelete,
  loading,
  error,
  fetchEmployeeStart,
  createEmployee,
  deleteEmployee,
  editEmployeeStart,
  saveCreateEmployeeStart,
  saveDeleteEmployeeStart,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [form] = Form.useForm();
  const [dataTable, setDataTable] = useState(employees)
  const [currentRow, setCurrentRow] = useState(null)
  const [checkPressBtnSave, setCheckPressBtnSave] = useState(false)
  const [isValidData, setIsValidData] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [columns, setColumns] = useState(COLUMNS_TABLE)

  useEffect(() => {
    setColorRecordCreate();
  })

  useEffect(() => {
    fetchEmployeeStart()
    return () => setCheckPressBtnSave(false)
  }, [fetchEmployeeStart])

  if (employees.length !== 0 && dataTable !== employees) {
    setDataTable(employees)
  }

  if (error) {
    return <Result
      subTitle="Sorry, Wrong error."
    />
  }

  const onSelectChange = (selectedRowKeys) => {
    if (selectedRowKeys.length === 0) {
      selectedRowKeys = dataDelete
    }
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const validatorName = (_, value) => {
    const name_regex = /[0-9]|-|\+|=|_|\)|\(|\*|&|\^|%|\$|#|@|!|~|:|;|\}|]|{|\/|\?|\.|>|,|</g
    if (!value) {
      return Promise.reject()
    }
    else if (value.match(name_regex)) {
      return Promise.reject('Please enter the right format.');
    }
    return Promise.resolve()
  }

  const validatorSalary = (_, value) => {
    const salary_regex = /\\e/g
    if (!value) {
      return Promise.reject()
    }
    else if (value.toString().match(salary_regex)) {
      return Promise.reject('Please enter the right format.');
    }

    return Promise.resolve()
  }

  const validatorAge = (_, value) => {
    const age_regex = /\\e/g
    if (!value) {
      return Promise.reject()
    }
    else if (value.toString().match(age_regex)) {
      return Promise.reject('Please enter the right format.');
    }
    else if (+value < 20) {
      return Promise.reject('Employee age must be 20 and above.');
    }
    else if (+value > 65)
      return Promise.reject('Employee age must be 65 and under.');

    return Promise.resolve()
  }

  const formatEmployeeName = function (text) {
    let name = text.trim().replace(/(\s+)/, ' ');
    name = name.split(' ').map(function (item) {
      return item.slice(0, 1).toUpperCase() + item.slice(1, item.length).toLowerCase()
    }).join(" ")

    return name
  }

  const onValuesChange = (values) => {
    let functionCheck = null;
    switch (Object.keys(values)[0]) {
      case "employee_name":
        functionCheck = validatorName
        break;
      case "employee_salary":
        functionCheck = validatorSalary
        break;
      case "employee_age":
        functionCheck = validatorAge
        break;
      default:
        break;
    }
    if (functionCheck) {
      functionCheck(null, Object.values(values)[0])
        .then(() => setIsValidData(true))
        .catch(() => setIsValidData(false))
    }
    if (values && currentRow) {
      const record = { ...currentRow, ...values }
      const trs = document.getElementsByTagName('tr')
      for (let tr of trs) {
        if (record.id === tr.dataset.rowKey) {
          tr.cells[2].innerText = formatEmployeeName(record.employee_name);
          tr.cells[3].innerText = parseInt(record.employee_salary).toString().replace(/^0/, '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
          tr.cells[4].innerText = record.employee_age;
        }
      }
      setCurrentRow(record)
    }
  }

  const onFinish = (values) => {
    if (currentPage !== 1) {
      setCurrentPage(1)
    }
    setColorRecordDelete(selectedRowKeys)
    values.id = dataCreate.length === 0 ? (+dataTable[dataTable.length - 1].id + 1).toString() : (+dataCreate[0].id + 1).toString()
    values.employee_name = formatEmployeeName(values.employee_name)
    createEmployee(values)
    form.resetFields()
  };

  const handleBtnSave = () => {

    if (!isValidData) {
      return;
    }

    let checkChangeRecord = true;
    let checkEditWhenCreateRecord = false;

    if (currentRow) {
      const record = dataTable.filter(item => item.id === currentRow.id)[0]
      let keyChange = 0
      for (let key in currentRow) {
        if (currentRow[key].toString().trim() === record[key].toString().trim()) {
          keyChange++;
        }
      }
      checkChangeRecord = keyChange === Object.keys(currentRow).length

      if (!checkChangeRecord) {
        if (dataCreate.map(item => item.id).includes(currentRow.id)) {
          checkEditWhenCreateRecord = true
        } else if (!dataDelete.includes(currentRow.id)) {
          setCheckPressBtnSave(true)
          editEmployeeStart(currentRow)
        } else {
          setCurrentRow(null)
        }
      }
    }

    if (checkChangeRecord && dataDelete.length === 0 && dataCreate.length === 0) {
      message.info("Nothing to save.")
    } else {
      setCheckPressBtnSave(true)
    }

    if (dataCreate.length !== 0) {
      let data = dataCreate;
      if (checkEditWhenCreateRecord) {
        data = dataCreate.map(item => item.id === currentRow.id ? currentRow : item)
      }
      saveCreateEmployeeStart(data)
      form.resetFields()
      checkEditWhenCreateRecord = false
    }
    
    if (dataDelete.length !== 0) {
      setSelectedRowKeys([])
      saveDeleteEmployeeStart(dataDelete)
      form.resetFields()
    }

  }

  const handleBtnDelete = () => {
    const idRecord = document.getElementById("form_id").value

    if(selectedRowKeys.includes(idRecord)) {
      setCurrentRow(null)
      form.resetFields()
    }

    const recordCreate = dataCreate.map((item) => item.id)
    const selectedRowKeysDel = selectedRowKeys.filter((rowKey) => !recordCreate.includes(rowKey))
    setSelectedRowKeys(selectedRowKeysDel)
    deleteEmployee(selectedRowKeys)
    setColorRecordDelete(selectedRowKeysDel)
  }

  const setColorRecordDelete = (_selectedRowKeys) => {
    const trs = document.getElementsByTagName('tr')
    setTimeout(() => {
      for (let tr of trs) {
        if (_selectedRowKeys.includes(tr.dataset.rowKey)) {
          tr.classList.add("record-remove")
        } else {
          tr.classList.remove("record-remove")
        }
      }
    }, 0)
  }

  const setColorRecordCreate = () => {
    if (dataCreate.length !== 0) {
      const ids = dataCreate.map(item => item.id)
      const trs = document.getElementsByTagName('tr')
      setTimeout(() => {
        for (let tr of trs) {
          if (ids.includes(tr.dataset.rowKey)) {
            tr.classList.add("record-create")
          } else {
            tr.classList.remove("record-create")
          }
        }
      }, 0)
    }
  }

  const handleBindingData = (row) => {
    setCurrentRow(row)
    if (row) {
      const trs = document.getElementsByTagName('tr')
      setTimeout(() => {
        for (let tr of trs) {
          if (row.id === tr.dataset.rowKey) {
            tr.classList.add("record-selected")
          } else {
            tr.classList.remove("record-selected")
          }
        }
      },0)
      form.setFieldsValue(row)
      if (dataCreate.map(item => item.id).includes(row.id)) {
        document.getElementById('form_id').classList.add("disable-input")
      } else {
        document.getElementById('form_id').classList.remove("disable-input")
      }
    }
    else {
      form.resetFields()
    }
  }

  const onChangePagination = (page) => {
    setCurrentPage(page)
    if(currentRow) {
      handleBindingData(currentRow)
    }
    setColorRecordDelete(dataDelete)
    setColorRecordCreate()
  }

  //Resizable title 

  const components = {
    header: {
      cell: ResizeableTitleCommon,
    },
  };

  const handleResize = index => (e, { size }) => {
    const nextColumns = [...columns];
    nextColumns[index] = {
      ...nextColumns[index],
      width: size.width,
    };
    setColumns(nextColumns)
  };

  const _columns = columns.map((col, index) => ({
    ...col,
    onHeaderCell: column => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));

  // end
  return (
    <Spin spinning={loading} tip={checkPressBtnSave ? "Saving...." : "Loading..."} size="large">
      <div className="table-common">
        <Row>
          <Col lg={{ span: 12 }} xl={{ span: 16 }} className="gutter-row table-common__table" >
            <TableCommon
              rowSelection={rowSelection}
              columns={_columns}
              components={components}
              dataSource={dataTable}
              handleBindingData={handleBindingData}
              pagination={{ pageSize: PAGE_SIZE, current: currentPage, onChange: onChangePagination }}
            />
          </Col>
          <Col lg={{ span: 12 }} xl={{ span: 8 }} className="gutter-row table-common__form">
            <FormCommon
              form={form}
              name="form"
              onFinish={onFinish}
              onValuesChange={onValuesChange}
              initialValues={{ employee_name: '', employee_salary: '', employee_age: '' }}
              validatorName={validatorName}
              validatorAge={validatorAge}
              validatorSalary={validatorSalary}
              loading={loading}
              handleBtnDelete={handleBtnDelete}
              handleBtnSave={handleBtnSave} />
          </Col>
        </Row>
      </div >
    </Spin>
  )
}

export default CustomTableComponent