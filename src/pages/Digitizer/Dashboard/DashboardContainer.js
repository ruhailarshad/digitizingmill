import { Col, Row } from "antd";
import React, { useState } from "react";
import { dashboardStats } from "../../../constants/stats";
import { orderColumns } from "../../../constants/tableColumns";
import DashboardChart from "../../../core/Dashboard/DashboardChart";
import UserCard from "../../../core/Dashboard/UserCard";
import NewUserForm from "../../../core/Forms/NewUserForm";
import HeadAndContent from "../../../core/HeadAndContent";
import StatsCard from "../../../core/StatsCard";
import CustomTable from "../../../core/Table/Table";
import { data } from "../../Admin/OrderDetails/utils";

const DashboardStats = (
  <Row gutter={[10, 10]}>
    {dashboardStats(267, 5, 5, 5).map((item, i) => (
      <Col xxl={6} xl={8} lg={12} md={24}>
        <StatsCard key={i} data={item} />
      </Col>
    ))}
  </Row>
);
const DashboardContainer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onCreate=()=>{
    
  }
  return (
    <>
      <HeadAndContent heading="Dashboard">
        <Row gutter={40}>
          <Col xl={6}>
            <UserCard
              data={{
                name: "Ruhail Arshad",
                role: "Digitizer",
                email: "monismazher@gmail.com",
                number: "03462880800",
                address: "saleem north karachi",
              }}
              btnHandler={()=>setIsModalVisible(true)}

            />
          </Col>
          <Col xl={18}>
            <div className="space-y-20">
              {DashboardStats}
              <DashboardChart />
            </div>
          </Col>
        </Row>
        <CustomTable column={orderColumns} data={data} />
      </HeadAndContent>
      <NewUserForm
        visible={isModalVisible}
        onCreate={onCreate}
        onCancel={() => 
          setIsModalVisible(false)}
      />
    </>
  );
};

export default DashboardContainer;
