import { Col, Grid, Row } from "antd";
import React, {  useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useOutletContext } from "react-router-dom";
import { dashboardStats } from "../../constants/stats";
import { orderColumns } from "../../constants/tableColumns";
import { useGetOrders, useGetUserById } from "../../hooks";
import NewUserForm from "../Forms/NewUserForm";
import HeadAndContent from "../HeadAndContent";
import StatsCard from "../StatsCard";
import CustomTable from "../Table/Table";
import DashboardChart from "./DashboardChart";
import UserCard from "./UserCard";
const Dashboard = () => {
  const isLaptop = useMediaQuery({ query: "(max-width: 900px)" });

const [isModalVisible, setIsModalVisible] = useState(false);
 const { tokenData }=useOutletContext()
  const { data:userData, isLoading } = useGetUserById({
    id:tokenData.userId,
    role:tokenData.role,
  });
  const {
    data: ordersData,
    isLoading: orderLoading,
  } = useGetOrders({
    page:1,
    limit: 20,
  });
  console.log(ordersData,'ordersData')
const DashboardStats = (
    <Row  gutter={[10, 10]}>
      {dashboardStats(userData?.totalCompanies, userData?.totalSales, userData?.pendingSales, userData?.completedSales).map((item, i) => (
        <Col xxl={6} xl={8} lg={12} md={11} sm={24} key={i}>
          <StatsCard  data={item} />
        </Col>
      ))}
    </Row>
  );
  return (
    <>
      <HeadAndContent heading="Dashboard">
        <Row align={isLaptop && 'center'}  gutter={[20,20]}>
        <Col xl={18} lg={16}>
            <div className="space-y-20">
              {DashboardStats}
              <DashboardChart />
            </div>
          </Col>
          <Col xl={6} lg={8} sm={14}  xs={22}   >
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
        </Row>
        <CustomTable noFilter column={orderColumns} data={ordersData?.orderList} loading={orderLoading}/>
      </HeadAndContent>
   
     {isModalVisible &&  <NewUserForm
        visible={isModalVisible}
        data={userData?.userData[0]}
        userRole={tokenData.role}
        id={tokenData.userId}
        editable
        onCancel={() => 
          setIsModalVisible(false)}
      />}
    </>
  );
};

export default Dashboard;
