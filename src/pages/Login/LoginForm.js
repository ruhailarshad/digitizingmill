import { Button, Col, Form, Input, Row, Spin } from "antd";
import React from "react";
import "./login.css";
import Logo from "../../assets/finallogodm.png";
import { useNavigate } from 'react-router-dom';
import { openErrorNotification } from "../../alerts/commonAlert";
import jwt_decode from "jwt-decode";
import { useGetAccessToken } from "./mutations";
import { getRedirectLinkForLogin } from "../../constants/getLoginRedirectionRoute";
import { accessTokenKey } from "../../constants/localStorageKeys";
import { useUserData } from "./userContext";

const LoginForm = () => {

  const navigate = useNavigate();
  const {setUserData}=useUserData()
  const onSuccess = ( data ) => {
    const { authToken, role }  = data;
    const userData=jwt_decode(authToken)
    setUserData(userData)
    localStorage.setItem(accessTokenKey, authToken);
    navigate(getRedirectLinkForLogin(role));
  }

  const onError = (err) => {
    openErrorNotification(err.response, () => {
      // do something here
    })
  }

  const {mutate, isLoading} = useGetAccessToken(onSuccess, onError);
  const onFinish = (values) => {
    console.log(values);
    mutate(values);
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
              name="email"
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
              <Button disabled={isLoading} block type="primary"  danger htmlType="submit">
                {isLoading ? <Spin tip="loading" /> : 'Submit'}
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
