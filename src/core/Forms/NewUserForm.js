import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { normFile, onPreview } from "./utils";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { usePostUser, useUpdateUser } from "../../hooks";
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
  return (
    <Modal
      visible={visible}
      title={data ? "Update User Profile" : "Create New User"}
      okText={data ? "Update" : "Create"}
      cancelText="Cancel"
      onCancel={onCancel}
      width={800}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            // Error araha he catch chalega tou API hit hjaegi
          })
          .catch(({ values }) => {
            console.log("user", values);
            const uploadArray = values.upload;
            // const profilePic=values.profile.originFileObj
            delete values.upload;
            delete values.profile;
            // const cnicBackPic = uploadArray[0].originFileObj;
            // const cnicFrontPic = uploadArray[0].originFileObj;

            const uploadData = { ...values, role: userRole };

            !data && !editable
              ? addUser(uploadData)
              : updateUser({ ...uploadData, userId: id });

            console.log("Validate Failed:", values);
          });
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
                  <Upload
                    onPreview={onPreview}
                    customRequest={dummyRequest}
                    listType="picture-card"
                    maxCount={1}
                    onChange={(e) => form.setFieldsValue({ profile: e.file })}
                  >
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
            <Col xl={12} md={24} xs={24}>
              <Form.Item
                name="upload"
                label="CNIC"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload
                  onPreview={onPreview}
                  customRequest={dummyRequest}
                  listType="picture"
                  name="cnic"
                  maxCount={2}
                >
                  <Button danger size="medium" icon={<UploadOutlined />}>
                    Click to upload
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Modal>
  );
};
export default NewUserForm;
