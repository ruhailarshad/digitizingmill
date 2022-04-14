import { Tag } from "antd";
import { MdDelete } from "react-icons/md";
import {
  AiFillEdit,
  AiOutlineCheck,
  AiOutlineClose,
  AiFillEye,
} from "react-icons/ai";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import moment from "moment";

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
      dataIndex: "ordersId",
      sorter: (a, b) => a.ordersId - b.ordersId,
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
export const orderColumns = [
  {
    title: "Order Id",
    dataIndex: "order_id",
    sorter: (a, b) => a.order_id - b.order_id,
  },
  {
    title: "Order Date",
    dataIndex: "order_date",
    sorter: (a, b) => moment(a.createdAt).diff(moment(b.createdAt)),
    render: (_, record) => {
      return moment(record.createdAt).format("MMMM Do YYYY,h:mm:ss");
    },
  },
  {
    title: "Customer Name",
    dataIndex: "customer_name",
  },
  {
    title: "Design Name",
    dataIndex: "design_name",
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
export const companyColumns = (
  editing,
  save,
  cancel,
  edit,
  viewHandler,
  deleteHandler
) => {
  return [
    {
      title: "Company Id",
      dataIndex: "companyId",
      render: (_, record) => {
        return <p className="max-w-[100px] overflow-hidden whitespace-nowrap text-ellipsis">{record.companyId}</p>;
      },
      sorter: (a, b) => a.companyId - b.companyId,
      width: '15%',
      responsive: ['md'],
    },
    {
      title: "Registration Date",
      dataIndex: "createdAt",
      sorter: (a, b) => moment(a.createdAt).diff(moment(b.createdAt)),
      render: (_, record) => {
        return moment(record.createdAt).format("MMMM Do YYYY h:mm:ss");
      },
      width: '15%',
      responsive: ['md'],

    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      width: '15%',

    },
    {
      title: "Contact No",
      dataIndex: "phone",
      width: '15%',

    },
    {
      title: "Email Address",
      dataIndex: "emailAddress",
      width: '15%',

    },
    {
      title: "Sales Agent",
      dataIndex: "salesAgent",
      editable: true,
      width: '15%',

    },
    {
      title: "Actions",
      dataIndex: "icon",
      width: "10%",
      render: (_, record) => {
        const confirm = () => {
          Modal.confirm({
            title: "Confirm",
            icon: <ExclamationCircleOutlined />,
            content: "Do you want to delete this items?",

            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk: () => deleteHandler(record.companyId),
          });
        };
        const editable = editing(record);

        return record.isDefault !== 1 ? (
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div>
              <MdDelete size={22} color={"#9999"} onClick={confirm} />
            </div>
            {editable ? (
              <span 
              className="flex items-center"
              >
                <div
                  onClick={() => save(record)}
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
            <div onClick={() => viewHandler(record)}>
              <AiFillEye size={22} color={"#9999"} />
            </div>
          </div>
        ) : null;
      },
    },
   
  ];
};

export const companyColumnsNonEditable = [
  {
    title: "Company Id",
    dataIndex: "companyId",
    sorter: (a, b) => a.companyId - b.companyId,
  },
  {
    title: "Registration Date",
    dataIndex: "createdAt",
    sorter: (a, b) => moment(a.createdAt).diff(moment(b.createdAt)),
    render: (_, record) => {
      return moment(record.createdAt).format("MMMM Do YYYY,h:mm:ss");
    },
  },
  {
    title: "Company Name",
    dataIndex: "companyName",
  },
  {
    title: "Contact No",
    dataIndex: "phone",
  },
  {
    title: "Email Address",
    dataIndex: "emailAddress",
  },
];
export const companyColumnsForSalesAgent = (viewHandler) => {
  return [
    {
      title: "Company Id",
      dataIndex: "companyId",
    },
    {
      title: "Registration Date",
      dataIndex: "createdAt",
      sorter: (a, b) => moment(a.createdAt).diff(moment(b.createdAt)),
      render: (_, record) => {
        return moment(record.createdAt).format("MMMM Do YYYY,h:mm:ss");
      },
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
    },
    {
      title: "Contact No",
      dataIndex: "phone",
    },
    {
      title: "Email Address",
      dataIndex: "emailAddress",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <div onClick={() => viewHandler(record)}>
          <AiFillEye size={22} color={"#9999"} />
        </div>
      ),
    },
  ];
};
