/* eslint-disable jsx-a11y/anchor-is-valid */
import { Dropdown, Menu, Space, Spin } from "antd";
import React from "react";
import { DownOutlined } from "@ant-design/icons";

const StatsCard = ({ data, handler,isLoading }) => {
  const menu = (
    <Menu>
      <Menu.Item onClick={() => handler("totalSalesDollar")}>
        <p>USD</p>
      </Menu.Item>
      <Menu.Item onClick={() => handler("totalSalesEuro")}>
        <p>Euro</p>
      </Menu.Item>
      <Menu.Item onClick={() => handler("totalSalesCanadian")}>
        <p>CAD</p>
      </Menu.Item>
    </Menu>
  );
  return (
    //   <Card className="rounded-10 "  >
    //   <Meta
    //     avatar={<div className="p-12 bg-red-100 flex items-center justify-center rounded-20">{data.icon}</div>}
    //     title={ <h6 className=" h6-bold text-gray-40 whitespace-nowrap">{data.heading}</h6>}
    //     description={ <h4 className=" h4-bold text-gray-80">{data.stats}</h4>}
    //   />
    // </Card>
    <div className="shadow-[-7px_10px_12px_-1px_rgba(0,0,0,0.03)]  flex space-x-10 bg-white rounded-20   p-14 ">
      <div className="p-14 bg-red-100 flex items-center justify-center rounded-20">
        {data.icon}
      </div>
      <div className="flex flex-col justify-start">
        <div className="flex space-x-10">
          <h6 className=" h6-bold flex text-gray-40 whitespace-nowrap">
            {data.heading}
          </h6>
          {data.heading.toLowerCase() === "total sales" && (
            <Dropdown overlay={menu} arrow>
              <Space>
                <DownOutlined />
              </Space>
            </Dropdown>
          )}
        </div>

        {isLoading ? (
          <Spin className="mt-10 w-10" />
        ) : (
          <h4 className=" h4-bold text-gray-80 ml-4">{data.stats}</h4>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
