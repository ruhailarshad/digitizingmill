import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Space,
  Typography,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { normFile, onPreview } from "./utils";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  usePostOrder,
  useUpdateOrder,
  useGetCompanyById,
  useGetUserByRole,
} from "../../hooks";
import { Option } from "antd/lib/mentions";
import { useQueryClient } from "react-query";
let index = 0;
const NewOrderForm = ({
  visible,
  onCancel,
  companies,
  salesAgentData,
  editable,
  data,
}) => {
  const [companyId, setCompanyId] = useState("");

  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { data: companyById, isLoading: isCompanyByIdLoading } =
    useGetCompanyById({ id: companyId, skip: !!companyId });
  useEffect(() => {
    if (data && editable) {
      form.setFieldsValue({
        ...data,
        sizes: data?.design_sizes,
      });
    }
  }, [data, form, editable]);

  useEffect(() => {
    if (!isCompanyByIdLoading && companyById !== undefined && companyId) {
      form.resetFields(["sizes"]);
      form.setFieldsValue({
        companyInstruction: companyById?.company?.companyInstruction,
        sizes: companyById?.company?.design_sizes,
        currency: companyById?.company?.design_sizes[0]?.currency,
        totalPrize: companyById?.company?.design_sizes.reduce((prev, acc) => {
          console.log(prev.prize, acc.prize, "asdasdasd");
          return prev + acc.prize;
        }, 0),
      });
    }
  }, [companyById, isCompanyByIdLoading, form, companyId]);
  const onOrderSubmitSuccess = () => {
    form.resetFields();
    onCancel();
    queryClient.invalidateQueries("order-get-query");
    message.success("Order Added Successfully");
  };
  const { mutate: orderSubmit } = usePostOrder(onOrderSubmitSuccess);
  const onOrderUpdateSuccess = () => {
    form.resetFields();
    onCancel();
    queryClient.invalidateQueries("order-get-query");
    message.success("Order Updated Successfully");
  };
  const { mutate: orderUpdate } = useUpdateOrder(onOrderUpdateSuccess);
  const { data: digitizerData } = useGetUserByRole({
    role: "digitizer",
  });
  const formValueChangeHandler = (changedValues, allValues) => {
    changedValues.companyId && setCompanyId(changedValues.companyId);
    allValues.sizes &&
      form.setFieldsValue({
        totalPrize: allValues.sizes.reduce((acc, prev) => acc + prev.prize, 0),
      });
  };
  const onCreate = (values) => {
    const newData = { ...data, sizes: data?.design_sizes };
    delete newData["SalesAgent"];
    delete newData["Digitizer"];
    delete newData["company"];
    delete newData["isDeleted"];
    delete newData["updatedAt"];
    delete values["customer_file"];
    delete values["order_date"];

    const isObject = (v) => v !== null && typeof v == "object";

    function getDifference(x, y) {
      let data = {...x};
      Object.entries(x).forEach(function ([key]) {
        if (Array.isArray(x[key]) && Array.isArray(y[key])) {
          getDifference(x[key], y[key]);
          if (x[key].length) {
            delete data[key];
          }
        }
        if (isObject(x[key]) && isObject(y[key])) {
          getDifference(x[key], y[key]);
          if (!Object.keys(x[key]).length) {
            delete data[key];
          }
        }
        if (x[key] === y[key]) delete data[key]
        return
      });
      return data;
    }

    const orderHistory = getDifference(values, newData);

  
    editable
      ? orderUpdate({ ...values, orderId: data.orderId,orderHistory })
      : orderSubmit(values);
  };
  return (
    <Modal
      visible={visible}
      title={editable ? "Update Order" : "Add New Order"}
      okText={editable ? "Update" : "Submit"}
      cancelText="Cancel"
      onCancel={() => {
        onCancel();
        setCompanyId("");
      }}
      width={editable ? 1500 : 1000}
      okButtonProps={{ type: "primary", danger: true }}
      onOk={() => {
        console.log("onOk");
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
        onValuesChange={formValueChangeHandler}
      >
        <Row gutter={20}>
          <Col
            xl={editable ? 16 : 24}
            lg={editable ? 16 : 24}
            md={editable ? 14 : 24}
            xs={24}
          >
            <Row gutter={[20, 20]}>
              <Col xl={12} lg={12} md={12} xs={24}>
                <Form.Item name="order_date" label="Order Date">
                  <DatePicker
                    disabled
                    showTime
                    defaultValue={moment(new Date(), "MMMM Do YYYY h:mm:ss")}
                    format={"MMMM Do YYYY h:mm:ss"}
                    className="w-[100%]"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} xs={24}>
                <Form.Item
                  name="companyId"
                  label="Company  Name"
                  rules={[
                    {
                      required: true,
                      message: "Compant Name is Required",
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
                    getPopupContainer={(trigger) => trigger.parentNode}
                    size="large"
                  >
                    {companies?.map((item) => (
                      <Select.Option value={item?.companyId}>
                        {item?.companyName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xl={24} lg={24} md={24} xs={24}>
                <Form.Item
                  name="customerName"
                  label="Customer Name"
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
              <Col xl={16} lg={16} md={24} xs={24}>
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
                  getPopupContainer={(trigger) => trigger.parentNode}
                >
                  <Select
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    getPopupContainer={(trigger) => trigger.parentNode}
                    size="large"
                  >
                    {salesAgentData?.map((item) => (
                      <Select.Option value={item?.userId}>
                        {item?.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xl={16} lg={16} md={24} xs={24}>
                <Form.Item
                  name="orderInstructions"
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
                      message: "Digitizer is Required",
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
                    getPopupContainer={(trigger) => trigger.parentNode}
                    size="large"
                  >
                    {digitizerData?.map((item) => (
                      <Select.Option value={item?.userId}>
                        {item?.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xl={24} md={24} xs={24}>
                <Form.Item
                  name="remarks"
                  label="Remarks"
                  rules={[
                    {
                      required: true,
                      message: "Remarks is Required",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xl={8} lg={8} md={24} xs={24}>
                <Form.Item
                  name="deliveryStatus"
                  label="Delivery Status"
                  defaultValue="Normal"
                  rules={[
                    {
                      required: true,
                      message: "Delivery Status  is Required",
                    },
                  ]}
                >
                  <Select
                    size="large"
                    getPopupContainer={(trigger) => trigger.parentNode}
                  >
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
                  <Select
                    size="large"
                    getPopupContainer={(trigger) => trigger.parentNode}
                  >
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
                  <Select
                    size="large"
                    getPopupContainer={(trigger) => trigger.parentNode}
                  >
                    <Select.Option value="Pending">Pending</Select.Option>
                    <Select.Option value="In Progress">
                      In Progress
                    </Select.Option>
                    <Select.Option value="Completed">Completed</Select.Option>
                    <Select.Option value="Yiminghe">
                      Ready To Deliver
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>

          {editable && (
            <Col xl={8} lg={8} md={10} xs={24}>
              <Row>
                <Col span={24}>
                  <Form.Item name="order_history" label="Order History">
                    <Input.TextArea
                      disabled
                      autoSize={{ minRows: 33, maxRows: 33 }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          )}
        </Row>

        <Row gutter={[20, 20]}>
          <Col xl={14} lg={24} md={24} xs={24}>
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

          <Col xl={10} lg={24} md={24} xs={24}>
            <Form.List name="sizes">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, i) => (
                    <Row justify="center" align="middle" gutter={5}>
                      <Col xl={9} lg={9} md={9} xs={9}>
                        <Form.Item
                          {...restField}
                          name={[name, "size"]}
                          label={"Size"}
                        >
                          <Input size="large" disabled />
                        </Form.Item>
                      </Col>
                      <Col xl={8} lg={8} md={8} xs={8}>
                        <Form.Item
                          {...restField}
                          name={[name, "prize"]}
                          label="Price"
                        >
                          <InputNumber className="w-[100%]" size="large" />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          {...restField}
                          name={[name, "currency"]}
                          className="mt-30 ml-[-6px]"
                        >
                          <Input
                            disabled
                            size="large"
                            value={companyById?.company?.design_sizes?.currency}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        {i >= 1 && (
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        )}
                      </Col>
                    </Row>
                  ))}
                </>
              )}
            </Form.List>
            <Row className="mt-20" justify="center" align="middle" gutter={5}>
              <Col span={9}>
                <Form.Item name="totalPrize" label={"Total"}>
                  <Input disabled size="large" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="currency" className="mt-30 ml-[-6px]">
                  <Input disabled size="large" />
                </Form.Item>
              </Col>
              <Col xl={9} lg={9} md={9} xs={9}>
                <Form.Item name="bonus" label="Bonus">
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default NewOrderForm;
