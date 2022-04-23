import React, { useEffect, useState } from "react";
import { Col, DatePicker, Form, Input, Row, Table, Tag } from "antd";
import moment from "moment";
import EditableCell from "./utils";
import "./Table.css";
const { RangePicker } = DatePicker;

const CustomTable = ({
  column,
  data,
  selection = false,
  rowHandler,
  loading = false,
  DropdownActions,
  form,
  selectedRowKeys,editable,
  onPageChange = () => {},
  page=1,
  totalRecords=0,
}) => {
  const [formData, setFormData] = useState([]);
  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const filterHandler = (value) => {
    const filteredData = data.filter((item) => {
      return Object.keys(item).some((key) =>
        item[key].toString().toLowerCase().includes(value.toLowerCase())
      );
    });
    setFormData(filteredData);
  };

  return (
    <>
      <Row justify="space-between" className="mb-20" gutter={[20,10]}>
        <Col xxl={14} xl={17} lg={24} sm={24}>
          <Row gutter={[10,10]}>
            <Col lg={8} md={8}>
              <Input.Search
                size="large"
                placeholder="Search Here"
                className=" min-w-[150px]"
                onSearch={filterHandler}
              />
            </Col>
            {DropdownActions && <Col lg={16} md={16}>{DropdownActions}</Col>}
          </Row>
        </Col>
        <Col>
          <RangePicker
            size="large"
            defaultValue={[moment().subtract(10, "days"), moment()]}
            format={"YYYY/MM/DD"}
          />
        </Col>
      </Row>
      <Form form={form} >
        <Table
          className="min-w-[200px] overflow-x-scroll"
          components={editable && {
            body: {
              cell: EditableCell,
            },
          }}
          loading={loading}
          rowSelection={selection &&{
            selectedRowKeys,
            ...rowHandler,
          }}
          columns={column}
          dataSource={formData}
          rowClassName="editable-row"
          pagination={{
            showSizeChanger: false,
            total: totalRecords,
            current: page,
            pageSize: 2,
            onChange: (currentPage, pageSize) => {
              if(currentPage!==page) onPageChange(currentPage);
            }
          }}
        />
      </Form>
    </>
  );
};

export default CustomTable;
