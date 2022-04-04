import React from "react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { usePostCompanyDetails } from "../../hooks/usePostCompanyDetails";
import { useGetCompanyById } from "../../hooks/useGetCompanyById";
import { LoadingOutlined } from "@ant-design/icons";
import { useQueryClient } from "react-query";
import { getUserData } from "../../services/utils";
import { useUpdateCompany } from "../../hooks/useUpdateCompany";


const NewCompanyForm = ({ visible, onCancel, id }) => {
  // const token = localStorage.getItem(accessTokenKey);
const queryClient=useQueryClient()
  const [form] = Form.useForm();

  const onCompanyAddSuccess = () => {
    form.resetFields();
    onCancel();
    queryClient.invalidateQueries("company-add-query");
    message.success('Company Added Successfully');
  };
  const onCompanyUpdateSuccess = () => {
    onCancel();
    queryClient.invalidateQueries("company-add-query");
    message.success('Company Updated Successfully');
  };
  const onGetByIdSuccess = (data) => {
    form.setFieldsValue({
      ...data?.company,
      sizes: data?.company.design_sizes,
    });
  };
  const {mutate:updateCompany}=useUpdateCompany(onCompanyUpdateSuccess)
  const { mutate:companyAddMutate } = usePostCompanyDetails(onCompanyAddSuccess);
  const { isLoading: isCompanyByIDLoading } = useGetCompanyById(
    id,
    onGetByIdSuccess
  );
  const onCreate = (values) => {
 const decoded=getUserData()
    const newValues={...values,userId:decoded.data.userId}
    !id ? companyAddMutate(newValues) :
    updateCompany({...newValues,companyId:id})
  };
  return (
    <Modal
      visible={visible}
      title={id ? "Update Company" : "Add New Company"}
      okText={id ? "Update" : "Submit"}
      cancelText="Cancel"
      onCancel={onCancel}
      width={1000}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      {isCompanyByIDLoading && id ? (
        <LoadingOutlined style={{ fontSize: 24 }} spin />
      ) : (
        <Form
          form={form}
          // initialvalue={{...companyDataByID?.company,sizes:companyDataByID?.company.design_sizes}}
          layout="vertical"
          name="form_in_modal"
        >
          <Row gutter={[20, 20]}>
            <Col xl={12} lg={12} md={12} xs={24}>
              <Form.Item
                name="emailAddress"
                label="Email Address"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Email Address is Required",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col xl={12} lg={12} md={12} xs={24}>
              <Form.Item
                name="companyName"
                label="Company Name"
                rules={[
                  {
                    required: true,
                    message: "Company Name is Required",
                  },
                  {
                    min: 5,
                    message: "Company Name must be minimum 3 characters.",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>

            <Col xl={12} lg={12} md={12} xs={24}>
              <Form.Item
                name="companyInstruction"
                label="Comapny Instruction"
                rules={[
                  {
                    required: true,
                    message: "Comapny Instruction is Required",
                  },
                ]}
              >
                <Input type="text" size="large" />
              </Form.Item>
            </Col>

            <Col xl={12} lg={12} md={12} xs={24}>
              <Form.Item
                name="phone"
                label="Phone No"
                rules={[
                  {
                    required: true,
                    message: "Phone Number is Required",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col xl={24} lg={24} md={24} xs={24}>
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
            <Col xl={10} lg={24} md={24} xs={24}>
              <Form.List name="sizes">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Row justify="center" align="middle" gutter={5}>
                        <Col span={9}>
                          <Form.Item
                            {...restField}
                            name={[name, "size"]}
                            label={"Size"}
                          >
                            <Input size="large" />
                          </Form.Item>
                        </Col>
                        <Col span={9}>
                          <Form.Item
                            {...restField}
                            name={[name, "prize"]}
                            label="Price"
                          >
                            <InputNumber className="w-[100%]" size="large" />
                          </Form.Item>
                        </Col>
                        <Col span={5}>
                          <Form.Item
                            {...restField}
                            name={[name, "currency"]}
                            label="Currency"
                          >
                            <Select size="large">
                              <Select.Option value="USD">USD</Select.Option>
                              <Select.Option value="Euro">Euro</Select.Option>
                              <Select.Option value="CAD">CAD</Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xl={1} lg={1} md={1} sm={1}>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Col>
                      </Row>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Col>
          </Row>
        </Form>
      )}
    </Modal>
  );
};
export default NewCompanyForm;
