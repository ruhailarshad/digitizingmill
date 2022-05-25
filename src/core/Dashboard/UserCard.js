import { Avatar, Button, Col, Row } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import Text from "../Text/Text";
import { GrMail } from "react-icons/gr";
import { IoMdCall } from "react-icons/io";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";
const UserCard = ({ data, btnHandler }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 756px)" });
  console.log(data,'daataaa')
  return (
    <div className="px-20  rounded-20 py-[70px] bg-white flex flex-col items-center space-y-30">
      <div className="flex flex-col items-center justify-center">
          <Avatar
          src={`http://localhost:4000/user/image/${data?.src}`}
            size={{ xs: 100, sm: 100, md: 150, lg: 150, xl: 150, xxl: 150 }}
            icon={<UserOutlined />}
          />
        <Text
          type={`${isMobile ? "h4" : "h3"}`}
          tyles={`text-gray-80 ${isMobile ? "h4-med" : "h3-med"} `}
        >
          {data.name}
        </Text>

        <Text type="h5" styles="text-gray-30 h5-bold">
          {data.role}
        </Text>
      </div>
      <div className="flex flex-col space-y-20 ">
        <div className="flex items-center space-x-10">
          <GrMail size={18} color="#606472" />
          <Text type="h6" styles={`text-gray-30 h6-med `}>
            {data.email}
          </Text>
        </div>
        <div className="flex items-center space-x-10">
          <IoMdCall size={18} color="#606472" />
          <Text type='h6' styles={`text-gray-30 h6-med `}>
            {data.number}
          </Text>
        </div>
        <div className="flex items-center space-x-10">
          <BsFillHouseDoorFill size={18} color="#606472" />
          <Text type='h6' styles={`text-gray-30 h6-med`}>
            {data.address}
          </Text>
        </div>
        <Button
          type="primary"
          block
          className="rounded-10"
          danger
          size="large"
          onClick={btnHandler}
        >
          Edit Details
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
