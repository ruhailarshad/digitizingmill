import React from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { normFile, onPreview } from "./utils";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import { useGetUserByRole } from "../../hooks";
const NewOrderForm = ({ visible, onCancel, onCreate,companies,salesAgentData }) => {
  const [form] = Form.useForm();
  const {  data: digitizerData } = useGetUserByRole({
    role: "digitizer",
  });
  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      width={1500}
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
          <Col xl={16} lg={16} md={14} xs={24}>
            <Row gutter={[20, 20]}>
            <Col xl={12} lg={12} md={12} xs={24}>
                <Form.Item
                  name="order_date"
                  label="Order Date"
                  rules={[
                    {
                      required: true,
                      message: "Order Date is required",
                    },
                  ]}
                >
                  <DatePicker 
                  disabled
                  showTime 
                  defaultValue={moment(new Date(), 'MMMM Do YYYY h:mm:ss')} format={'MMMM Do YYYY h:mm:ss'}
                  className="w-[100%]" size="large" />
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} xs={24}>
                <Form.Item
                  name="companyId"
                  label="Company  Name"
                  rules={[
                    {
                      required: true,
                      message: "Compant Name No is Required",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    size="large"
                  >{companies?.map(item=>(

                    <Select.Option value={item?.companyId}>{item?.companyName}</Select.Option>

                  ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xl={24} lg={24} md={24} xs={24}>
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
              <Col xl={16} lg={16} md={24} xs={24}>
                <Form.Item
                  name="orderInstructions"
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
              <Col xl={8} lg={8} md={24} xs={24}>
                <Form.Item
                  name="salesAgentId"
                  label="Sales Agent"
                  rules={[
                    {
                      required: true,
                      message: "Sales Agent is Required",
                    },
                  ]}
                >
                 <Select
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    size="large"
                  >{salesAgentData?.map(item=>(

                    <Select.Option value={item?.userId}>{item?.name}</Select.Option>

                  ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xl={16} lg={16} md={24} xs={24}>
                <Form.Item
                  name="order_instruction"
                  label="Order Instruction"
                  rules={[
                    {
                      required: true,
                      message: "Order Instruction  is Required",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xl={8} lg={8} md={24} xs={24}>
                <Form.Item
                  name="digitizerId"
                  label="Digitizer"
                  rules={[
                    {
                      required: true,
                      message: "digitizer is Required",
                    },
                  ]}
                >
                 <Select
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    size="large"
                  >{salesAgentData?.map(item=>(

                    <Select.Option value={item?.userId}>{item?.name}</Select.Option>

                  ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xl={24} md={24} xs={24}>
                <Form.Item name="remarks" label="Remarks">
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xl={8} lg={8} md={24} xs={24}>
                <Form.Item
                  name="delivery_status"
                  label="Delivery Status"
                  defaultValue="Normal"
                  rules={[
                    {
                      required: true,
                      message: "Delivery Status  is Required",
                    },
                  ]}
                >
                  <Select size="large">
                    <Select.Option value="Urgent">Urgent</Select.Option>
                    <Select.Option value="Normal">Normal</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xl={8} lg={8} md={24} xs={24}>
                <Form.Item
                  name="paymentStatus"
                  label="Payment Status"
                  defaultValue="Pending"
                  rules={[
                    {
                      required: true,
                      message: "Payment Status  is Required",
                    },
                  ]}
                >
                  <Select size="large">
                    <Select.Option value="Pending">Pending</Select.Option>
                    <Select.Option value="Paid">Paid</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xl={8} lg={8} md={24} xs={24}>
                <Form.Item
                  name="orderStatus"
                  label="Order Status"
                  defaultValue="Pending"
                  rules={[
                    {
                      required: true,
                      message: "Order Status  is Required",
                    },
                  ]}
                >
                  <Select size="large">
                    <Select.Option value="Pending">Pending</Select.Option>
                    <Select.Option value="In Progress">In Progress</Select.Option>
                    <Select.Option value="Completed" >
                    Completed
                    </Select.Option>
                    <Select.Option value="Yiminghe">Ready To Deliver</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col xl={8} lg={8} md={10} xs={24}>
            <Row>
              <Col span={24}>
                <Form.Item name="order_history" label="Order History">
                  <Input.TextArea autoSize={{ minRows: 22, maxRows: 22 }} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={[20, 20]}>
          <Col xl={16} lg={24} md={24} xs={24}>
            <Row>
              <Col xl={8} md={12} xs={12}>
                <Form.Item
                  name="customer_file"
                  label="Customer File"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload
                    onPreview={onPreview}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture"
                    name="logo"
                  >
                    <Button danger size="medium" icon={<UploadOutlined />}>
                      Click to upload
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col xl={8} md={12} xs={12}>
                <Form.Item
                  name="digitizer_files"
                  label="Digitizer Files"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload
                    onPreview={onPreview}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture"
                    name="logo"
                  >
                    <Button danger size="medium" icon={<UploadOutlined />}>
                      Click to upload
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col xl={8} lg={24} md={24} xs={24}>
            <Form.List name="sizes">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row justify="center" align="middle" gutter={5}>
                      <Col xl={9} lg={9} md={9} xs={9}>
                        <Form.Item
                          {...restField}
                          name={[name, "size"]}
                          label={"Size"}
                          rules={[
                            {
                              required: true,
                              message: "Missing first name",
                            },
                          ]}
                        >
                          <Select size="large">
                            <Select.Option value="jack">Jack</Select.Option>
                            <Select.Option value="lucy">Lucy</Select.Option>
                            <Select.Option value="disabled" disabled>
                              Disabled
                            </Select.Option>
                            <Select.Option value="Yiminghe">
                              yiminghe
                            </Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xl={9} lg={9} md={9} xs={9}>
                        <Form.Item
                          {...restField}
                          name={[name, "price"]}
                          label="Price"
                          rules={[
                            {
                              validator: (value) => {
                                if (value.length > 2) {
                                  value.pop();
                                }
                              },
                            },
                          ]}
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
                  <Button
                  className="mb-40"
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add field
                    </Button>
                  <Form.Item>
                  <Row justify="center" align="middle" gutter={5}>
                     <Col xl={9} lg={9} md={9} xs={9}>
                       <Form.Item
                         name={"totalPrize"}
                         label={"Total"}
                         rules={[
                           {
                             required: true,
                             message: "Missing first name",
                           },
                         ]}
                       >
                         <Input size="large"/>
                       </Form.Item>
                     </Col>
                     <Col xl={6} lg={6} md={6} xs={6}>
                       <Form.Item
                         name={ "currency"}
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
                     <Col xl={9} lg={9} md={9} xs={9}>
                       <Form.Item
                         name={"bonus"}
                         label="Bonus"
                        
                       >
                         <Input size="large" />
                       </Form.Item>
                     </Col>
                     
                     
                   </Row>
                    
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default NewOrderForm;
