import { Column } from "@ant-design/plots";
import { Col, Row, Select } from "antd";
import { useState } from "react";
import { useGetAllSales } from "../../hooks/User/Sales/useGetSales";
const DashboardChart = () => {
  const [currency, setCurrency] = useState('USD')
  const { data: currencyData, isLoading } = useGetAllSales({
    byCurrency:currency,
  });
  
  const data = [
    {
      type: "January",
      sales: 0,
    },
    {
      type: "February",
      sales: 0,
    },
    {
      type: "March",
      sales: 0,
    },
    {
      type: "April",
      sales: 0,
    },
    {
      type: "May",
      sales: 0,
    },
    {
      type: "June",
      sales: 0,
    },
    {
      type: "July",
      sales: 0,
    },
    {
      type: "August",
      sales: 0,
    },
    {
      type: "September",
      sales: 0,
    },
    {
      type: "October",
      sales: 0,
    },
    {
      type: "November",
      sales: 0,
    },
    {
      type: "December",
      sales: 0,
    },
  ];
  const config = {
    data:currencyData?.sales || data,
    loadimg:isLoading,
    xField: "type",
    yField: "sales",
    color: "#f5222d",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "type",
      },
      sales: {
        alias: "sales",
      },
    },
  };
  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <Row align="end">
          <Select size="large" defaultValue="USD" className="w-100 " onChange={(value)=>setCurrency(value)}>
            <Select.Option value="USD">USD</Select.Option>
            <Select.Option value="CAD">CAD</Select.Option>
            <Select.Option value="Euro">Euro</Select.Option>
          </Select>
        </Row>
      </Col>
      <Col span={24}>
        <Column {...config} />
      </Col>
    </Row>
  );
};
export default DashboardChart;
