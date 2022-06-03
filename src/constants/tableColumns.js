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
  if (record?.toLowerCase() === "completed") {
    return "#E23737";
  }
  if (record?.toLowerCase() === "urgent") {
    return "#FF0000";
  }
  if (record?.toLowerCase() === "paid") {
    return "#79CB7D";
  }
  if (record?.toLowerCase() === "in progress") {
    return "#6A6A6A";
  }
  if (record?.toLowerCase() === "pending") {
    return "#FF2D81";
  }
  if (record?.toLowerCase() === "ready to deliver") {
    return " #FFA42D";
  }
};
export const editableOrderColumns = (editHandler, deleteHandler) => {
  return [
    {
      title: "Order Id",
      dataIndex: "orderId",
      render: (_, record) => {
        return (
          <p className="max-w-[100px] overflow-hidden whitespace-nowrap text-ellipsis">
            {record.orderId}
          </p>
        );
      },
      width: 100,
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      sorter: (a, b) => moment(a.orderDate).diff(moment(b.orderDate)),
      render: (_, record) => {
        return moment(record.orderDate).format("MMMM Do YYYY h:mm:ss");
      },
      width: 171,
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      width: 150,
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
    },
    {
      title: "Design Name",
      dataIndex: "designName",
      width: 150,
    },
    {
      title: "Size/Type",
      dataIndex: "size",
      render: (_, record) => {
        return record.design_sizes.map((item) => item.size).join(", ");
      },
      width: 100,
    },
    {
      title: "Amount",
      dataIndex: "totalPrize",
      render: (_, record) => {
        return (
          <p>{`${
            record.currency === "Euro"
              ? "€"
              : record.currency === "USD"
              ? "$"
              : record.currency === "CAD"
              ? "CA$"
              : "$"
          }${record.totalPrize}`}</p>
        );
      },
      width: 100,
    },
    {
      title: "Sales Agent",
      dataIndex: "salesAgentId",
      render: (_, record) => {
        return <p>{record.SalesAgent.name}</p>;
      },
      width: 150,
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      render: (record) => {
        const color = getColor(record);
        return (
          <Tag
            className="rounded-4 px-[10px] h-32 flex text-14 items-center justify-center"
            color={color}
          >
            {record}
          </Tag>
        );
      },
      width: 150,
    },

    {
      title: "Order Status",
      dataIndex: "orderStatus",
      render: (record) => {
        const color = getColor(record);
        return (
          <Tag
            className="rounded-4 h-32 px-[10px] flex text-14 items-center justify-center"
            color={color}
          >
            {record}
          </Tag>
        );
      },
      width: 150,
    },
    {
      title: "Delivery Status",
      dataIndex: "deliveryStatus",
      render: (record) => {
        const color = getColor(record);
        return (
          <Tag
            className="rounded-4 h-32 px-[10px] flex text-14 items-center justify-center"
            color={color}
          >
            {record}
          </Tag>
        );
      },
      width: 150,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => {
        const confirm = () => {
          Modal.confirm({
            title: "Confirm",
            icon: <ExclamationCircleOutlined />,
            content: "Do you want to delete this items?",

            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk: () => deleteHandler(record.orderId),
          });
        };
        return (
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div>
              <MdDelete size={22} color={"#9999"} onClick={confirm} />
            </div>
            <div onClick={() => editHandler(record)}>
              <AiFillEdit size={22} color={"#9999"} />
            </div>
          </div>
        );
      },
      width: 100,
    },
  ];
};
export const editableOrderColumnsUserDetails = (viewHandler) => {
  return [
    {
      title: "Order Id",
      dataIndex: "orderId",
      render: (_, record) => {
        return (
          <p className="max-w-[100px] overflow-hidden whitespace-nowrap text-ellipsis">
            {record.orderId}
          </p>
        );
      },
      width: 100,
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      sorter: (a, b) => moment(a.orderDate).diff(moment(b.orderDate)),
      render: (_, record) => {
        return moment(record.orderDate).format("MMMM Do YYYY h:mm:ss");
      },
      width: 171,
      
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      width: 150,

    },
    {
      title: "Design Name",
      dataIndex: "designName",
      width: 150,

    },
    {
      title: "Size/Type",
      dataIndex: "size",
      render: (_, record) => {
        return record.design_sizes.map((item) => item.size).join(", ");
      },
      width: 100,

    },
    {
      title: "Amount",
      dataIndex: "totalPrize",
      render: (_, record) => {
        return (
          <p>{`${
            record.currency === "Euro"
              ? "€"
              : record.currency === "USD"
              ? "$"
              : record.currency === "CAD"
              ? "CA$"
              : "$"
          }${record.totalPrize}`}</p>
        );
      },
      width: 100,

    },
    {
      title: "Sales Agent",
      dataIndex: "salesAgentId",
      render: (_, record) => {
        return <p>{record.SalesAgent.name}</p>;
      },
      width: 150,

    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      render: (record) => {
        const color = getColor(record);
        return (
          <Tag
            className="rounded-4 px-[10px] h-32 flex text-14 items-center justify-center"
            color={color}
          >
            {record}
          </Tag>
        );
      },
      width: 150,

    },

    {
      title: "Order Status",
      dataIndex: "orderStatus",
      render: (record) => {
        const color = getColor(record);
        return (
          <Tag
            className="rounded-4 h-32 px-[10px] flex text-14 items-center justify-center"
            color={color}
          >
            {record}
          </Tag>
        );
      },
      width: 150,

    },
    {
      title: "Delivery Status",
      dataIndex: "deliveryStatus",
      render: (record) => {
        const color = getColor(record);
        return (
          <Tag
            className="rounded-4 h-32 px-[10px] flex text-14 items-center justify-center"
            color={color}
          >
            {record}
          </Tag>
        );
      },
      width: 150,

    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => {
        return (
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div onClick={() => viewHandler(record)}>
              <AiFillEye size={22} color={"#9999"} />
            </div>
          </div>
        );
      },
      width: 80,

    },
  ];
};
export const editableOrderColumnsDigitizer = (viewHandler) => {
  return [
    {
      title: "Order Id",
      dataIndex: "orderId",
      render: (_, record) => {
        return (
          <p className="max-w-[100px] overflow-hidden whitespace-nowrap text-ellipsis">
            {record.orderId}
          </p>
        );
      },
      width: 100,
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      sorter: (a, b) => moment(a.orderDate).diff(moment(b.orderDate)),
      render: (_, record) => {
        return moment(record.orderDate).format("MMMM Do YYYY h:mm:ss");
      },
      width: 171,
      
    },

    {
      title: "Design Name",
      dataIndex: "designName",
      width: 150,

    },
    {
      title: "Size/Type",
      dataIndex: "size",
      render: (_, record) => {
        return record.design_sizes.map((item) => item.size).join(", ");
      },
      width: 100,

    },

    {
      title: "Order Status",
      dataIndex: "orderStatus",
      render: (record) => {
        const color = getColor(record);
        return (
          <Tag
            className="rounded-4 h-32 px-[10px] flex text-14 items-center justify-center"
            color={color}
          >
            {record}
          </Tag>
        );
      },
      width: 150,

    },
    {
      title: "Delivery Status",
      dataIndex: "deliveryStatus",
      render: (record) => {
        const color = getColor(record);
        return (
          <Tag
            className="rounded-4 h-32 px-[10px] flex text-14 items-center justify-center"
            color={color}
          >
            {record}
          </Tag>
        );
      },
      width: 150,

    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => {
        return (
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div onClick={() => viewHandler(record)}>
              <AiFillEye size={22} color={"#9999"} />
            </div>
          </div>
        );
      },
      width: 80,

    },
  ];
};

export const orderColumns = [
  {
    title: "Order Id",
    dataIndex: "orderId",
    render: (_, record) => {
      return (
        <p className="max-w-[100px] overflow-hidden whitespace-nowrap text-ellipsis">
          {record.orderId}
        </p>
      );
    },
    width: 100,
  },
  {
    title: "Order Date",
    dataIndex: "orderDate",
    sorter: (a, b) => moment(a.orderDate).diff(moment(b.orderDate)),
    render: (_, record) => {
      return moment(record.orderDate).format("MMMM Do YYYY h:mm:ss");
    },
    width: 171,
  },
  {
    title: "Customer Name",
    dataIndex: "customerName",
    width: 150,
    sorter: (a, b) => a.customerName.localeCompare(b.customerName),
  },
  {
    title: "Design Name",
    dataIndex: "designName",
    width: 150,
  },
  {
    title: "Size/Type",
    dataIndex: "size",
    render: (_, record) => {
      return record?.design_sizes?.map((item) => item.size).join(", ");
    },
    width: 100,
  },
  {
    title: "Amount",
    dataIndex: "totalPrize",
    render: (_, record) => {
      return (
        <p>{`${
          record.currency === "Euro"
            ? "€"
            : record.currency === "USD"
            ? "$"
            : record.currency === "CAD"
            ? "CA$"
            : "$"
        }${record.totalPrize}`}</p>
      );
    },
    width: 100,
  },
  {
    title: "Sales Agent",
    dataIndex: "salesAgentId",
    render: (_, record) => {
      return <p className="whitespace-nowrap">{record.SalesAgent.name}</p>;
    },
    width: 150,
  },
  {
    title: "Payment Status",
    dataIndex: "paymentStatus",
    render: (record) => {
      const color = getColor(record);
      return (
        <Tag
          className="rounded-4 h-32 px-[10px] flex text-14 items-center justify-center"
          color={color}
        >
          {record}
        </Tag>
      );
    },
    width: 150,
  },

  {
    title: "Order Status",
    dataIndex: "orderStatus",
    render: (record) => {
      const color = getColor(record);
      return (
        <Tag
          className="rounded-4 px-[10px] h-32 flex text-14 items-center justify-center"
          color={color}
        >
          {record}
        </Tag>
      );
    },
    width: 150,
  },
  {
    title: "Delivery Status",
    dataIndex: "deliveryStatus",
    render: (record) => {
      const color = getColor(record);
      return (
        <Tag
          className="rounded-4 px-[10px] h-32 flex text-14 items-center justify-center"
          color={color}
        >
          {record}
        </Tag>
      );
    },
    width: 150,
  },
];

export const DigitizerOrderColumns = [
  {
    title: "Order Id",
    dataIndex: "orderId",
    render: (_, record) => {
      return (
        <p className="max-w-[100px] overflow-hidden whitespace-nowrap text-ellipsis">
          {record.orderId}
        </p>
      );
    },
    width: 100,

  },
  {
    title: "Order Date",
    dataIndex: "orderDate",
    sorter: (a, b) => moment(a.orderDate).diff(moment(b.orderDate)),
    render: (_, record) => {
      return moment(record.orderDate).format("MMMM Do YYYY h:mm:ss");
    },
    width: 171,

  },

  {
    title: "Design Name",
    dataIndex: "designName",
    width: 150,

  },
  {
    title: "Size/Type",
    dataIndex: "size",
    render: (_, record) => {
      return record.design_sizes.map((item) => item.size).join(", ");
    },
    sorter: (a, b) => a.customerName.localeCompare(b.customerName),
    width: 100,

  },

  {
    title: "Order Status",
    dataIndex: "orderStatus",
    render: (record) => {
      const color = getColor(record);
      return (
        <Tag
          className="rounded-4 px-[10px] h-32 flex text-14 items-center justify-center"
          color={color}
        >
          {record}
        </Tag>
      );
    },
    width: 150,

  },
  {
    title: "Delivery Status",
    dataIndex: "deliveryStatus",
    render: (record) => {
      const color = getColor(record);
      return (
        <Tag
          className="rounded-4 px-[10px] h-32 flex text-14 items-center justify-center"
          color={color}
        >
          {record}
        </Tag>
      );
    },
    width: 150,

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
        return (
          <p className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
            {record.companyId}
          </p>
        );
      },
      width: 150
    },
    {
      title: "Registration Date",
      dataIndex: "orderDate",
      sorter: (a, b) => moment(a.orderDate).diff(moment(b.orderDate)),
      render: (_, record) => {
        return moment(record.orderDate).format("MMMM Do YYYY h:mm:ss");
      },
      width: 180
      
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
    sorter: (a, b) => a.companyName.localeCompare(b.companyName),
    width: 150

    },
    {
      title: "Contact No",
      dataIndex: "phone",
      width: 150

    },
    {
      title: "Email Address",
      dataIndex: "emailAddress",
      width: 200

    },
    {
      title: "Sales Agent",
      dataIndex: "salesAgent",
      editable: true,
      width: 150

    },
    {
      title: "Actions",
      dataIndex: "icon",
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
              <span className="flex items-center">
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
      width: 150

    },
  ];
};

export const companyColumnsNonEditable = [
  {
    title: "Company Id",
    dataIndex: "companyId",
    render: (_, record) => {
      return (
        <p className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
          {record.companyId}
        </p>
      );
    },
    width: 150
  },
  {
    title: "Registration Date",
    dataIndex: "orderDate",
    sorter: (a, b) => moment(a.orderDate).diff(moment(b.orderDate)),
    render: (_, record) => {
      return moment(record.orderDate).format("MMMM Do YYYY,h:mm:ss");
    },
    width: 180

  },
  {
    title: "Company Name",
    dataIndex: "companyName",
    sorter: (a, b) => a.companyName.localeCompare(b.companyName),
    width: 150

  },
  {
    title: "Contact No",
    dataIndex: "phone",
    width: 150

  },
  {
    title: "Email Address",
    dataIndex: "emailAddress",
    width: 200

  },
];
export const companyColumnsForUserDetails = (viewHandler) => {
  return [
    {
      title: "Company Id",
      dataIndex: "companyId",
      render: (_, record) => {
        return (
          <p className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
            {record.companyId}
          </p>
        );
      },
      width: 150
    },
    {
      title: "Registration Date",
      dataIndex: "orderDate",
      sorter: (a, b) => moment(a.orderDate).diff(moment(b.orderDate)),
      render: (_, record) => {
        return moment(record.orderDate).format("MMMM Do YYYY,h:mm:ss");
      },
    width: 180

    },
    {
      title: "Company Name",
      dataIndex: "companyName",
    width: 150

    },
    {
      title: "Contact No",
      dataIndex: "phone",
    width: 150

    },
    {
      title: "Email Address",
      dataIndex: "emailAddress",
    width: 200

    },
    {
      title: "Action",
      dataIndex: "",
      render: (record) => (
        <div onClick={() => viewHandler(record)}>
          <AiFillEye size={22} color={"#9999"} />
        </div>
      ),
    width: 80

    },
  ];
};
