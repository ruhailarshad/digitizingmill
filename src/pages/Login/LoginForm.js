import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import "./login.css";
import Logo from "../../assets/finallogodm.png";
const LoginForm = () => {
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <Row className="h-[100vh]">
      <Col lg={15} xs={24}>
        <div className="flex flex-col justify-center h-[100vh] w-[100%] items-center space-y-30">
          <img src={Logo} href="logo" width={200} height={100}></img>

          <h2 className="h2-med text-gray-80">Sign In</h2>
          <Form
            layout="vertical"
            className="min-w-[300px]"
            wrapperCol={{
              span: 24,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 24,
              }}
            >
              <Button block type="primary"  danger htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
      <Col lg={9} xs={24}>
        <div className="signin-gradient h-[100vh] visible max-md:invisible max-md:h-0"></div>
      </Col>
    </Row>
  );
};

export default LoginForm;
