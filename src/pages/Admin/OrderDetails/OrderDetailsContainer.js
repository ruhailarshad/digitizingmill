import { Col, Row } from "antd";
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
import { useGetAllCompany, useGetUserByRole } from "../../../hooks";
import { useGetOrders } from "../../../hooks/Orders/useGetOrders";

const OrderDetailsContainer = () => {
 const {tokenData}= useOutletContext()
  const {data:ordersData,isLoading:orderLoading}=useGetOrders()
  const { data: AllCompany } =
  useGetAllCompany();
  const {  data: salesAgentData } = useGetUserByRole({
    role: "sales-agent",
  });

  const [visible, setVisible] = useState(false);
  const orderStats = (
    <Row gutter={[5, 10]}>
      {orderDetailStats(267, 5, 5, 22, 5).map((item, i) => (
        <Col xxl={5} xl={8} lg={8} md={10}  xs={24} key={i}>
          <StatsCard data={item} />
        </Col>
      ))}
    </Row>
  );
  const editHandler = (record) => {
    setVisible(true);
    console.log(record);
  };
  const column = editableOrderColumns(editHandler);
  return (
    <>
      <HeadAndContent
        heading="Order Details"
        btn={{ name: "Add New Order", buttonHandler: () => setVisible(true) }}
      >
        {orderStats}
        <CustomTable column={column} data={ordersData?.orders} loading={orderLoading}/>
      </HeadAndContent>
     {visible &&  <NewOrderForm salesAgentData={salesAgentData} companies={AllCompany?.companies} visible={visible} onCancel={() => setVisible(false)} />}
    </>
  );
};

export default OrderDetailsContainer;
