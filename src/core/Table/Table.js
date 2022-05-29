import React, { useEffect, useState } from "react";
import { Button, Col, DatePicker, Form, Input, Row, Table, Tag } from "antd";
import { CSVLink } from "react-csv";
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
  selectedRowKeys,
  editable,
  onPageChange = () => {},
  page = 1,
  totalRecords = 0,
  filterHandler,
  dateChangeHandler,
  noFilter,
  exportData = { header: [], data: [] },
  filename,
  showActions,
  pageLimit,
  setPageLimit,
  noPagination
}) => {
  const [formData, setFormData] = useState([]);
  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  return (
    <>
      {!noFilter && (
        <Row justify="space-between" className="mb-20" gutter={[20, 10]}>
          <Col xxl={14} xl={17} lg={24} sm={24}>
            <Row gutter={[10, 10]}>
              <Col lg={8} md={8}>
                <Input.Search
                  size="large"
                  placeholder="Search Here"
                  className=" min-w-[150px]"
                  onSearch={filterHandler}
                />
              </Col>
              {showActions && (
                <Col lg={16} md={16}>
                  {DropdownActions}
                </Col>
              )}
            </Row>
          </Col>
          <Col>
            {showActions && (
              <CSVLink filename={filename} data={exportData.data} headers={exportData.header}>
                <Button
                  className="rounded-10 px-40 mr-30"
                  size="large"
                  type="primary"
                  danger
                >
                  Export
                </Button>
              </CSVLink>
            )}
            <RangePicker
              onChange={dateChangeHandler}
              size="large"
              defaultValue={[moment().subtract(30, "days"), moment()]}
              format={"YYYY/MM/DD"}
              allowClear={false}
            />
          </Col>
        </Row>
      )}
      <Form form={form}>
        <Table
          components={
            editable && {
              body: {
                cell: EditableCell,
              },
            }
          }
          loading={loading}
          rowSelection={
            selection && {
              selectedRowKeys,
              ...rowHandler,
            }
          }
          columns={column}
          dataSource={formData}
          rowClassName="editable-row"
          scroll={{
           x:1000, y: 1000,
          }}
          pagination={!noPagination &&{
            showSizeChanger: true,
            onShowSizeChange:(current, size)=>setPageLimit(size),
            total: totalRecords,
            current: page,
            pageSize: pageLimit,
            onChange: (currentPage, pageSize) => {
              if (currentPage !== page) onPageChange(currentPage);
            },
            pageSizeOptions:[10,20,30,50,100,200,500]
          }}
        />
      </Form>
    </>
  );
};

export default CustomTable;
