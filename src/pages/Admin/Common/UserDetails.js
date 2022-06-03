import { Avatar, Button, Col, Row, Skeleton, Tabs } from "antd";
import React, { useState } from "react";
import { CustomTable, Text } from "../../../core";
import { UserOutlined } from "@ant-design/icons";
import { GrMail } from "react-icons/gr";
import { IoMdCall } from "react-icons/io";
import { BsFillHouseDoorFill } from "react-icons/bs";
import StatsCard from "../../../core/StatsCard";
import {
  companyColumnsForSalesAgent,
  companyColumnsForUserDetails,
  editableOrderColumnsUserDetails,
  orderColumns,
} from "../../../constants/tableColumns";
import { useParams } from "react-router-dom";
import { useGetAllCompany, useGetOrders } from "../../../hooks";
import NewCompanyForm from "../../../core/Forms/NewCompanyForm";
import NewOrderForm from "../../../core/Forms/NewOrderForm";

const UserDetails = ({
  data = { src: "" },
  stats,
  onModalShow,
  role,
isLoading,
  handler,
}) => {
  const { id } = useParams();

  const [companyFormData, setCompanyFormData] = useState([]);
  const [companyEditModal, setCompanyEditModal] = useState(false);
  const [orderFormData, setOrderFormData] = useState([]);
  const [orderEditModal, setOrderEditModal] = useState(false);
  const [companySearchParam, setCompanySearchParam] = useState("");
  const [orderSearchParam, setOrderSearchParam] = useState("");
  const [orderPage, setOrderPage] = useState(1);
  const [companyPage, setCompanyPage] = useState(1);
  const [orderDateParam, setOrderDateParam] = useState([]);
  const [companyDateParam, setCompanyDateParam] = useState([]);
  const [orderPageLimit, setOrderPageLimit] = useState(10);
  const [companyPageLimit, setCompanyPageLimit] = useState(10);
  const companyViewHandler = (values) => {
    setCompanyFormData(values);
    setCompanyEditModal(true);
  };
  const orderViewHandler = (values) => {
    setOrderFormData(values);
    setOrderEditModal(true);
  };
  const { data: companyData,isLoading: companyLoading } = useGetAllCompany({
    page: companyPage,
    id,
    limit: companyPageLimit,
    dateParam: companyDateParam,
    search: companySearchParam,
    skip: role !== "digitizer",
  });
  const { data: orderData,isLoading: orderLoading } = useGetOrders({
    page: orderPage,
    id,
    role,
    dateParam: orderDateParam,
    limit: orderPageLimit,
    showAll: true,
    search: orderSearchParam,
  });

  const DashboardStats = (
    <Row gutter={[10, 10]}>
      {stats.map((item, i) => (
        <Col key={i} xl={12} lg={12} md={12} sm={24} xs={24}>
          <StatsCard isLoading={isLoading} data={item} handler={handler} />
        </Col>
      ))}
    </Row>
  );

  return (
    <div className="p-40  ml-20  max-md:p-0 max-md:ml-0 ">
      <Row gutter={[20, 20]} className="bg-white rounded-20 p-20">
        <Col xl={12}>
          <Row align="middle" gutter={20}>
            <Col xl={7} lg={7} md={24}>
              <Avatar
                src={`http://localhost:4000/user/image/${data?.profilePic}`}
                size={180}
                icon={<UserOutlined />}
              />
            </Col>
            <Col xl={16} lg={16} md={24}>
              <Row gutter={20}>
                <Col>
                  {isLoading ? (
                    <Skeleton.Input
                      size="small"
                      active={true}
                      className="rounded-10 w-[300px] max-sm:w-[200px]"
                    />
                  ) : (
                    <Text
                      type="h2"
                      styles="text-gray-80 h2-med max-w-[380px] text-ellipsis overflow-hidden whitespace-nowrap "
                    >
                      {data.name}
                    </Text>
                  )}
                  {isLoading ? (
                    <Skeleton.Input
                      size="small"
                      active={true}
                      className="rounded-10 w-[250px] mt-4 "
                    />
                  ) : (
                    <Text type="h4" styles="text-gray-30 h4-bold">
                      {data.role}
                    </Text>
                  )}
                </Col>
                <Col>
                  {!isLoading && (
                   
                 
                    <Button
                      type="primary"
                      className="rounded-[10px] mt-10"
                      danger={true}
                      size="large"
                      onClick={onModalShow}
                    >
                      Edit Details
                    </Button>
                  )}
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Row gutter={10}>
                    <Col xl={12} lg={24} md={24} xs={24} sm={24}>
                      <Row align="middle" gutter={10}>
                        {isLoading ? (
                          <Skeleton.Input
                            size="small"
                            active={true}
                            className="rounded-10 w-full mt-4 "
                          />
                        ) : (
                          <>
                            <Col span={2}>
                              <GrMail size={22} color="#606472" />
                            </Col>
                            <Col span={22}>
                              <Text
                                type="h5"
                                styles="text-gray-30 ml-10 h5-med  max-w-[350px] text-ellipsis overflow-hidden"
                              >
                                {data.email}
                              </Text>
                            </Col>
                          </>
                        )}
                      </Row>
                    </Col>
                    <Col xl={12} lg={24} md={24}  xs={24} sm={24}>
                      <Row align="middle" gutter={10}>
                        {isLoading ? (
                          <Skeleton.Input
                          size="small"
                            active={true}
                            className="rounded-10 w-full mt-4 "
                          />
                        ) : (
                          <>
                            <Col>
                              <IoMdCall size={22} color="#606472" />
                            </Col>
                            <Col>
                              <Text
                                type="h5"
                                styles=" ml-10 text-gray-30 h5-med"
                              >
                                {data.contactNo}
                              </Text>
                            </Col>
                          </>
                        )}
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row align="middle" gutter={10}>
                  {isLoading ? (
                          <Skeleton.Input
                            size="small"
                            active={true}
                            className="rounded-10 w-full mt-4 "
                          />
                        ) : (  <><Col>
                        <BsFillHouseDoorFill size={22} color="#606472" />
                      </Col><Col>
                          <Text
                            type="h5"
                            styles=" ml-10 text-gray-30 h5-med  max-w-[480px] text-ellipsis overflow-hidden whitespace-nowrap"
                          >
                            {data.address}
                          </Text>
                        </Col></>)}
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col xl={12}>{DashboardStats}</Col>
      </Row>
      <Tabs type="card" defaultActiveKey="1" size="large" className="mt-20">
        {role !== "digitizer" && (
          <Tabs.TabPane tab="Company Details" key="1">
            <CustomTable
              loading={companyLoading}
              column={companyColumnsForUserDetails(companyViewHandler)}
              data={companyData?.companies || []}
              filterHandler={(value) => {
                setCompanySearchParam(value);
                setCompanyPage(1);
              }}
              page={companyPage}
              onPageChange={(page) => {
                setCompanyPage(page);
              }}
              totalRecords={companyData?.count}
              dateChangeHandler={(value) => {
                setCompanyDateParam(value);
                setCompanyPage(1);
              }}
              pageLimit={companyPageLimit}
              setPageLimit={setCompanyPageLimit}
            />
          </Tabs.TabPane>
        )}
        <Tabs.TabPane tab="Order Details" key="2">
          <CustomTable
            loading={orderLoading}
            column={editableOrderColumnsUserDetails(orderViewHandler)}
            data={orderData?.orderList || []}
            filterHandler={(value) => {
              setOrderSearchParam(value);
              setOrderPage(1);
            }}
            page={orderPage}
            onPageChange={(page) => {
              setOrderPage(page);
            }}
            totalRecords={orderData?.totalOrders}
            dateChangeHandler={(value) => {
              setOrderDateParam(value);
              setOrderPage(1);
            }}
            pageLimit={orderPageLimit}
            setPageLimit={setOrderPageLimit}
          />
        </Tabs.TabPane>
      </Tabs>
      {companyEditModal && (
        <NewCompanyForm
          editable={true}
          data={companyFormData}
          visible={companyEditModal}
          onCancel={() => setCompanyEditModal(false)}
          role="sales-agent"
        />
      )}
      {orderEditModal && (
        <NewOrderForm
          data={orderFormData}
          companies={companyData?.companies}
          visible={orderEditModal}
          onCancel={() => setOrderEditModal(false)}
          editable
        />
      )}
    </div>
  );
};

export default UserDetails;
