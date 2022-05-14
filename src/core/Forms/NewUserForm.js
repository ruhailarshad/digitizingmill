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
  const [showEditImage, setShowEditImage] = useState({
    profilePic: false,
    cnicFrontPic: false,
    cnicBackPic: false,
  });

  const toggleImageDisplayHandler = (imageType) => {
    debugger;
    setShowEditImage((prev) => ({
      ...prev,
      [imageType]: !prev[imageType],
    }));
  };

  const renderUserImageWithToggle = (imageType) => {
    return (
      <div style={{ width: "80px", height: "80px", display: "flex" }}>
        <img
          src={`http://localhost:4000/user/image/${data[imageType]}`}
          height="80px"
          width="80px"
          alt="user-media"
        />
        <button
          type="input"
          onClick={(e) => {
            toggleImageDisplayHandler(imageType);
          }}
        >
          Change Image
        </button>
      </div>
    );
  };

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
    message.success("User Added Successfully");
  };
  const onUserUpdateSuccess = () => {
    onCancel();
    queryClient.invalidateQueries("user-byid");
    message.success("User Updated Successfully");
  };

  // Sales Agent User create Request
  const { isLoading: isCreatingUser, mutate: addUser } = usePostUser(onSuccess);
  const { isLoading: isAddingUser, mutate: updateUser } =
    useUpdateUser(onUserUpdateSuccess);

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const renderTogglerForImage = (imageType) => {
    return <div onClick={() => toggleImageDisplayHandler(imageType)}>Show Image</div>;
  };

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
              {editable && data?.profilePic && !showEditImage["profilePic"] ? (
                renderUserImageWithToggle("profilePic")
              ) : (
                <>
                  <Form.Item
                    name="profilePic"
                    label="Profile Picture"
                    valuePropName="file"
                  >
                    <ImgCrop rotate>
                      <Upload
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
                  {renderTogglerForImage("profilePic")}
                </>
              )}
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
                    required: { match: /\d{5}-\d{4}-\d{3}-\d{1}/ },
                    message:
                      "CNIC Number should be formatted like, XXXXX-XXXX-XXX-X",
                  },
                ]}
              >
                <Input className="w-[100%]" size="large" />
              </Form.Item>
            </Col>
            <Col span={12}>
              {editable && data?.cnicFrontPic && !showEditImage["cnicFrontPic"] ? (
                renderUserImageWithToggle("cnicFrontPic")
              ) : (
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
                        maxCount={1}
                        onChange={(e) =>
                          form.setFieldsValue({ cnicFrontPic: e.file })
                        }
                      >
                        Upload CNIC FRONT PIC
                      </Upload>
                    </ImgCrop>
                  </Form.Item>
                  {renderTogglerForImage("cnicFrontPic")}
                </>
              )}
            </Col>
            <Col span={12}>
              {editable && data?.cnicBackPic && !showEditImage["cnicBackPic"] ? (
                renderUserImageWithToggle("cnicBackPic")
              ) : (
                <>
                  <Form.Item
                    name="cnicBackPic"
                    label="CNIC Back Pic"
                    valuePropName="file"
                  >
                    <ImgCrop rotate>
                      <Upload
                        customRequest={dummyRequest}
                        listType="picture-card"
                        maxCount={1}
                        onChange={(e) =>
                          form.setFieldsValue({ cnicBackPic: e.file })
                        }
                      >
                        Upload CNIC BACK PIC
                      </Upload>
                    </ImgCrop>
                  </Form.Item>
                  {renderTogglerForImage("cnicBackPic")}
                </>
              )}
            </Col>
          </Row>
        </Form>
      )}
    </Modal>
  );
};
export default NewUserForm;
