import { Col, Row } from "antd";
import React, { useState } from "react";
import { detailsStats } from "../../../constants/stats";
import { orderColumns } from "../../../constants/tableColumns";
import { CustomTable } from "../../../core";
import NewOrderForm from "../../../core/Forms/NewOrderForm";
import HeadAndContent from "../../../core/HeadAndContent";
import StatsCard from "../../../core/StatsCard";
import { data } from "../OrderDetails/utils";

const OrderDetailsContainer = () => {
  const [visible, setVisible] = useState(false);
  const orderStats = (
    <Row gutter={[30, 30]}>
      {detailsStats(267, 5, 5, 22).map((item, i) => (
        <Col xxl={6} xl={6} lg={12} md={24}>
          <StatsCard key={i} data={item} />
        </Col>
      ))}
    </Row>
  );
  return (
    <>
      <HeadAndContent heading="Sales Report">
        {orderStats}
        <CustomTable column={orderColumns} data={data} />
      </HeadAndContent>
      <NewOrderForm visible={visible} onCancel={() => setVisible(false)} />
    </>
  );
};

export default OrderDetailsContainer;
