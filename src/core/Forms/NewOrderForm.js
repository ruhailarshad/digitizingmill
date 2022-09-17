import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { normFile, onPreview, RolesForm } from "./utils";
import { MinusCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { BiDownload } from "react-icons/bi";
import {
  usePostOrder,
  useUpdateOrder,
  useGetCompanyById,
  useGetUserByRole,
  useDeleteOrderMedia,
} from "../../hooks";
import { useQueryClient } from "react-query";
import { useUserData } from "../../pages/Login/userContext";
import instance from "../../services/AxiosConfig";
import FileDownload from "js-file-download";

const NewOrderForm = ({
  visible,
  onCancel,
  companies,
  editable,
  data,
  role,
  roleData = { id: "", name: "" },
  setCompanyUser,
}) => {
  const [companyId, setCompanyId] = useState("");
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { role: userRole, userData } = useUserData();
  const { isLoading: isDeletingOrderMedia, mutate: deleteOrderMedia } =
    useDeleteOrderMedia();
  const { data: companyById, isLoading: isCompanyByIdLoading } =
    useGetCompanyById({ id: companyId, skip: !!companyId });
  const { isLoading: isAdminLoading, data: adminData } = useGetUserByRole({
    skip: !role || role !== RolesForm.digitizer,
  });
  useEffect(() => {
    if (!isCompanyByIdLoading && companyById !== undefined && companyId) {
      form.resetFields(["sizes"]);
      form.setFieldsValue({
        companyInstruction: companyById?.company?.companyInstruction,
        sizes: companyById?.company?.design_sizes,
        currency: companyById?.company?.design_sizes[0]?.currency,
        address: companyById?.company?.address,
        customerName: companyById?.company?.customerName,
        totalPrize: companyById?.company?.design_sizes.reduce((prev, acc) => {
          return prev + acc?.prize;
        }, 0),
      });
    }
  }, [companyById, isCompanyByIdLoading, form, companyId]);
  useEffect(() => {
    if (data && editable) {
      form.resetFields();
      form.setFieldsValue({
        ...data,
        orderHistory: data?.orderHistory ? data?.orderHistory.toString() : "",
        sizes: data?.design_sizes,
        companyInstruction:
          role === RolesForm.digitizer
            ? data?.company?.companyInstruction
            : data?.companyInstruction,
      });
    }
  }, [data, form, editable, role]);
  useEffect(() => {
    if (roleData?.id) {
      role === RolesForm.digitizer
        ? form.setFieldsValue({ digitizerId: roleData?.id })
        : form.setFieldsValue({
            salesAgentId: roleData?.id,
          });
    }
  }, [form, role, roleData?.id]);
  const onOrderSubmitSuccess = () => {
    form.resetFields();
    onCancel();
    queryClient.invalidateQueries("order-get-query");
    message.success("Order Added Successfully");
  };
  const { mutate: orderSubmit, isLoading: orderAddLoading } =
    usePostOrder(onOrderSubmitSuccess);
  const onOrderUpdateSuccess = () => {
    form.resetFields();
    onCancel();
    queryClient.invalidateQueries("order-get-query");
    message.success("Order Updated Successfully");
  };
  const { mutate: orderUpdate, isLoading: orderUpdateLoading } =
    useUpdateOrder(onOrderUpdateSuccess);

  const formValueChangeHandler = (changedValues, allValues) => {
    changedValues.salesAgentId &&
      setCompanyUser(
        adminData.find((item) => item.userId === changedValues.salesAgentId)
      );
    if (
      !editable &&
      changedValues.salesAgentId &&
      !(roleData.id === changedValues.salesAgentId && role === "admin")
    ) {
      form.resetFields([
        "sizes",
        "companyId",
        "companyInstruction",
        "currency",
        "address",
        "customerName",
        "totalPrize",
      ]);
      setCompanyId("");
    }

    changedValues.companyId && setCompanyId(changedValues.companyId);
    allValues.sizes &&
      form.setFieldsValue({
        totalPrize: allValues.sizes.reduce((acc, prev) => acc + prev?.prize, 0),
      });
  };

  const onCreate = (values) => {
    // Transforming Values for order upload
    let { customer_files, digitizer_files, orderHistory, ...rest } = values;
    const orderForm = new FormData();
    digitizer_files?.forEach((file, i) => {
      orderForm.append(`digitizer_files_${i}`, file.originFileObj);
    });
    customer_files?.forEach((file, i) => {
      orderForm.append(`customer_files_${i}`, file.originFileObj);
    });
    Object.entries({ ...rest }).forEach(([key, value]) => {
      // if (key === "bonus") value = 0;
      if (Array.isArray(value)) {
        value.forEach((size, i) => {
          Object.entries(size).map(([k, v]) => {
            orderForm.append(`${key}[${i}][${k}]`, v);
          });
        });
      } else {
        orderForm.append(key, value);
      }
    });

    if (editable) {
      let newData = JSON.parse(
        JSON.stringify({ ...data, sizes: data?.design_sizes })
        );
        const newValues = JSON.parse(JSON.stringify(values));
      if (RolesForm.digitizer === role) {
        newData = JSON.parse(
          JSON.stringify({
            ...data,
            sizes: data?.design_sizes,
            companyInstruction: data?.company?.companyInstruction,
            digitizerId: data?.Digitizer?.userId,
          })
        );
        delete newData["sizes"];
        delete newValues["sizes"];
      }
      delete newData["SalesAgent"];
      delete newData["Digitizer"];
      delete newData["company"];
      delete newData["isDeleted"];
      delete newData["updatedAt"];
      delete newData["orderHistory"];
      delete newValues["order_date"];
      delete newValues["orderHistory"];

      function getDifference(x, y) {
        let data = {};
        Object.entries(x).forEach(function ([key]) {
          if (
            Array.isArray(x[key]) &&
            Array.isArray(y[key]) &&
            key === "sizes"
          ) {
            x[key].forEach((_, i) => {
              if (x[key][i]?.prize !== (y[key][i]?.prize || 0))
                data[`Size-${x[key][i].size}`] = `${y[key][i]?.prize || 0} to ${
                  x[key][i]?.prize
                }`;
            });
            return;
          }
          if (RolesForm.admin === role) {
            if (key === "salesAgentId" && x[key] !== y[key]) {
              const oldVal = adminData?.find(
                (item) => item.userId === newValues.salesAgentId
              ).name;
              const newVal = adminData?.find(
                (item) => item.userId === newData.salesAgentId
              ).name;
              data[key] = `${newVal} to ${oldVal}`;
              return;
            }
            if (key === "digitizerId" && x[key] !== y[key]) {
              const oldVal = adminData?.find(
                (item) => item.userId === newValues.digitizerId
              ).name;
              const newVal = adminData?.find(
                (item) => item.userId === newData.digitizerId
              ).name;
              data[key] = `${newVal} to ${oldVal}`;
              return;
            }
          }
          // This work is for images
          if (key === "customer_files" || key === "digitizer_filWes") return;

          if (x[key] === "sizes") return;

          if (x[key] !== y[key]) data[key] = `${y[key]} to ${x[key]}`;
          return;
        });
        return data;
      }
      const orderHistory = getDifference(newValues, newData);
      // Appending order History
      Object.entries(orderHistory).forEach(([k, v]) => {
        orderForm.append(`orderHistory[${k}]`, v);
      });
      orderForm.append("orderId", data.orderId);
      // Updating order
      orderUpdate(orderForm);
      return;
    }

    orderSubmit(orderForm);
  };
  const onPreview = async (file) => {
    if (file.key) {
      // eslint-disable-next-line no-undef
      const url = await fileService.downloadFile(file.url);
      window.open(url, "_blank");
    }
  };
  const defaultFileListForCustomer =
    data &&
    data?.orderMedia
      ?.filter(({ fileType }) => fileType === "customer")
      ?.map((orderMedia) => ({
        uid: orderMedia?.id,
        name: orderMedia?.filePath,
        status: "done",
        url: `${process.env.REACT_APP_API_URL}order/media/${orderMedia?.filePath}`,
      }));
  const defaultFileListForDigitizer =
    data &&
    data?.orderMedia
      ?.filter(({ fileType }) => fileType === "digitizer")
      ?.map((orderMedia) => ({
        uid: orderMedia?.id,
        name: orderMedia?.filePath,
        status: "done",
        url: `${process.env.REACT_APP_API_URL}order/media/${orderMedia?.filePath}`,
      }));

  const onRemove = ({ name }, arg2) => {
    // TODO:
    // On pressing delete icon all images are deleted - See what we can do
    deleteOrderMedia(name);
  };
  const downloadHandler = async ({ name }) => {
    window.alert("Click Ok to continue download");
    try {
      fetch(`${process.env.REACT_APP_API_URL}order/media/${name}`)
        .then((res) => {
          res.blob().then((blob) => {
            FileDownload(blob, name);
          });
        })
        .catch((err) => {
          
        });
    } catch (err) {
      
      window.alert("Error Occured While downloading file");
    }
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
      width={editable && role !== RolesForm.digitizer ? 1500 : 1000}
      okButtonProps={{
        type: "primary",
        danger: true,
        loading: orderAddLoading || orderUpdateLoading,
      }}
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
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        onValuesChange={formValueChangeHandler}
      >
        <Row gutter={20}>
          <Col
            xl={editable && role !== RolesForm.digitizer ? 16 : 24}
            lg={editable && role !== RolesForm.digitizer ? 16 : 24}
            md={editable && role !== RolesForm.digitizer ? 14 : 24}
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
              {role !== RolesForm.digitizer && (
                <Col xl={12} lg={12} md={12} xs={24}>
                  <Form.Item
                    name="companyId"
                    label="Company  Name"
                    rules={[
                      {
                        required: true,
                        message: "Company Name is Required",
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
              )}
              {role !== RolesForm.digitizer && (
                <Col xl={24} lg={24} md={24} xs={24}>
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
              )}
              {role !== RolesForm.digitizer && (
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
              )}
              <Col
                xl={role === RolesForm.digitizer ? 12 : 16}
                lg={role === RolesForm.digitizer ? 12 : 16}
                md={role === RolesForm.digitizer ? 12 : 16}
                xs={24}
              >
                <Form.Item
                  name="companyInstruction"
                  label="Company Instruction"
                  rules={[
                    {
                      required: true,
                      message: "Company Instruction is Required",
                    },
                  ]}
                >
                  <Input disabled={role === RolesForm.digitizer} size="large" />
                </Form.Item>
              </Col>
              {role !== RolesForm.digitizer && (
                <Col xl={8} lg={8} md={8} xs={24}>
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
                      loading={isAdminLoading || false}
                      disabled={role === RolesForm.salesAgent}
                    >
                      {role === RolesForm.salesAgent ? (
                        <Select.Option disabled value={roleData?.id}>
                          {roleData?.name}
                        </Select.Option>
                      ) : (
                        adminData
                          ?.filter(
                            (item) =>
                              item.role === "admin" ||
                              item.role === "sales-agent"
                          )
                          ?.map((item) => (
                            <Select.Option
                              value={item?.userId}
                              key={item.userId}
                            >
                              {item?.name}
                            </Select.Option>
                          ))
                      )}
                    </Select>
                  </Form.Item>
                </Col>
              )}
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
                  {role === RolesForm.digitizer ? (
                    <Input.TextArea
                      disabled={role === RolesForm.digitizer}
                      size="large"
                      autoSize={{ minRows: 1, maxRows: 2 }}
                    />
                  ) : (
                    <Input
                      disabled={role === RolesForm.digitizer}
                      size="large"
                    ></Input>
                  )}
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
                    disabled={role === RolesForm.digitizer}
                  >
                    {role === RolesForm.digitizer ? (
                      <Select.Option value={roleData?.id}>
                        {roleData?.name}
                      </Select.Option>
                    ) : (
                      adminData
                        ?.filter((item) => item.role === "digitizer")
                        ?.map((item) => (
                          <Select.Option value={item?.userId}>
                            {item?.name}
                          </Select.Option>
                        ))
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col xl={16} lg={16} md={24} xs={24}>
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
                  <Input disabled={role === RolesForm.digitizer} size="large" />
                </Form.Item>
              </Col>
              <Col xl={8} lg={8} md={24} xs={24}>
                <Form.Item
                  name="designName"
                  label="Design Name"
                  rules={[
                    {
                      required: true,
                      message: "Design Name is Required",
                    },
                  ]}
                >
                  <Input disabled={role === RolesForm.digitizer} size="large" />
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
                  {role === RolesForm.digitizer ? (
                    <Input disabled size="large" />
                  ) : (
                    <Select
                      size="large"
                      getPopupContainer={(trigger) => trigger.parentNode}
                    >
                      <Select.Option value="Urgent">Urgent</Select.Option>
                      <Select.Option value="Normal">Normal</Select.Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              {role !== RolesForm.digitizer && (
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
              )}
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
                    <Select.Option value="Ready To Deliver">
                      Ready To Deliver
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>

          {editable && role !== RolesForm.digitizer && (
            <Col xl={8} lg={8} md={10} xs={24}>
              <Row>
                <Col span={24}>
                  <Form.Item name="orderHistory" label="Order History">
                    <Input.TextArea
                      disabled
                      className="text-16"
                      autoSize={{ minRows: 33, maxRows: 33 }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          )}
        </Row>

        <Row gutter={[20, 20]}>
          <Col xl={14} lg={14} md={14} sm={14} xs={24}>
            <Row>
              <Col xl={12} md={12} sm={12} xs={24}>
                <Form.Item
                  name="customer_files"
                  label="Customer File"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload
                    defaultFileList={defaultFileListForCustomer}
                    onRemove={onRemove}
                    action={`${process.env.REACT_APP_API_URL}api/noop`}
                    listType="any"
                    name="logo"
                    onDownload={downloadHandler}
                    showUploadList={{
                      showDownloadIcon: true,
                      downloadIcon: <BiDownload />,
                    }}
                  >
                    <Button
                      target="_blank"
                      danger
                      size="medium"
                      icon={<UploadOutlined />}
                    >
                      Click to upload
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col xl={12} md={12} sm={12} xs={24}>
                <Form.Item
                  name="digitizer_files"
                  label="Digitizer Files"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload
                    defaultFileList={defaultFileListForDigitizer}
                    onRemove={onRemove}
                    action={`${process.env.REACT_APP_API_URL}api/noop`}
                    listType="any"
                    name="logo"
                    showUploadList={{
                      showDownloadIcon: true,
                      downloadIcon: <BiDownload />,
                    }}
                    onDownload={downloadHandler}
                  >
                    <Button
                      target="_blank"
                      danger
                      size="medium"
                      icon={<UploadOutlined />}
                    >
                      Click to upload
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col xl={10} lg={10} md={10} sm={10} xs={24}>
            <Form.List name="sizes">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, i) => (
                    <Row justify="end" align="middle" gutter={5}>
                      <Col span={role === RolesForm.digitizer ? 20 : 10}>
                        <Form.Item
                          {...restField}
                          name={[name, "size"]}
                          label={"Size"}
                        >
                          <Input size="large" disabled />
                        </Form.Item>
                      </Col>
                      {role !== RolesForm.digitizer && (
                        <>
                          <Col span={8}>
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
                              <Input disabled size="large" />
                            </Form.Item>
                          </Col>
                          <Col span={2}>
                            {form.getFieldValue("sizes").length > 1 && (
                              <MinusCircleOutlined
                                onClick={() => remove(name)}
                              />
                            )}
                          </Col>
                        </>
                      )}
                    </Row>
                  ))}
                </>
              )}
            </Form.List>
            {role !== RolesForm.digitizer && (
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
                  <Form.Item initialValue={0} name="bonus" label="Bonus">
                    <Input size="large" />
                  </Form.Item>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default NewOrderForm;
