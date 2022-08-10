import { Button, Col, Modal, Row } from "antd";
import React, { useState } from "react";
import moment from "moment";
import { orderDetailStats } from "../../../constants/stats";
import { editableOrderColumns } from "../../../constants/tableColumns";
import { CustomTable } from "../../../core";
import NewOrderForm from "../../../core/Forms/NewOrderForm";
import HeadAndContent from "../../../core/HeadAndContent";
import StatsCard from "../../../core/StatsCard";
import {
  useBulkDeleteOrders,
  useDeleteOrder,
  useGetAllCompany,
} from "../../../hooks";
import { useGetOrders } from "../../../hooks/Orders/useGetOrders";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { exceOrderrHeader } from "../../../constants/execelHeader";

const OrderDetailsContainer = () => {
  //pagination
  const [page, setPage] = useState(1);
  const [orderPageLimit, setOrderPageLimit] = useState(10);
  const [dateParam, setDateParam] = useState([]);
  const [searchParam, setSearchParam] = useState("");

  //orderform
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [editData, setEditData] = useState("");

  const [showActions, setShowActions] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [companyUser, setCompanyUser] = useState("");
  const { mutate: deleteOrder } = useDeleteOrder();

  const { data: ordersData, isLoading: orderLoading } = useGetOrders({
    page,
    limit: orderPageLimit,
    search: searchParam,
    dateParam,
  });

  const { mutate: deleteBulkOrder } = useBulkDeleteOrders({});
  const { data: AllCompany } = useGetAllCompany({
    id: companyUser?.role === "sales-agent" ? companyUser?.userId : "",
    noDateParam: true,
  });
  const orderStats = (
    <Row gutter={[30, 30]}>
      {orderDetailStats(
        ordersData?.totalOrders,
        ordersData?.inProgressOrders,
        ordersData?.pendingOrders,
        ordersData?.readyToDeliveredOrders,
        ordersData?.completedOrders,
        ordersData?.urgentOrders
      ).map((item, i) => (
        <Col xxl={4} xl={6} lg={8} md={10} xs={24} key={i}>
          <StatsCard isLoading={orderLoading} data={item} />
        </Col>
      ))}
    </Row>
  );
  const editHandler = (record) => {
    setEditVisible(true);
    setEditData(record);
    setCompanyUser(record?.SalesAgent);
  };
  const deleteHandler = (id) => {
    deleteOrder(id);
  };

  const rowHandler = {
    onChange: (selectedRowKeys, selectedRows) => {
      selectedRows.length >= 1 ? setShowActions(true) : setShowActions(false);
      setSelectedRowKeys(selectedRowKeys);
      console.log(selectedRows, "selectedRows");
      const filter = [...selectedRows].map((item) => {
        return {
          orderId: item.orderId,
          orderDate: moment(item.orderDate).format("MMMM Do YYYY,h:mm:ss"),
          customerName: item.customerName,
          designName: item.designName,
          size: item.design_sizes.map((item) => item.size).join(", "),
          amount: `${
            item.currency === "Euro"
              ? "€"
              : item.currency === "USD"
              ? "$"
              : item.currency === "CAD"
              ? "CA$"
              : "$"
          }${item.totalPrize}`,
          paymentStatus: item.paymentStatus,
          orderStatus: item.orderStatus,
          deliveryStatus: item.deliveryStatus,
        };
      });
      setSelectedRows(filter);
    },
  };
  const bulkDeleteHandler = () => {
    const newData = [...selectedRowKeys];

    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Do you want to delete following this items?",

      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        deleteBulkOrder({ data: { ids: newData } });
        setShowActions(false);
        setSelectedRowKeys([]);
      },
    });
  };
  const column = editableOrderColumns(editHandler, deleteHandler);
  return (
    <>
      <HeadAndContent
        heading="Order Details"
        btn={{
          name: "Add New Order",
          buttonHandler: () => {
            setCompanyUser({});
            setVisible(true);
          },
        }}
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
          totalRecords={ordersData?.totalOrders}
          page={page}
          onPageChange={(page) => {
            setPage(page);
          }}
          selection
          rowHandler={rowHandler}
          selectedRowKeys={selectedRowKeys}
          DropdownActions={
            <Button
              onClick={bulkDeleteHandler}
              size="large"
              type="primary"
              danger
            >
              Delete Orders
            </Button>
          }
          exportData={{ header: exceOrderrHeader, data: selectedRows }}
          showActions={showActions}
          pageLimit={orderPageLimit}
          setPageLimit={setOrderPageLimit}
        />
      </HeadAndContent>
      {visible && (
        <NewOrderForm
          companies={AllCompany?.companies}
          visible={visible}
          onCancel={() => setVisible(false)}
          setCompanyUser={setCompanyUser}
        />
      )}
      {editVisible && (
        <NewOrderForm
          data={editData}
          companies={AllCompany?.companies}
          visible={editVisible}
          onCancel={() => setEditVisible(false)}
          editable
          setCompanyUser={setCompanyUser}
        />
      )}
    </>
  );
};

export default OrderDetailsContainer;
