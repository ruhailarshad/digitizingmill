/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Col, Empty, Input, List, Row } from "antd";
import React from "react";
import HeadAndContent from "../../../core/HeadAndContent";
import UserCard from "./UserCard";
import VirtualList from "rc-virtual-list";
const { Search } = Input;
const NewUserAdd = ({ name, data, isLoading, btnHandler, onSearchChange }) => {
  const renderUsersList = (data) => {
    return (
      <List loading={isLoading}>
        {!data || data.length === 0 ? (
          <Empty />
        ) : (
          <VirtualList
            data={data}
            className="h-[80vh]"
            itemHeight={47}
            itemKey="email"
          >
            {(item) => (
              <List.Item key={item.email}>
                <List.Item.Meta
                  avatar={<Avatar size={40}>RA</Avatar>}
                  title={<a href="https://ant.design">{item.name}</a>}
                  description={item.email}
                />
                <div>Content</div>
              </List.Item>
            )}
          </VirtualList>
        )}
      </List>
    );
  };
  // const renderUsersList = (data) => {

  //   if(!data || data.length === 0) {
  //     return 'No users to show!!';
  //   }

  //   const users = data?.map(user => (
  //     <Col span={6} xs={24} md={8} lg={6}>
  //         <UserCard userId={user.userId} name={user.name} />
  //       </Col>
  //   ));

  //   return (
  //     <Row className="mt-30" gutter={[20, 20]}>
  //       {users}
  //     </Row>
  //   )
  // }

  return (
    <>
      <HeadAndContent
        heading={name}
        btn={{ buttonHandler: btnHandler, name: `Add New ${name}` }}
      >
        <Search
          className="min-w-[350px]"
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
