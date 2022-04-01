/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Input, Row } from "antd";
import React, { useCallback } from "react";
import { Container, Text } from "../../../core";
import HeadAndContent from "../../../core/HeadAndContent";
import UserCard from "./UserCard";
import { debounce } from 'lodash';
const { Search } = Input;

const NewUserAdd = ({ name, data, isLoading,  btnHandler, onSearchChange = () => {} }) => {

  const setSearchTermForUser = useCallback((data) => {
    onSearchChange(data); 
  }, []);

  const renderUsersList = (data) => {

    if(!data || data.length === 0) {
      return 'No users to show!!';
    }
    
    const users = data?.map(user => (
      <Col span={6} xs={24} md={8} lg={6}>
          <UserCard name={user.name} />
        </Col>
    ));

    return (
      <Row className="mt-30" gutter={[20, 20]}>
        {users}
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
          placeholder="input search text"
          size="large"
          allowClear
          style={{ width: 200 }}
          onSearch={setSearchTermForUser}
        />
        {
          isLoading ? 'Add loader here' : renderUsersList(data)
        }
      </HeadAndContent>
    </>
  );
};

export default NewUserAdd;
