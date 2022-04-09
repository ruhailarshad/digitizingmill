import { Button, Col, Dropdown, Menu, Modal, Row, Select } from "antd";
import React, { useState } from "react";

import { DownOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useGetUserByRole } from "../../../hooks/User/useGetUserByRole";

const { Option } = Select;

const DropdownActions = ({deleteHandler}) => {

  const [salesAgentVisible, setSalesAgentVisible] = useState(false);
  const { isLoading: isUserLoading, data: salesAgentData } = useGetUserByRole({
    role: "sales-agent",
  });
  
  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
    setSalesAgentVisible(false)
          Modal.confirm({
            title: "Confirm",
            icon: <ExclamationCircleOutlined />,
            content: "Do you want to delete this items?",

            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk:  deleteHandler,
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
    <Row gutter={10}>
      <Col  span={10}>
        <Dropdown className="h-40 w-[100%]" overlay={menu} trigger={['click']}>
          <Button  >
            Filter Action <DownOutlined />
          </Button>
        </Dropdown>
      </Col>
      {salesAgentVisible && (
        <>
          <Col span={10}>
            <Select loading={isUserLoading}  size="large" className=" w-[100%]" placeholder="Select SalesAgent" >
              {salesAgentData.map((p) => (
                <Option value={p.userId} key={p.userId}>
                  {p.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col  span={4}>
            <Button block size="large" type="primary" danger>
              Update
            </Button>
          </Col>
        </>
      )}
    </Row>
  );
};

export default DropdownActions;
