import { Button, Col, Form, Input, message, Modal, Row, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { normFile, onPreview } from "./utils";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { usePostUser, useUpdateUser } from "../../hooks";
import axios from "axios";
import { useDeleteUserImage } from "../../hooks/User/usePostUser";
import { useParams } from "react-router-dom";

const NewUserForm = ({
  visible,
  onCancel,
  userRole = "",
  data,
  isLoading,
  editable,
  id,
}) => {
  const queryClient = useQueryClient();


  const [form] = Form.useForm();
  useEffect(() => {
    if (data && editable) {
      form.setFieldsValue(data);
    }
  }, [data, editable, form]);

  const onSuccess = () => {
    form.resetFields();
    onCancel();
    queryClient.invalidateQueries("user-byid");
    queryClient.invalidateQueries("api/user");
    message.success("User Added Successfully");
  };
  const onUserUpdateSuccess = () => {
    onCancel();
    queryClient.invalidateQueries("user-byid");
    queryClient.invalidateQueries("api/user");
    message.success("User Updated Successfully");
  };

  // Sales Agent User create Request
  const { isLoading: isCreatingUser, mutate: addUser } = usePostUser(onSuccess);
  const { isLoading: isAddingUser, mutate: updateUser } =
    useUpdateUser(onUserUpdateSuccess);
  // User Image Delete Request
  const { isLoading: isDeletingUserImage, mutate: deleteUserImage } = useDeleteUserImage(() => {});

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const onRemoveHandler = (file, fileType) => {
    if(!data) return;
    const removeImageData = {userId: id, imageType: fileType};
    deleteUserImage(removeImageData);
  }
  

  return (
    <Modal
      visible={visible}
      title={data ? "Update User Profile" : "Create New User"}
      okText={data ? "Update" : "Create"}
      cancelText="Cancel"
      onCancel={onCancel}
      width={800}
      onOk={() => {
        form.validateFields().then((values) => {
          const profilePic = values?.profilePic?.originFileObj;
          const cnicBackPic = values?.cnicBackPic?.originFileObj;
          const cnicFrontPic = values?.cnicFrontPic?.originFileObj;

          delete values.upload;
          delete values.profilePic;

          const uploadData = {
            ...values,
            role: userRole,
            profilePic,
            cnicBackPic,
            cnicFrontPic,
          };
          const formData = new FormData();

          Object.keys(uploadData).forEach((key) => {
            formData.append(key, uploadData[key]);
          });

          if (!data && !editable) addUser(formData);
          else {
            formData.append("userId", id);
            updateUser(formData);
          }
        });
        // .catch(({ values, ...rest }) => {
        //   debugger;
        // });
      }}
    >
      {isLoading && editable ? (
        <LoadingOutlined style={{ fontSize: 24 }} spin />
      ) : (
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          <Row gutter={20}>
            <Col span={24}>
                <>
                  <Form.Item
                    name="profilePic"
                    label="Profile Picture"
                    valuePropName="file"
                  >
                    <ImgCrop rotate>
                      <Upload
                        defaultFileList={data?.profilePic &&[
                          {
                            uid: "1",
                            name: data?.profilePic,
                            status: "done",
                            url: `${process.env.REACT_APP_API_URL}/user/image/${data?.profilePic}`,
                          },
                        ]}
                        onRemove={(file) => onRemoveHandler(file, 'profilePic')}
                        customRequest={dummyRequest}
                        listType="picture-card"
                        maxCount={1}
                        onChange={(e) =>
                          form.setFieldsValue({ profilePic: e.file })
                        }
                      >
                        Upload
                      </Upload>
                    </ImgCrop>
                  </Form.Item>
                </>
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
                    pattern: new RegExp(/^[+?0-9]*$/) ,
                    message:
                      "Contact Number is not valid",
                  },
                  {
                    required: true,
                    message: "Contact No is Required",
                  },
                ]}
              >
                <Input className="w-[100%]" size="large" />
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
                    message: "Email is Required",
                  },
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
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
                    message: "Password is Required",
                  },
                ]}
              >
                <Input.Password
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col xl={12} md={24} xs={24}>
              <Form.Item
                name="cnicNo"
                type="text"
                label="CNIC No"
                rules={[
                  {
                    pattern: new RegExp(/^[0-9]{5}-[0-9]{7}-[0-9]$/) ,
                    message:
                      "CNIC Number should be formatted like, XXXXX-XXXXXXX-X",
                  },
                  {
                    required: true,
                    message: "CNIC is Required",
                  },
                ]}
              >
                <Input className="w-[100%]" size="large" />
              </Form.Item>
            </Col>
            <Col span={12}>
           
                <>
                  <Form.Item
                    name="cnicFrontPic"
                    label="CNIC Front Pic"
                    valuePropName="file"
                  >
                    <ImgCrop rotate>
                      <Upload
                        customRequest={dummyRequest}
                        listType="picture-card"
                        onRemove={(file) => onRemoveHandler(file, 'cnicFrontPic')}
                        maxCount={1}
                        defaultFileList={data?.cnicFrontPic &&[
                          {
                            uid: "1",
                            name: data?.cnicFrontPic,
                            status: "done",
                            url: `${process.env.REACT_APP_API_URL}/user/image/${data?.cnicFrontPic}`,
                          },
                        ]}
                        onChange={(e) =>
                          form.setFieldsValue({ cnicFrontPic: e.file })
                        }
                      >
                        Upload 
                      </Upload>
                    </ImgCrop>
                  </Form.Item>
                </>
            </Col>
            <Col span={12}>
            
                <>
                  <Form.Item
                    name="cnicBackPic"
                    label="CNIC Back Pic"
                    valuePropName="file"
                  >
                    <ImgCrop rotate>
                      <Upload
                        customRequest={dummyRequest}
                        onRemove={(file) => onRemoveHandler(file, 'cnicBackPic')}
                        listType="picture-card"
                        maxCount={1}
                        defaultFileList={data?.cnicBackPic &&[
                          {
                            uid: "1",
                            name: data?.cnicBackPic,
                            status: "done",
                            url: `${process.env.REACT_APP_API_URL}/user/image/${data?.cnicBackPic}`,
                          },
                        ]}
                        onChange={(e) =>
                          form.setFieldsValue({ cnicBackPic: e.file })
                        }
                      >
                        Upload
                      </Upload>
                    </ImgCrop>
                  </Form.Item>
                </>
            </Col>
          </Row>
        </Form>
      )}
    </Modal>
  );
};
export default NewUserForm;
