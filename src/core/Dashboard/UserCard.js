import { Avatar, Button, Skeleton } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import Text from "../Text/Text";
import { GrMail } from "react-icons/gr";
import { IoMdCall } from "react-icons/io";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";
const UserCard = ({ data, btnHandler, isLoading }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 756px)" });
  console.log(data, "daataaa");
  return (
    <div className="px-20 min-w-[350px] rounded-20 py-[70px] bg-white flex flex-col items-center space-y-30">
      <div className="flex flex-col items-center justify-center">
        <Avatar
          src={`http://localhost:4000/user/image/${data?.src}`}
          size={{ xs: 100, sm: 100, md: 150, lg: 150, xl: 150, xxl: 150 }}
          icon={<UserOutlined />}
        />

        {isLoading ? (
          <Skeleton.Input
            active
            size="small"
            className="w-[200px] mt-20"
            shape="round"
          />
        ) : (
          <Text
            type={`${isMobile ? "h4" : "h3"}`}
            styles={`text-gray-80 max-w-[220px] text-ellipsis overflow-hidden ${isMobile ? "h4-med" : "h3-med"} `}
          >
            {data.name}
          </Text>
        )}

        {isLoading ? (
          <Skeleton.Input
            active
            size="small"
            className="w-[100px] mt-10"
            shape="round"
          />
        ) : (
          <Text type="h5" styles="text-gray-30 h5-bold">
            {data.role}
          </Text>
        )}
      </div>
      <div className="flex flex-col space-y-20 ">
        <div className="flex items-center space-x-10">
          {isLoading ? (
            <Skeleton.Input
              active
              size="small"
              className="w-[200px]"
              shape="round"
            />
          ) : (
            <>
              <GrMail size={18} color="#606472" />

              <Text type="h6" styles={`  max-w-[220px] text-ellipsis overflow-hidden whitespace-nowrap  text-gray-30 h6-med `}>
                {data.email}
              </Text>
            </>
          )}
        </div>
        <div className="flex items-center space-x-10">
          {isLoading ? (
            <Skeleton.Input
              active
              size="small"
              className="w-[200px] "
              shape="round"
            />
          ) : (
            <>
              <IoMdCall size={18} color="#606472" />
              <Text type="h6" styles={`text-gray-30  max-w-[220px] text-ellipsis  whitespace-nowrap  overflow-hidden h6-med `}>
                {data.number}
              </Text>
            </>
          )}
        </div>
        <div className="flex  items-start space-x-10">
          {isLoading ? (
            <Skeleton.Input
              active
              size="small"
              className="w-[200px]"
              shape="round"
            />
          ) : (
            <>
              <BsFillHouseDoorFill size={18} color="#606472" />
              <Text type="h6" styles={`text-gray-30  max-w-[280px] text-ellipsis whitespace-nowrap overflow-hidden h6-med`}>
                {data.address}
              </Text>
            </>
          )}
        </div>
        {isLoading ? (
            <Skeleton.Button
              active
              size="medium"
              block
              shape="round"
            />
          ) : (
        <Button
          type="primary"
          block
          className="rounded-10 self"
          danger
          size="large"
          onClick={btnHandler}
        >
          Edit Details
        </Button>)}
      </div>
    </div>
  );
};

export default UserCard;
