import { Button, Col, Modal, Row } from "antd";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { orderDetailStats } from "../../../constants/stats";
import {
  editableOrderColumns,
  orderColumns,
} from "../../../constants/tableColumns";
import { CustomTable } from "../../../core";
import NewOrderForm from "../../../core/Forms/NewOrderForm";
import HeadAndContent from "../../../core/HeadAndContent";
import StatsCard from "../../../core/StatsCard";
import {
  useDeleteOrder,
  useGetAllCompany,
  useGetUserByRole,
} from "../../../hooks";
import { useGetOrders } from "../../../hooks/Orders/useGetOrders";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const OrderDetailsContainer = () => {
  const [page, setPage] = useState(1);
  const [editData, setEditData] = useState("");
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [dateParam, setDateParam] = useState([]);
  const [showActions, setShowActions] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  console.log(dateParam,'dateParam')

  const { mutate: deleteOrder } = useDeleteOrder();
  const {
    data: ordersData,
    isLoading: orderLoading,
    refetch: refetchOrders,
  } = useGetOrders({
    page,
    limit: 10,
    search: searchParam,
    dateParamss:dateParam,
  });
  const { data: AllCompany } = useGetAllCompany({});

  const { data: salesAgentData } = useGetUserByRole({
    role: "sales-agent",
  });
  const orderStats = (
    <Row gutter={[5, 10]}>
      {orderDetailStats(
        ordersData?.totalOrders,
        ordersData?.inProgressOrders,
        ordersData?.pendingOrders,
        ordersData?.readyToDeliveredOrders,
        ordersData?.completedOrders,
        ordersData?.totalOrders
      ).map((item, i) => (
        <Col xxl={4} xl={6} lg={8} md={10} xs={24} key={i}>
          <StatsCard data={item} />
        </Col>
      ))}
    </Row>
  );
  const editHandler = (record) => {
    setEditVisible(true);
    setEditData(record);
  };
  const deleteHandler = (id) => {
    deleteOrder(id);
  };
  const rowHandler = {
    onChange: (selectedRowKeys, selectedRows) => {
      selectedRows.length >= 1 ? setShowActions(true) : setShowActions(false);
      setSelectedRowKeys(selectedRowKeys);
    },
  };
  const bulkDeleteHandler = () => {
    const newData = [...selectedRowKeys];
    const ids = newData.map((item) => {
      return item;
    });
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Do you want to delete this items?",

      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: deleteHandler,
    });
    // deleteBulkCompany({ data: ids });
    setShowActions(false);
    setSelectedRowKeys([]);
  };
  const column = editableOrderColumns(editHandler, deleteHandler);
  return (
    <>
      <HeadAndContent
        heading="Order Details"
        btn={{ name: "Add New Order", buttonHandler: () => setVisible(true) }}
      >
        {orderStats}
        <CustomTable
          filterHandler={(value) => {
            setSearchParam(value);
            setPage(1);
          }}
          dateChangeHandler={(value) => {
            setDateParam(value);
            setPage(1);
          }}
          column={column}
          data={ordersData?.orderList}
          loading={orderLoading}
          totalRecords={ordersData?.count}
          page={page}
          onPageChange={(page) => {
            setPage(page);
          }}
          selection
          rowHandler={rowHandler}
          selectedRowKeys={selectedRowKeys}
          DropdownActions={
            showActions && (
              <Button
                onClick={bulkDeleteHandler}
                size="large"
                type="primary"
                danger
              >
                Delete Orders
              </Button>
            )
          }
        />
      </HeadAndContent>
      {visible && (
        <NewOrderForm
          salesAgentData={salesAgentData}
          companies={AllCompany?.companies}
          visible={visible}
          onCancel={() => setVisible(false)}
        />
      )}
      {editVisible && (
        <NewOrderForm
          salesAgentData={salesAgentData}
          data={editData}
          companies={AllCompany?.companies}
          visible={editVisible}
          onCancel={() => setEditVisible(false)}
          editable
        />
      )}
    </>
  );
};

export default OrderDetailsContainer;
