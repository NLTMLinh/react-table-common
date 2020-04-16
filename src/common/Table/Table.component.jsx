import React from 'react';
import { Table } from 'antd';

const TableCommon = (props) => {
  return (
    <Table
      rowKey={record => record.id}
      rowSelection={props.rowSelection}
      columns={props.columns}
      components={props.components}
      dataSource={props.dataSource}
      bordered
      pagination={props.pagination}
      onRow={(record, rowIndex) => {
        return {
          onClick: () => {
            const trs = document.getElementsByTagName('tr')
            for (let tr of trs) {
              if (record.id === tr.dataset.rowKey) {
                tr.classList.add("record-selected")
              } else {
                tr.classList.remove("record-selected")
              }
            }
            props.handleBindingData(record); // click row
          },
          onDoubleClick: () => {
            const trs = document.getElementsByTagName('tr')
            for (let tr of trs) {
              if (record.id === tr.dataset.rowKey) {
                tr.classList.remove("record-selected")
              }
            }
            props.handleBindingData(null);
          }

        }
      }}
    />
  )
}

export default TableCommon;