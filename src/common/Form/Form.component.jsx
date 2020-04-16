import React from 'react'
import { Form, Button, Input } from 'antd'

const WrapperButton = ({loading, handleBtnDelete, handleBtnSave}) => (
  <div className="wapprer-form__button">
    <Button htmlType="submit" className="btn btn__create" disabled={loading}>Create</Button>
    <Button className="btn btn__delete" onClick={handleBtnDelete} disabled={loading}>Delete</Button>
    <Button className="btn btn__save" onClick={handleBtnSave} disabled={loading}>Save</Button>
  </div>
)

const FormCommon = ({
  form, 
  name,
  onFinish, 
  onValuesChange, 
  initialValues,
  validatorName, 
  validatorSalary,
  validatorAge,
  ...ortherProps
}) => (
  <Form className="wapprer-form"
    form={form}
    name={name}
    onFinish={onFinish}
    onValuesChange={onValuesChange}
    initialValues={initialValues}
  >
    <WrapperButton {...ortherProps}/>
    <Form.Item label="ID"
      name="id"
    >
      <Input className="form-input" disabled />
    </Form.Item>
    <Form.Item label="Name"
      name="employee_name"
      rules={[
        {
          required: true,
          message: 'Please input employee name!'
        },
        {
          validator: validatorName
        }
      ]}
    >
      <Input className="form-input" placeholder="e.g Zoe" type="text" />
    </Form.Item>
    <Form.Item label="Salary"
      name="employee_salary"
      rules={[
        {
          required: true,
          message: 'Please input employee salary!'
        },
        {
          validator: validatorSalary
        }
      ]}
    >
      <Input className="form-input" placeholder="e.g 2000000" type="number" />
    </Form.Item>
    <Form.Item label="Age"
      name="employee_age"
      rules={[
        {
          required: true,
          message: 'Please input employee age!'
        },
        {
          validator: validatorAge
        }
      ]}
    >
      <Input className="form-input" placeholder="e.g 21" type="number" />
    </Form.Item>
  </Form>
)

export default FormCommon