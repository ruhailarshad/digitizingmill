import React from "react";
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { openErrorNotification } from "../../alerts/commonAlert";
import { usePostCompanyDetails } from "../../hooks/usePostCompanyDetails";
import { useGetCompanyById } from "../../hooks/useGetCompanyById";

const NewCompanyForm = ({ visible, onCancel,data }) => {
  // const token = localStorage.getItem(accessTokenKey);

  console.log(data,"data")
  const [form] = Form.useForm();
  const onSuccess = ({ data }) => {
    form.resetFields()
    openErrorNotification("Company Added", () => {
      // do something here
    })
  }

  const {mutate, isLoading} = usePostCompanyDetails(onSuccess);
  const {data:companyDataByID} = useGetCompanyById( );
const onCreate=(values)=>{
mutate(values)
}
  return (
    <Modal
      visible={visible}
      title="Add New Company"
      okText="Create"
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
     <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={
          data
        }
      >
        <Row gutter={[20, 20]}>
          <Col xl={12} lg={12} md={12} xs={24}>
            <Form.Item
              name="emailAddress"
              label="Email Address"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
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
                  min: 5, message: 'Company Name must be minimum 3 characters.'
                }
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
              <Input size="large" />
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
          <Col xl={24}  lg={24} md={24}  xs={24}>
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
    </Modal>
  )
}
export default NewCompanyForm