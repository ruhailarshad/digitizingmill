import { Col, Row } from "antd";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { exceOrderrHeader } from "../../../constants/execelHeader";
import { dashboardStats } from "../../../constants/stats";
import {
  orderColumns,
} from "../../../constants/tableColumns";
import { CustomTable } from "../../../core";
import NewOrderForm from "../../../core/Forms/NewOrderForm";
import HeadAndContent from "../../../core/HeadAndContent";
import StatsCard from "../../../core/StatsCard";
import { useGetAllCompany, useGetOrders } from "../../../hooks";
import moment from "moment";
const SalesReportContainer = () => {
  const { tokenData } = useOutletContext();
  const [page, setPage] = useState(1);
  const [searchParam, setSearchParam] = useState("");
  const [dateParam, setDateParam] = useState([]);
  const [orderPageLimit, setOrderPageLimit] = useState(10);
  const [editVisible, setEditVisible] = useState(false);
  const [sales, setSales] = useState("totalSalesDollar");
  const [showActions, setShowActions] = useState(false);
  const [editData, setEditData] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

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
    <Row gutter={[20, 20]}>
      {dashboardStats(
        ordersData?.totalOrders,
        ordersData?.inProgressOrders,
        ordersData?.pendingOrders,
        ordersData?.completedOrders,
        'sales-agent',
        sales === "totalSalesDollar"
        ? "$"
        : sales === "totalSalesCanadian"
        ? "CA$"
        : sales === "totalSalesEuro"
        ? "€"
        : "$"
      ).map((item, i) => (
        <Col xxl={4} xl={6} lg={8} md={10} xs={24} key={i}>
          <StatsCard isLoading={orderLoading }data={item} 
            handler={(values) => setSales(values)}
            />
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
      setSelectedRowKeys(selectedRowKeys);
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
          bonus:item.bonus,
        };
      });
      setSelectedRows(filter);
    },
  };
  return (
    <>
      <HeadAndContent
        heading="Sales Report"
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
          column={orderColumns}
          data={ordersData?.orderList}
          loading={orderLoading}
          totalRecords={ordersData?.count}
          page={page}
          onPageChange={(page) => {
            setPage(page);
          }}
          pageLimit={orderPageLimit}
          setPageLimit={setOrderPageLimit}
          selection
          rowHandler={rowHandler}
          selectedRowKeys={selectedRowKeys}
          exportData={{ header: exceOrderrHeader, data: selectedRows }}
          showActions={showActions}
          filename="SalesAgentOrderStats"
        />
      </HeadAndContent>
     
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

export default SalesReportContainer;
