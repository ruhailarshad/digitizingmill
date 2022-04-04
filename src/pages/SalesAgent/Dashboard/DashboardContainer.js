import { Col, Row } from "antd";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { dashboardStats } from "../../../constants/stats";
import { orderColumns } from "../../../constants/tableColumns";
import DashboardChart from "../../../core/Dashboard/DashboardChart";
import UserCard from "../../../core/Dashboard/UserCard";
import NewUserForm from "../../../core/Forms/NewUserForm";
import HeadAndContent from "../../../core/HeadAndContent";
import StatsCard from "../../../core/StatsCard";
import CustomTable from "../../../core/Table/Table";
import { useGetUserById } from "../../../hooks/User/useGetUserById";
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
  const { tokenData }=useOutletContext()
  console.log(tokenData)
  const { data:userData, isLoading } = useGetUserById({
    id:tokenData.userId,
    role:'sales-agent',
  });
  return (
    <>
      <HeadAndContent heading="Dashboard">
        <Row gutter={40}>
          <Col xl={6}>
            <UserCard
              data={{
                name: userData?.userData[0]?.name,
                role: userData?.userData[0]?.role,
                email: userData?.userData[0]?.email,
                number: userData?.userData[0]?.contactNo,
                address: userData?.userData[0]?.address,
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
      {isModalVisible &&  <NewUserForm
        visible={isModalVisible}
        data={userData?.userData[0]}
        userRole={tokenData.role}
        id={tokenData.userId}
        onCancel={() => 
          setIsModalVisible(false)}
      />}
    </>
  );
};

export default DashboardContainer;
