import { Avatar, Col, Modal, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { Text } from "../../../core";
import { AiFillDelete } from "react-icons/ai";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useDeleteUser } from "../../../hooks/User/useDeleteUser";

const UserCard = ({ name, userId, email ,role}) => {
  const { mutate: deleteUser } = useDeleteUser({role:role});
  
  const deleteHandler = (e) => {
    e.preventDefault();
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Do you want to delete this items?",

      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => deleteUser(userId),
    });
  };
  return (
      <Link
        to={`${userId}`}
        className=" shadow-[-7px_10px_12px_-1px_rgba(0,0,0,0.03)] cursor-pointer min-w-[290px]  rounded-[20px] border-none p-20 bg-white flex items-center hover:bg-gray-10  "
      >
        <Row className="items-center w-full">
          <Col span={3}>
            <Avatar size={45}>
              {name
                .split(" ")
                .map((item) => item.slice(0, 1))
                .join("")
                .toUpperCase()}
            </Avatar>
          </Col>
          <Col span={21}>
            <Row align="middle" justify="space-between" className="flex-nowrap">
              <Col>
                <Text
                  styles="ml-20 whitespace-nowrap text-ellipsis overflow-hidden max-w-[280px] text-gray-80"
                  type="h6"
                  med
                >
                  {name}
                </Text>
                <Text
                  styles="ml-20 text-ellipsis overflow-hidden max-w-[280px] text-gray-30"
                  type="p"
                >
                  {email}
                </Text>
              </Col>
              <Col onClick={deleteHandler}>
                <AiFillDelete size={30} className="text-gray-20" />
              </Col>
            </Row>
          </Col>
        </Row>
      </Link>
  );
};

export default UserCard;
