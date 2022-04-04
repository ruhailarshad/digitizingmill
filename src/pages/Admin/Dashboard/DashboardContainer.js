import { Col, Row } from "antd";
import React, { useCallback, useMemo, useState } from "react";
import { dashboardStats } from "../../../constants/stats";
import { orderColumns } from "../../../constants/tableColumns";
import DashboardChart from "../../../core/Dashboard/DashboardChart";
import UserCard from "../../../core/Dashboard/UserCard";
import NewUserForm from "../../../core/Forms/NewUserForm";
import HeadAndContent from "../../../core/HeadAndContent";
import StatsCard from "../../../core/StatsCard";
import CustomTable from "../../../core/Table/Table";
import { data } from "../OrderDetails/utils";
import { isVisible } from "@testing-library/user-event/dist/utils";
import { getUserData } from "../../../services/utils";
import { useGetUserById } from "../../../hooks/User/useGetUserById";
import { useOutletContext } from "react-router-dom";

const DashboardStats = (
  <Row align="center" gutter={[10, 10]}>
    {dashboardStats(267, 5, 5, 5).map((item, i) => (
      <Col xxl={6} xl={8} lg={12} md={24} key={i}>
        <StatsCard  data={item} />
      </Col>
    ))}
  </Row>
);
const DashboardContainer = () => {
 const { tokenData }=useOutletContext()
  console.log(tokenData)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data:userData, isLoading } = useGetUserById({
    id:tokenData.userId,
    role:'sales-agent',
  });
console.log(userData,"userData")
  return (
    <>
      <HeadAndContent heading="Dashboard">
        <Row align="center" gutter={[40,40]}>
          <Col xl={6} lg={10} >
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
          <Col xl={18} lg={14}>
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
