import { Col, Row } from "antd";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import moment from "moment";
import { useGetAllCompany, useGetOrders } from "../../hooks";
import { orderDetailStats } from "../../constants/stats";
import StatsCard from "../../core/StatsCard";
import HeadAndContent from "../../core/HeadAndContent";
import { CustomTable } from "../../core";
import { exceOrderrHeader } from "../../constants/execelHeader";
import NewOrderForm from "../../core/Forms/NewOrderForm";
import { editableOrderColumnsDigitizer, editableOrderColumnsUserDetails } from "../../constants/tableColumns";

const OrderPage = ({role}) => {
  const { tokenData } = useOutletContext();
  const [editData, setEditData] = useState("");
  const [page, setPage] = useState(1);
  const [searchParam, setSearchParam] = useState("");
  const [dateParam, setDateParam] = useState([]);
  const [orderPageLimit, setOrderPageLimit] = useState(10);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showActions, setShowActions] = useState(false);

  const [visible, setVisible] = useState(false);
  const { data: ordersData, isLoading: orderLoading } = useGetOrders({
    role:role,
    id: tokenData.userId,
    page,
    limit: orderPageLimit,
    search: searchParam,
    dateParam,
  });
  const { data: AllCompany } = useGetAllCompany({
    role:role,
    id: tokenData.userId,
    skip:!role==='digitizer'
  });
console.log(ordersData,'ordersData')
  const orderStats = (
    <Row gutter={[5, 10]}>
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
  };
  const rowHandler = {
    onChange: (selectedRowKeys, selectedRows) => {
      selectedRows.length >= 1 ? setShowActions(true) : setShowActions(false);
      setSelectedRowKeys(selectedRowKeys)
      console.log(selectedRows,'selectedRows')
      const filter=[...selectedRows].map((item) => {
        return {
          orderId: item.orderId,
          orderDate:moment(item.orderDate).format("MMMM Do YYYY,h:mm:ss"),
          customerName: item.customerName,
          designName: item.designName,
          size:item.design_sizes.map((item) => item.size).join(", "),
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
          column={role==='digitizer' ? editableOrderColumnsDigitizer(editHandler) :editableOrderColumnsUserDetails(editHandler)}
          data={ordersData?.orderList}
          loading={orderLoading}
          totalRecords={ordersData?.count}
          page={page}
          onPageChange={(page) => {
            setPage(page);
          }}
          pageLimit={orderPageLimit}
          setPageLimit={setOrderPageLimit}
          rowHandler={rowHandler}
          selectedRowKeys={selectedRowKeys}
          exportData={{ header: exceOrderrHeader, data: selectedRows }}
          showActions={showActions}
        />
      </HeadAndContent>
      {visible && (
        <NewOrderForm
          companies={AllCompany?.companies}
          visible={visible}
          onCancel={() => setVisible(false)}
          role={role}
          roleData={{name:tokenData.name,id:tokenData.userId}}

        />
      )}
      {editVisible && (
        <NewOrderForm
          data={editData}
          companies={AllCompany?.companies}
          visible={editVisible}
          onCancel={() => setEditVisible(false)}
          editable
          role={role}
          roleData={{name:tokenData.name,id:tokenData.userId}}
        
        />
      )}
    </>
  );
};

export default OrderPage;
