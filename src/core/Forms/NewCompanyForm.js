import React, { useEffect } from "react";
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
import { LoadingOutlined } from "@ant-design/icons";
import { useQueryClient } from "react-query";
import { useOutletContext } from "react-router-dom";
import { usePostCompanyDetails, useUpdateCompany } from "../../hooks";

const NewCompanyForm = ({ visible, onCancel, data, role = "", editable }) => {
  const { tokenData } = useOutletContext();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const onCompanyAddSuccess = () => {
    form.resetFields();
    onCancel();
    queryClient.invalidateQueries("company-add-query");
    message.success("Company Added Successfully");
  };
  const onCompanyUpdateSuccess = () => {
    onCancel();
      queryClient.invalidateQueries("company-add-query");

    message.success("Company Updated Successfully");
  };
  useEffect(() => {
    if (editable && data) {
      form.setFieldsValue({
        ...data,
        sizes: data?.design_sizes,
      });
    }
  }, [editable, data, form]);

  const { mutate: updateCompany, isLoading: isUpdateLoading } =
    useUpdateCompany(onCompanyUpdateSuccess);
  const { mutate: companyAddMutate, isLoading: isAddLoading } =
    usePostCompanyDetails(onCompanyAddSuccess);

  const onCreate = (values) => {
    const newValues = { ...values, userId: tokenData.userId };
    const updateValues = {
      ...values,
      userId: data?.userId,
      companyId: data?.companyId,
    };
    !editable && !data
      ? companyAddMutate(newValues)
      : updateCompany(updateValues);
  };
  return (
    <Modal
      visible={visible}
      title={editable ? "Update Company" : "Add New Company"}
      okText={editable ? "Update" : "Submit"}
      cancelText="Cancel"
      onCancel={onCancel}
      confirmLoading={isUpdateLoading || isAddLoading}
      width={1000}
      okButtonProps={{ type: "primary", danger: true }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onCreate(values);
          })
          .catch((info) => {
            
          });
      }}
    >
      {!data && editable ? (
        <LoadingOutlined style={{ fontSize: 24 }} spin />
      ) : (
        <Form
          form={form}
          // initialvalue={{...companyDataByID?.company,sizes:companyDataByID?.company.design_sizes}}
          initialValues={!editable && { sizes: [""] }}
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
                    min: 3,
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
                label="Company Instruction"
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
            <Col xl={12} lg={12} md={12} xs={12}>
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
            <Col xl={12} lg={12} md={12} xs={12}>
              <Form.Item
                name="customerName"
                label="Customer Name"
                rules={[
                  {
                    required: true,
                    message: "Customer Name is Required",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col xl={10} lg={24} md={24} xs={24}>
              <Form.List name="sizes" >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField },index) => (
                      <Row justify="center" align="middle" gutter={5}>
                        <Col span={9}>
                          <Form.Item
                            {...restField}
                            name={[name, "size"]}
                            label={"Size"}
                            rules={index===0 &&[
                              {
                                required: true,
                                message: "",
                              },
                            ]}
                          >
                            <Input size="large" />
                          </Form.Item>
                        </Col>
                        <Col span={9}>
                          <Form.Item
                            {...restField}
                            name={[name, "prize"]}
                            label="Price"
                            rules={index===0 &&[
                              {
                                required: true,
                                message: "",
                              },
                            ]}
                          >
                            <InputNumber className="w-[100%]" size="large" />
                          </Form.Item>
                        </Col>
                        <Col span={5}>
                          <Form.Item
                            {...restField}
                            name={[name, "currency"]}
                            label="Currency"
                            rules={index===0 &&[
                              {
                                required: true,
                                message: "",
                              },
                            ]}
                          >
                            <Select size="large">
                              <Select.Option value="USD">USD</Select.Option>
                              <Select.Option value="Euro">Pound</Select.Option>
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
