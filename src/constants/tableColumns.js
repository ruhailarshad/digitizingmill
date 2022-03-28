import { Tag } from "antd";
import { MdDelete } from "react-icons/md";
import { AiFillEdit, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { useMediaQuery } from "react-responsive";

const getColor = (record) => {
  if (record.toLowerCase() === "completed") {
    return "#E23737";
  }
  if (record.toLowerCase() === "paid") {
    return "#79CB7D";
  }
  if (record.toLowerCase() === "pending") {
    return "#707070";
  }
};
export const editableOrderColumns = (editHandler) => {
  return [
    {
      title: "Order Id",
      dataIndex: "order_id",
      sorter: (a, b) => a.order_id - b.order_id,
      responsive: ["lg"],
    },
    {
      title: "Order Date",
      dataIndex: "order_date",
      responsive: ["lg"],
    },
    {
      title: "Customer Name",
      dataIndex: "customer_name",
      responsive: ["lg"],
    },
    {
      title: "Design Name",
      dataIndex: "design_name",
      responsive: ["lg"],
    },
    {
      title: "Size/Type",
      dataIndex: "size_type",
      responsive: ["lg"],
    },
    {
      title: "Amount",
      dataIndex: "amount",
      responsive: ["lg"],
    },
    {
      title: "Payment Status",
      dataIndex: "payment_status",
      responsive: ["lg"],
      render: (record) => {
        const color = getColor(record);
        return (
          <Tag className="rounded-[10px]" color={color}>
            {record.toUpperCase()}
          </Tag>
        );
      },
    },

    {
      title: "Order Status",
      dataIndex: "order_status",
      responsive: ["lg"],
      render: (record) => {
        const color = getColor(record);
        return (
          <Tag className="rounded-[10px]" color={color}>
            {record.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <div onClick={() => editHandler(record)}>
          <AiFillEdit size={22} color={"#9999"} />
        </div>
      ),
    },
  ];
};
export const orderColumns= [
    {
      title: "Order Id",
      dataIndex: "order_id",
      sorter: (a, b) => a.order_id - b.order_id,
      responsive: ["lg"],
    },
    {
      title: "Order Date",
      dataIndex: "order_date",
      responsive: ["lg"],
    },
    {
      title: "Customer Name",
      dataIndex: "customer_name",
      responsive: ["lg"],
    },
    {
      title: "Design Name",
      dataIndex: "design_name",
      responsive: ["lg"],
    },
    {
      title: "Size/Type",
      dataIndex: "size_type",
      responsive: ["lg"],
    },
    {
      title: "Amount",
      dataIndex: "amount",
      responsive: ["lg"],
    },
    {
      title: "Payment Status",
      dataIndex: "payment_status",
      responsive: ["lg"],
      render: (record) => {
        const color = getColor(record);
        return (
          <Tag className="rounded-[10px]" color={color}>
            {record.toUpperCase()}
          </Tag>
        );
      },
    },

    {
      title: "Order Status",
      dataIndex: "order_status",
      responsive: ["lg"],
      render: (record) => {
        const color = getColor(record);
        return (
          <Tag className="rounded-[10px]" color={color}>
            {record.toUpperCase()}
          </Tag>
        );
      },
    },
   
  ];
export const companyColumns = (editing, save, cancel, edit) => {
  return [
    {
      title: "Company Id",
      dataIndex: "company_id",
      sorter: (a, b) => a.company_id - b.company_id,
    },
    {
      title: "Registration Date",
      dataIndex: "registration_date",
    },
    {
      title: "Company Name",
      dataIndex: "company_name",
      editable: true,
    },
    {
      title: "Contact No",
      dataIndex: "contact_no",
      editable: true,
    },
    {
      title: "Email Address",
      dataIndex: "email_adress",
      editable: true,
    },
    {
      title: "Sales Agent",
      dataIndex: "sales_agent",
      editable: true,
    },
    {
      dataIndex: "icon",
      width: "10%",
      render: (_, record) => {
        const confirm = () => {
          Modal.confirm({
            title: "Confirm",
            icon: <ExclamationCircleOutlined />,
            content: "Do you want to delete these items?",

            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            // onOk: () => delete(record.id),
          });
        };
        const editable = editing(record);

        return record.isDefault !== 1 ? (
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div>
              <MdDelete size={22} color={"#9999"} onClick={confirm} />
            </div>
            {editable ? (
              <span>
                <div
                  onClick={() => save(record.id)}
                  style={{
                    marginRight: 8,
                  }}
                >
                  <AiOutlineCheck size={22} color={"#9999"} />
                </div>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <div>
                    <AiOutlineClose size={22} color={"#9999"} />
                  </div>
                </Popconfirm>
              </span>
            ) : (
              <div onClick={() => edit(record)}>
                <AiFillEdit size={22} color={"#9999"} />
              </div>
            )}
          </div>
        ) : null;
      },
    },
  ];
};

export const companyColumnsNonEditable = [
  {
    title: "Company Id",
    dataIndex: "company_id",
    sorter: (a, b) => a.company_id - b.company_id,
  },
  {
    title: "Registration Date",
    dataIndex: "registration_date",
  },
  {
    title: "Company Name",
    dataIndex: "company_name",
  },
  {
    title: "Contact No",
    dataIndex: "contact_no",
  },
  {
    title: "Email Address",
    dataIndex: "email_adress",
  },
  {
    title: "Sales Agent",
    dataIndex: "sales_agent",
  },
];
export const DigitizerOrderColumns = [
  {
    title: "Order Id",
    dataIndex: "order_id",
    sorter: (a, b) => a.order_id - b.order_id,
    responsive: ["lg"],
  },
  {
    title: "Order Date",
    dataIndex: "order_date",
    responsive: ["lg"],
  },
  {
    title: "Customer Name",
    dataIndex: "customer_name",
    responsive: ["lg"],
  },
  {
    title: "Design Name",
    dataIndex: "design_name",
    responsive: ["lg"],
  },
  {
    title: "Size/Type",
    dataIndex: "size_type",
    responsive: ["lg"],
  },

  {
    title: "Order Status",
    dataIndex: "order_status",
    responsive: ["lg"],
    render: (record) => {
      const color = getColor(record);
      return (
        <Tag className="rounded-[10px]" color={color}>
          {record.toUpperCase()}
        </Tag>
      );
    },
  },
];
