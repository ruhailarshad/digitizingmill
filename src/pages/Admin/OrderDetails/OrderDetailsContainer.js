import { Col, Row } from "antd";
import React, { useState } from "react";
import { orderDetailStats } from "../../../constants/stats";
import { orderColumns } from "../../../constants/tableColumns";
import { CustomTable } from "../../../core";
import NewOrderForm from "../../../core/Forms/NewOrderForm";
import HeadAndContent from "../../../core/HeadAndContent";
import StatsCard from "../../../core/StatsCard";
import { data} from "./utils";

const OrderDetailsContainer = () => {
    const [visible, setVisible] = useState(false)
  const orderStats =  (<Row gutter={[30,30]}>
  {orderDetailStats(267,5,5,22,5).map((item, i) => (
    <Col xxl={4} xl={6} lg={12} md={24}>
      <StatsCard key={i} data={item} />
    </Col>
  ))}
</Row>)
  return (
      <>
    <HeadAndContent
      heading="Order Details"
      btn={{ name: "Add New Order", buttonHandler:  ()=>setVisible(true)  }}
    >
      {orderStats}
      <CustomTable column={orderColumns} data={data}/>
    </HeadAndContent>
    <NewOrderForm visible={visible} onCancel={()=>setVisible(false)}/>
    </>
  );
};

export default OrderDetailsContainer;
