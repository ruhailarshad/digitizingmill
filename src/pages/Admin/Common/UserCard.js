import { Avatar, Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { Text } from "../../../core";

const UserCard = ({ name, userId, email }) => {
  return (
    <Link
      to={`${userId}`}
      className=" shadow-[-7px_10px_12px_-1px_rgba(0,0,0,0.03)] cursor-pointer min-w-[290px]  rounded-[20px] border-none p-20 bg-white flex items-center hover:bg-gray-10  "
    >
      <Row className="items-center">
        <Col span={3}>
          <Avatar size={45}>
            {name
              .split(" ")
              .map((item) => item.slice(0,1))
              .join('').toUpperCase()}
          </Avatar>
        </Col>
        <Col span={21}>
          <Text
            styles="ml-20 whitespace-nowrap text-ellipsis overflow-hidden max-w-[280px] text-gray-80"
            type="h6"
            med
          >
            {name}
          </Text>
          <Text
            styles="ml-20 text-ellipsis overflow-hidden max-w-[280px] text-gray-20"
            type="p"
          >
            {email}
          </Text>
        </Col>
      </Row>
    </Link>
  );
};

export default UserCard;
