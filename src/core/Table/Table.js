import React, { useEffect, useState } from "react";
import { Col, DatePicker, Form, Input, Row, Table, Tag } from "antd";
import moment from "moment";
import EditableCell from "./utils";
import "./Table.css";
const { RangePicker } = DatePicker;

const CustomTable = ({ column, data=[],selection=false,loading=false }) => {
    const [form] = Form.useForm();
    const [formData, setFormData] = useState([])
    useEffect(() => {
      if(data){
          setFormData(data)
      }
   
    }, [data])
  const rowHandler = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };
  const filterHandler = (value) => {
    const filteredData = data.filter((item) => {
      return Object.keys(item).some((key) =>
        item[key].toString().toLowerCase().includes(value.toLowerCase())
      );
    });
    setFormData(filteredData)
  };
  const checkRowSelection = () => {
    return selection ? 
      {
          type: "checkbox",
          ...rowHandler,
        }
      : "";
  };
  return (
      <>
      <Row justify="space-between" className="mb-20">
        <Col span={6}>
          <Input.Search
            size="large"
            placeholder="Search Here"
            className=" min-w-[200px]"
            onSearch={filterHandler}
          />
        </Col>
        <Col>
          <RangePicker
            size="large"
            defaultValue={[moment().subtract(10, "days"), moment()]}
            format={"YYYY/MM/DD"}
          />
        </Col>
      </Row>
      <Form form={form} component={false}>
      <Table
      className="min-w-[200px] overflow-x-scroll"
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        loading={loading}
        rowSelection={checkRowSelection()}
        columns={column}
        dataSource={formData}
        rowClassName="editable-row"
      />
      </Form>
    </>
  );
};

export default CustomTable;
