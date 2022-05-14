import { Button, Col, Dropdown, Menu, Modal, Row, Select } from "antd";
import React, { useState } from "react";

import { DownOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useGetUserByRole } from "../../../hooks/User/useGetUserByRole";

const { Option } = Select;

const DropdownActions = ({ deleteHandler, updateHandler }) => {
  const [salesAgentVisible, setSalesAgentVisible] = useState(false);
  const [salesAgent, setSalesAgent] = useState("");
  const { isLoading: isUserLoading, data: adminData } = useGetUserByRole();
  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          setSalesAgentVisible(false);
          Modal.confirm({
            title: "Confirm",
            icon: <ExclamationCircleOutlined />,
            content: "Do you want to delete this items?",

            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk: deleteHandler,
          });
        }}
      >
        <p className="text-gray-80">Delete Companies</p>
      </Menu.Item>
      <Menu.Item onClick={() => setSalesAgentVisible(true)}>
        <p className="text-gray-80">Update SalesAgent</p>
      </Menu.Item>
    </Menu>
  );
  return (
    <Row gutter={[10, 10]}>
      <Col xl={10} lg={10} md={9} xs={24}>
        <Dropdown className="h-40 w-[100%]" overlay={menu} trigger={["click"]}>
          <Button>
            Filter Action <DownOutlined />
          </Button>
        </Dropdown>
      </Col>
      {salesAgentVisible && (
        <>
          <Col xl={10} lg={10} xs={24}>
            <Select
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              loading={isUserLoading}
              onChange={(value) => setSalesAgent(value)}
              size="large"
              className=" w-[100%]"
              placeholder="Select SalesAgent"
            >
              {adminData?.filter(item=>item.role==='admin' || item.role=== 'sales-agent').map((p) => (
                <Option value={p.userId} key={p.userId}>
                  {p.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xl={4} lg={4} md={5}>
            {salesAgent && (
              <Button
                onClick={() => updateHandler(salesAgent)}
                block
                size="large"
                type="primary"
                danger
              >
                Update
              </Button>
            )}
          </Col>
        </>
      )}
    </Row>
  );
};

export default DropdownActions;
