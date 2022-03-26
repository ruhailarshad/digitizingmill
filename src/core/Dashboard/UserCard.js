import { Avatar, Button, Col, Row } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import Text from "../Text/Text";
import Card from "../Card/Card";
import {GrMail} from 'react-icons/gr'
import {IoMdCall} from 'react-icons/io'
import {BsFillHouseDoorFill} from 'react-icons/bs'
import { useMediaQuery } from "react-responsive";
const UserCard = ({ data }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 756px)' })
  return (
    <Card styles="px-20 py-30 bg-white flex flex-col items-center space-y-30">
      <div className="flex flex-col items-center justify-center">
        {!data.src && <Avatar  size={{ xs: 100, sm: 100,md:200,lg: 200, xl: 200,xxl:200}} icon={<UserOutlined />} />}
        <Text type={`${isMobile ? 'h4' : 'h2'}`} tyles={`text-gray-80 ${isMobile ? 'h4-med' : 'h2-med'} `}>
          {data.name}
        </Text>
        
        <Text type="h4" styles="text-gray-30 h4-bold">
          {data.role}
        </Text>
      </div>
      <div className="flex flex-col space-y-14 ">
          <div className="flex items-center space-x-10">
          <GrMail size={22} color="#606472"/>
          <Text type={`${isMobile ? 'h6' : 'h5'}`}  styles={`text-gray-30 ${isMobile ? 'h6-med' : 'h5-med'} `}>
            {data.email}
          </Text>
          </div>
          <div className="flex items-center space-x-10">
          <IoMdCall size={22} color="#606472"/>
          <Text type={`${isMobile ? 'h6' : 'h5'}`}styles={`text-gray-30 ${isMobile ? 'h6-med' : 'h5-med'} `}>
            {data.number}
          </Text>
          </div>
          <div className="flex items-center space-x-10">
          <BsFillHouseDoorFill size={22} color="#606472"/>
          <Text type={`${isMobile ? 'h6' : 'h5'}`} styles={`text-gray-30 ${isMobile ? 'h6-med' : 'h5-med'} `}>
            {data.address}
          </Text>
          </div>
          <Button type="primary" block className="rounded-10" danger size="medium">
            Edit Details
          </Button>
      </div>
    </Card>
  );
};

export default UserCard;
