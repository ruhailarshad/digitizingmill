import { Column } from "@ant-design/plots";
import { Col, Row, Select } from "antd";
import { useState } from "react";
import { useGetAllSales } from "../../hooks/User/Sales/useGetSales";
const DashboardChart = () => {
  const [currency, setCurrency] = useState('USD')
  const { data: currencyData, isLoading } = useGetAllSales({
    byCurrency:currency,
  });
  console.log('currencyData', currencyData);
  const data = [
    {
      type: "January",
      sales: 38,
    },
    {
      type: "February",
      sales: 52,
    },
    {
      type: "March",
      sales: 61,
    },
    {
      type: "April",
      sales: 145,
    },
    {
      type: "May",
      sales: 48,
    },
    {
      type: "June",
      sales: 38,
    },
    {
      type: "July",
      sales: 38,
    },
    {
      type: "August",
      sales: 38,
    },
    {
      type: "September",
      sales: 38,
    },
    {
      type: "October",
      sales: 38,
    },
    {
      type: "November",
      sales: 38,
    },
    {
      type: "December",
      sales: 38,
    },
  ];
  const config = {
    data,
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
