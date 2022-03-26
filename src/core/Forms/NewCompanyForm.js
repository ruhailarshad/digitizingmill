import React from "react";
import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const NewCompanyForm = ({ visible, onCancel, onCreate }) => {
  const [form] = Form.useForm();

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
        initialValues={
          {
            // modifier: "public",
          }
        }
      >
        <Row gutter={[20, 20]}>
          <Col xl={12} lg={12} md={12} xs={24}>
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
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
              name="company_name"
              label="Company  Name"
              rules={[
                {
                  required: true,
                  message: "Compant Name No is Required",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
         
          <Col xl={12} lg={12} md={12} xs={24}>
            <Form.Item
              name="company_instruction"
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
              label="Phone"
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
                  name="Customer Name"
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
          <Col xl={8} lg={24} md={24} xs={24}>
            <Form.List name="users">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row justify="center" align="middle" gutter={5}>
                      <Col xl={9} lg={9} md={9} xs={9}>
                        <Form.Item
                          {...restField}
                          name={[name, "size"]}
                          label={"Size"}
                        >
                          <Input size="large" />
                        </Form.Item>
                      </Col>
                      <Col xl={9} lg={9} md={9} xs={9}>
                        <Form.Item
                          {...restField}
                          name={[name, "price"]}
                          label="Price"
                        >
                          <Input size="large" />
                        </Form.Item>
                      </Col>
                      <Col xl={5} lg={5} md={5} xs={5}>
                        <Form.Item
                          {...restField}
                          name={[name, "currency"]}
                          label="Currency"
                        >
                          <Select size="large">
                            <Select.Option value="jack">Jack</Select.Option>
                            <Select.Option value="lucy">Lucy</Select.Option>
                            <Select.Option value="Yiminghe">
                              yiminghe
                            </Select.Option>
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