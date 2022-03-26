import { Col, Row } from "antd";
import React from "react";
import { dashboardStats } from "../../../constants/stats";
import { orderColumns } from "../../../constants/tableColumns";
import DashboardChart from "../../../core/Dashboard/DashboardChart";
import UserCard from "../../../core/Dashboard/UserCard";
import HeadAndContent from "../../../core/HeadAndContent";
import StatsCard from "../../../core/StatsCard";
import CustomTable from "../../../core/Table/Table";
import { data } from "../OrderDetails/utils";
const DashboardStats = (
  <Row align="center" gutter={[10, 10]}>
    {dashboardStats(267, 5, 5, 5).map((item, i) => (
      <Col xxl={6} xl={8} lg={12} md={24}>
        <StatsCard key={i} data={item} />
      </Col>
    ))}
  </Row>
);
const DashboardContainer = () => {
  return (
    <>
      <HeadAndContent heading="Dashboard">
        <Row align="center" gutter={[40,40]}>
          <Col xl={6} lg={10} >
            <UserCard
              data={{
                name: "Ruhail Arshad",
                role: "Admin",
                email: "ruhailarshad@gmail.com",
                number: "03462880800",
                address: "saleem north karachi",
              }}
            />
          </Col>
          <Col xl={18} lg={14}>
            <div className="space-y-20">
              {DashboardStats}
              <DashboardChart />
            </div>
          </Col>
        </Row>
        <CustomTable column={orderColumns} data={data} />
      </HeadAndContent>
    </>
  );
};

export default DashboardContainer;
