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
      sorter: (a, b) => a.orderId - b.orderId,
      width: "15%",
      responsive: ["md"],
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      sorter: (a, b) => moment(a.createdAt).diff(moment(b.createdAt)),
      render: (_, record) => {
        return moment(record.createdAt).format("MMMM Do YYYY,h:mm:ss");
      },
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    {
      title: "Design Name",
      dataIndex: "designName",
    },
    {
      title: "Size/Type",
      dataIndex: "size",
      render: (_, record) => {
        return record.design_sizes.map((item) => item.size).join(", ");
      },
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
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      render: (record) => {
        const color = getColor(record);
        return (
          <Tag
            className="rounded-4 w-[109px] px-[70px] h-32 flex text-14 items-center justify-center"
            color={color}
          >
            {record}
          </Tag>
        );
      },
    },

    {
      title: "Order Status",
      dataIndex: "orderStatus",
      render: (record) => {
        const color = getColor(record);
        return (
          <Tag
            className="rounded-4 w-[109px] h-32 px-[70px] flex text-14 items-center justify-center"
            color={color}
          >
            {record}
          </Tag>
        );
      },
    },
    {
      title: "Delivery Status",
      dataIndex: "deliveryStatus",
      render: (record) => {
        const color = getColor(record);
        return (
          <Tag
            className="rounded-4 w-[109px] h-32 px-[70px] flex text-14 items-center justify-center"
            color={color}
          >
            {record}
          </Tag>
        );
      },
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
      sorter: (a, b) => a.orderId - b.orderId,
      width: "15%",
      responsive: ["md"],
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      sorter: (a, b) => moment(a.createdAt).diff(moment(b.createdAt)),
      render: (_, record) => {
        return moment(record.createdAt).format("MMMM Do YYYY,h:mm:ss");
      },
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    {
      title: "Design Name",
      dataIndex: "designName",
    },
    {
      title: "Size/Type",
      dataIndex: "size",
      render: (_, record) => {
        return record.design_sizes.map((item) => item.size).join(", ");
      },
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
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      render: (record) => {
        const color = getColor(record);
        return (
          <Tag
            className="rounded-4 w-[109px] px-[70px] h-32 flex text-14 items-center justify-center"
            color={color}
          >
            {record}
          </Tag>
        );
      },
    },

    {
      title: "Order Status",
      dataIndex: "orderStatus",
      render: (record) => {
        const color = getColor(record);
        return (
          <Tag
            className="rounded-4 w-[109px] h-32 px-[70px] flex text-14 items-center justify-center"
            color={color}
          >
            {record}
          </Tag>
        );
      },
    },
    {
      title: "Delivery Status",
      dataIndex: "deliveryStatus",
      render: (record) => {
        const color = getColor(record);
        return (
          <Tag
            className="rounded-4 w-[109px] h-32 px-[70px] flex text-14 items-center justify-center"
            color={color}
          >
            {record}
          </Tag>
        );
      },
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
    sorter: (a, b) => a.orderId - b.orderId,
    width: "15%",
    responsive: ["md"],
  },
  {
    title: "Order Date",
    dataIndex: "orderDate",
    sorter: (a, b) => moment(a.createdAt).diff(moment(b.createdAt)),
    render: (_, record) => {
      return moment(record.createdAt).format("MMMM Do YYYY,h:mm:ss");
    },
  },
  {
    title: "Customer Name",
    dataIndex: "customerName",
  },
  {
    title: "Design Name",
    dataIndex: "designName",
  },
  {
    title: "Size/Type",
    dataIndex: "size",
    render: (_, record) => {
      return record?.design_sizes?.map((item) => item.size).join(", ");
    },
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
  },
  {
    title: "Payment Status",
    dataIndex: "paymentStatus",
    render: (record) => {
      const color = getColor(record);
      return (
        <Tag
          className="rounded-4 w-[109px] h-32 px-[70px] flex text-14 items-center justify-center"
          color={color}
        >
          {record}
        </Tag>
      );
    },
  },

  {
    title: "Order Status",
    dataIndex: "orderStatus",
    render: (record) => {
      const color = getColor(record);
      return (
        <Tag
          className="rounded-4 px-[70px] w-[109px] h-32 flex text-14 items-center justify-center"
          color={color}
        >
          {record}
        </Tag>
      );
    },
  },
  {
    title: "Delivery Status",
    dataIndex: "deliveryStatus",
    render: (record) => {
      const color = getColor(record);
      return (
        <Tag
          className="rounded-4 px-[70px] w-[109px] h-32 flex text-14 items-center justify-center"
          color={color}
        >
          {record}
        </Tag>
      );
    },
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
    sorter: (a, b) => a.orderId - b.orderId,
    width: "15%",
    responsive: ["md"],
  },
  {
    title: "Order Date",
    dataIndex: "orderDate",
    sorter: (a, b) => moment(a.createdAt).diff(moment(b.createdAt)),
    render: (_, record) => {
      return moment(record.createdAt).format("MMMM Do YYYY,h:mm:ss");
    },
  },
  {
    title: "Customer Name",
    dataIndex: "customerName",
  },
  {
    title: "Design Name",
    dataIndex: "designName",
  },
  {
    title: "Size/Type",
    dataIndex: "size",
    render: (_, record) => {
      return record.design_sizes.map((item) => item.size).join(", ");
    },
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
  },
  {
    title: "Payment Status",
    dataIndex: "paymentStatus",
    render: (record) => {
      const color = getColor(record);
      return (
        <Tag
          className="rounded-4 w-[109px] h-32 px-[70px] flex text-14 items-center justify-center"
          color={color}
        >
          {record}
        </Tag>
      );
    },
  },

  {
    title: "Order Status",
    dataIndex: "orderStatus",
    render: (record) => {
      const color = getColor(record);
      return (
        <Tag
          className="rounded-4 px-[70px] w-[109px] h-32 flex text-14 items-center justify-center"
          color={color}
        >
          {record}
        </Tag>
      );
    },
  },
  {
    title: "Delivery Status",
    dataIndex: "deliveryStatus",
    render: (record) => {
      const color = getColor(record);
      return (
        <Tag
          className="rounded-4 px-[70px] w-[109px] h-32 flex text-14 items-center justify-center"
          color={color}
        >
          {record}
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
        return (
          <p className="max-w-[100px] overflow-hidden whitespace-nowrap text-ellipsis">
            {record.companyId}
          </p>
        );
      },
      sorter: (a, b) => a.companyId - b.companyId,
      width: "15%",
      responsive: ["md"],
    },
    {
      title: "Registration Date",
      dataIndex: "createdAt",
      sorter: (a, b) => moment(a.createdAt).diff(moment(b.createdAt)),
      render: (_, record) => {
        return moment(record.createdAt).format("MMMM Do YYYY h:mm:ss");
      },
      width: "15%",
      responsive: ["md"],
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      width: "15%",
    },
    {
      title: "Contact No",
      dataIndex: "phone",
      width: "15%",
    },
    {
      title: "Email Address",
      dataIndex: "emailAddress",
      width: "15%",
    },
    {
      title: "Sales Agent",
      dataIndex: "salesAgent",
      editable: true,
      width: "15%",
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
export const companyColumnsForUserDetails = (viewHandler) => {
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
      render: (record) => (
        <div onClick={() => viewHandler(record)}>
          <AiFillEye size={22} color={"#9999"} />
        </div>
      ),
    },
  ];
};
