import { Avatar, Button, Col, Row, Tabs } from "antd";
import React from "react";
import { CustomTable, Text } from "../../../core";
import { UserOutlined } from "@ant-design/icons";
import { GrMail } from "react-icons/gr";
import { IoMdCall } from "react-icons/io";
import { BsFillHouseDoorFill } from "react-icons/bs";
import StatsCard from "../../../core/StatsCard";
import { companyColumnsNonEditable, orderColumns } from "../../../constants/tableColumns";
import { useParams } from "react-router-dom";
import { useGetCompanyByRole } from "../../../hooks";
const tableData = [
    {
      company_id: 2,
      registration_date: 2,
      company_name: "sada",
      contact_no: 123123123,
      email_address: "asdad",
      sales_agent: "Alex Josep",
    },
  ];
  export const orderData = [
    {
      key: "1",
      order_id: "John Brown",
      order_date: 32,
      customer_name: "New York No. 1 Lake Park",
      design_name: "New York No. 1 Lake Park",
      size_type: "New York No. 1 Lake Park",
      amount: "New York No. 1 Lake Park",
      payment_status: "paid",
      order_status: "New York No. 1 Lake Park",
    },
    {
      key: "1",
      order_id: "Aohn Brown",
      order_date: 32,
      customer_name: "New York No. 1 Lake Park",
      design_name: "New York No. 1 Lake Park",
      size_type: "New York No. 1 Lake Park",
      amount: "New York No. 1 Lake Park",
      payment_status: "pending",
      order_status: "New York No. 1 Lake Park",
    },
    {
      key: "1",
      order_id: "Bohn Brown",
      order_date: 32,
      customer_name: "New York No. 1 Lake Park",
      design_name: "New York No. 1 Lake Park",
      size_type: "New York No. 1 Lake Park",
      amount: "New York No. 1 Lake Park",
      payment_status: "completed",
      order_status: "New York No. 1 Lake Park",
    },
    {
      key: "1",
      order_id: "Cohn Brown",
      order_date: 32,
      customer_name: "New York No. 1 Lake Park",
      design_name: "New York No. 1 Lake Park",
      size_type: "New York No. 1 Lake Park",
      amount: "New York No. 1 Lake Park",
      payment_status: "New York No. 1 Lake Park",
      order_status: "New York No. 1 Lake Park",
    },
  
  ];
const UserDetails = ({ data = { src: "" } ,stats,onModalShow,role}) => {
  const { id } = useParams();
  const {data:companyData,isLoading:companyLoading}=useGetCompanyByRole({role:role,id:id,skip:role==='digitizer'})
    const DashboardStats = (
        <Row gutter={[10, 10]}>
          {stats.map((item, i) => (
            <Col lg={12}>
              <StatsCard key={i} data={item} />
            </Col>
          ))}
        </Row>
      );   

  return (
    <div className="p-40  ml-20  max-md:p-0 max-md:ml-0 ">
      <Row gutter={[20,20]} className="bg-white rounded-20 p-20">
        <Col xl={12}>
          <Row align="middle" gutter={20}>
            <Col xl={8} lg={8} md={24}  >
              {!data.src && <Avatar size={180} icon={<UserOutlined />} />}
            </Col>
            <Col xl={16} lg={16} md={24} >
              <Row gutter={20}>
                <Col>
                  <Text type="h2" styles="text-gray-80 h2-med">
                    {data.name}
                  </Text>
                  <Text type="h4" styles="text-gray-30 h4-bold">
                    {data.role}
                  </Text>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    className="rounded-[10px] mt-10"
                    danger
                    size="large"
                    onClick={onModalShow}
                  >
                    Edit Details
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col lg={24}>
                  <Row gutter={10}>
                    <Col>
                      <Row align="middle" gutter={10}>
                        <Col>
                          <GrMail size={22} color="#606472" />
                        </Col>
                        <Col>
                          <Text type="h5" styles="text-gray-30 h5-med">
                            {data.email}
                          </Text>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Row align="middle" gutter={10}>
                        <Col>
                          <IoMdCall size={22} color="#606472" />
                        </Col>
                        <Col>
                          <Text type="h5" styles="text-gray-30 h5-med">
                            {data.contactNo}
                          </Text>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row align="middle" gutter={10}>
                    <Col>
                      <BsFillHouseDoorFill size={22} color="#606472" />
                    </Col>
                    <Col>
                      <Text type="h5" styles="text-gray-30 h5-med">
                        {data.address}
                      </Text>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col  xl={12} >
       { DashboardStats}
        </Col>
      </Row>
      <Tabs danger type="card" defaultActiveKey="1" size="large" className="mt-20">
         {role!=='digitizer' && <Tabs.TabPane tab="Company Details" key="1">
          <CustomTable column={companyColumnsNonEditable} isLoading={companyLoading} data={companyData?.companies}/>
          </Tabs.TabPane>}
          <Tabs.TabPane tab="Order Details" key="2">
          <CustomTable column={orderColumns} data={orderData}/>
          </Tabs.TabPane>
        
        </Tabs>
    </div>
  );
};

export default UserDetails;
