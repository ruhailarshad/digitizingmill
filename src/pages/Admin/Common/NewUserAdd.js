/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Col, Empty, Input, List, Row, Spin } from "antd";
import React from "react";
import HeadAndContent from "../../../core/HeadAndContent";
import VirtualList from "rc-virtual-list";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";
const { Search } = Input;
const NewUserAdd = ({ name, data, isLoading, btnHandler, onSearchChange }) => {
  // const renderUsersList = (data) => {
  //   return (
  //     <List loading={isLoading}>
  //       {!data || data.length === 0 ? (
  //         <Empty />
  //       ) : (
  //         <VirtualList
  //           data={data}
  //           className="h-[80vh]"
  //           itemHeight={47}
  //           itemKey="email"
  //         >
  //           {(item) => (
  //             <List.Item  key={item.email}>
  //               <List.Item.Meta
  //               className="border border-gray-20 border-solid rounded-20 shadow-[-7px_10px_12px_-1px_rgba(0,0,0,0.03)] bg-white  p-8"
  //                 avatar={<Avatar size={40}>RA</Avatar>}
  //                 title={<Link to={`${item.userId}`}>{item.name}</Link>}
  //                 description={item.email}
  //               />
  //             </List.Item>
  //           )}
  //         </VirtualList>
  //       )}
  //     </List>
  //   );
  // };
  const renderUsersList = (data) => {

    if(!data || data.length === 0) {
      return 'No users to show!!';
    }

    const users = data?.map(user => (
      <Col xl={6} xs={24} md={12} sm={24} lg={8}>
          <UserCard userId={user?.userId} email={user?.email} name={user?.name} />
        </Col>
    ));

    return (
      <Row className="mt-30" gutter={[20, 20]}>
        {isLoading ?<div className=" w-full h-[60vh] flex items-center justify-center"><Spin size="large"/></div> :users}
      </Row>
    )
  }

  return (
    <>
      <HeadAndContent
        heading={name}
        btn={{ buttonHandler: btnHandler, name: `Add New ${name}` }}
      >
        <Search
          className="min-w-[250px]"
          placeholder="Search Here"
          size="large"
          allowClear
          style={{ width: 200 }}
          onSearch={onSearchChange}
        />
        { renderUsersList(data)}
      </HeadAndContent>
    </>
  );
};

export default NewUserAdd;
