import { Button, Col, Form, Input, message, Modal, Row, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import ImgCrop from 'antd-img-crop'
import { normFile, onPreview } from "./utils";
const NewUserForm = ({ visible, onCreate, onCancel }) => {
  const [fileList, setFileList] = useState([
  
  ]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  
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

  const [form] = Form.useForm();
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
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
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
            >
              <ImgCrop rotate>
                <Upload
                onChange={onChange}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  onPreview={onPreview}
                >
                {fileList.length < 1 && '+ Upload'}
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
              name="contact"
              label="Contact No"
              rules={[
                {
                  required: true,
                  message: "Contact No is Required",
                },
              ]}
            >
              <Input size="large" />
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
              name="cnic"
              label="CNIC No"
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
              name="upload"
              label="Upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload onPreview={onPreview}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture" name="logo" maxCount={2} >
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
