import { Col, Row } from "antd";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { orderDetailStats } from "../../../constants/stats";
import {
  editableOrderColumnsUserDetails,
  orderColumns,
} from "../../../constants/tableColumns";
import { CustomTable } from "../../../core";
import NewOrderForm from "../../../core/Forms/NewOrderForm";
import HeadAndContent from "../../../core/HeadAndContent";
import StatsCard from "../../../core/StatsCard";
import { useGetAllCompany, useGetOrders } from "../../../hooks";

const OrderDetailsContainer = () => {
  const { tokenData } = useOutletContext();
  const [editData, setEditData] = useState("");
  const [page, setPage] = useState(1);
  const [searchParam, setSearchParam] = useState("");
  const [dateParam, setDateParam] = useState([]);
  const [orderPageLimit, setOrderPageLimit] = useState(10);
  const [editVisible, setEditVisible] = useState(false);

  const [visible, setVisible] = useState(false);
  const { data: ordersData, isLoading: orderLoading } = useGetOrders({
    role: "sales-agent",
    id: tokenData.userId,
    page,
    limit: orderPageLimit,
    search: searchParam,
    dateParam,
  });
  const { data: AllCompany } = useGetAllCompany({
    role: "sales-agent",
    id: tokenData.userId,
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
          column={editableOrderColumnsUserDetails(editHandler)}
          data={ordersData?.orderList}
          loading={orderLoading}
          totalRecords={ordersData?.count}
          page={page}
          onPageChange={(page) => {
            setPage(page);
          }}
          pageLimit={orderPageLimit}
          setPageLimit={setOrderPageLimit}
        />
      </HeadAndContent>
      {visible && (
        <NewOrderForm
          companies={AllCompany?.companies}
          visible={visible}
          onCancel={() => setVisible(false)}
          role='sales-agent'
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
          role='sales-agent'
          roleData={{name:tokenData.name,id:tokenData.userId}}

        />
      )}
    </>
  );
};

export default OrderDetailsContainer;
