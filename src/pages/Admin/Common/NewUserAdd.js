import { Button, Col, Input, Row } from "antd";
import React from "react";
import { Container, Text } from "../../../core";
import HeadAndContent from "../../../core/HeadAndContent";
import UserCard from "./UserCard";
const { Search } = Input;
const NewUserAdd = ({ name, data, isLoading,  btnHandler, onSearchChange = () => {} }) => {
 
  console.log('data', data);
  console.log('isLoading', isLoading);

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
        />
        {
          isLoading ? 'Add loader here' : data?.map(user => (
            <Row className="mt-30" gutter={[20, 20]}>
              <Col span={6} xs={24} md={8} lg={6}>
                <UserCard name="ruhail" />
              </Col>
            </Row>
          )) 
        }
      </HeadAndContent>
    </>
  );
};

export default NewUserAdd;
