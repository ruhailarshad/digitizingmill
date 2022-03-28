import { Col, Row } from "antd";
import React, { useState } from "react";
import { orderDetailStats } from "../../../constants/stats";
import { editableOrderColumns, orderColumns } from "../../../constants/tableColumns";
import { CustomTable } from "../../../core";
import NewOrderForm from "../../../core/Forms/NewOrderForm";
import HeadAndContent from "../../../core/HeadAndContent";
import StatsCard from "../../../core/StatsCard";
import { data} from "./utils";

const OrderDetailsContainer = () => {
    const [visible, setVisible] = useState(false)
  const orderStats =  (<Row gutter={[10,10]}>
  {orderDetailStats(267,5,5,22,5).map((item, i) => (
    <Col xxl={4} xl={6} lg={12} md={24} key={i}>
      <StatsCard  data={item} />
    </Col>
  ))}
</Row>)
const editHandler=(record)=>{
  setVisible(true)
console.log(record)
}
const column=editableOrderColumns(editHandler)
  return (
      <>
    <HeadAndContent
      heading="Order Details"
      btn={{ name: "Add New Order", buttonHandler:  ()=>setVisible(true)  }}
    >
      {orderStats}
      <CustomTable column={column} data={data}/>
    </HeadAndContent>
    <NewOrderForm visible={visible} onCancel={()=>setVisible(false)}/>
    </>
  );
};

export default OrderDetailsContainer;
