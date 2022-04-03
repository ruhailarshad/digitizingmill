import { Button, Col, Form, Input, InputNumber, message, Modal, Row, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import ImgCrop from 'antd-img-crop'
import { normFile, onPreview } from "./utils";

import { usePostUser } from "../../pages/Admin/request";

const NewUserForm = ({ visible, onCancel, refetchUsers, userRole = '' }) => {
  const [form] = Form.useForm();

  const onSuccess = () => {
    form.resetFields();
    onCancel();
  }
  // Sales Agent User create Request
  const {isLoading: isCreatingUser, mutate} = usePostUser({ onSuccess });



  
  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      width={800}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            console.log('user', values);
            const uploadArray = values.upload;
            const profilePic=values.profile.originFileObj
            delete values.upload;
            delete values.profile;
            const cnicBackPic = uploadArray[0].originFileObj;
            const cnicFrontPic = uploadArray[0].originFileObj;

            const uploadData = {...values, role: userRole, profilePic, cnicBackPic, cnicFrontPic};

            mutate(uploadData);

            console.log('upload data', uploadData);
          })
          .catch(({ values }) => {
           
            console.log("Validate Failed:", values);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Row gutter={20}>
          <Col span={24} >
            <Form.Item
           
              name="profile"
              label="Profile Picture"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
              valuePropName="file"
            
            >
              <ImgCrop rotate>
              <Upload onPreview={onPreview}
                 customRequest={dummyRequest}
                listType="picture-card" maxCount={1} onChange={(e)=>form.setFieldsValue({profile:e.file})}>
                Upload
              </Upload>
              </ImgCrop>
            </Form.Item>
          </Col>
          <Col xl={12} md={24} xs={24}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Name is required",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col xl={12} md={24} xs={24}>
            <Form.Item
              name="contactNo"
              label="Contact No"
              rules={[
                {
                  required: true,
                  message: "Contact No is Required",
                },
              ]}
            >
              <InputNumber className="w-[100%]" size="large" />
            </Form.Item>
          </Col>
          <Col xl={12} md={24} xs={24}>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Address is Required",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col xl={12} md={24} xs={24}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please input the title of collection!",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col xl={12} md={24} xs={24}>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input the title of collection!",
                },
              ]}
            >
              <Input type="password" size="large" />
            </Form.Item>
          </Col>
          <Col xl={12} md={24} xs={24}>
            <Form.Item
              name="cnicNo"
              label="CNIC No"
              rules={[
                {
                  required: {match: /\d{5}-\d{4}-\d{3}-\d{1}/},
                  message: "CNIC Number should be formatted like, XXXXX-XXXX-XXX-X",
                },
                {
                  max: 3,
                  message: "CNIC Number should be 13 digits",
                },
              ]}
            >
              <InputNumber 
              className="w-[100%]" size="large" />
            </Form.Item>
          </Col>
          <Col xl={12} md={24} xs={24}>
            <Form.Item
              name="upload"
              label="CNIC"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload onPreview={onPreview}
                 customRequest={dummyRequest}
                listType="picture" name="cnic" maxCount={2} >
                <Button danger size="medium" icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default NewUserForm;
