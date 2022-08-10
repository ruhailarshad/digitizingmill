import { useQuery } from "react-query";
import qs from "qs";
import moment from "moment";
import instance from "../../services/AxiosConfig";

const formatHistory = (orderHistory,index) => {
  if (!orderHistory?.changedData) return;

  const logTime = moment(orderHistory.updatedAt).format(
    "MMMM Do YYYY, h:mm:ss"
  );
  const changedBy = orderHistory.username;
  const parsedOrderHistory = JSON.parse(orderHistory.changedData);

  const { isOrderMediaLog, isFirstLog, customer_files, digitizer_files } =
    parsedOrderHistory;

  if (isFirstLog) return `${parsedOrderHistory?.created} at ${logTime}`;
  if (isOrderMediaLog) {
    let orderMediaLog = "";
    if (!!customer_files) orderMediaLog += `${changedBy} ${customer_files} \n`;
    if (!!digitizer_files) orderMediaLog += `${changedBy} ${customer_files} \n`;
    return orderMediaLog;
  }
  return Object.entries(parsedOrderHistory).reduce((string, [key, value],i) => {
    const newStr = `${string}  ${!(index && i===0) ? '\n' : '' }=> User ${changedBy} has changed ${key} from  ${value} at ${moment(
      orderHistory.updatedAt
    ).format("MMMM Do YYYY, h:mm:ss")}`;
    return newStr;
  }, "");
};

const formattedOrderList = (orderList) =>
  orderList.map((order) => ({
    ...order,
    orderHistory: order.Order_Audit_Logs.map((orderHistory, index) =>
      formatHistory(orderHistory, index === 0 )
    ),
  }));

const fetchAllOrder = ({
  limit,
  page,
  search,
  dateParam,
  id,
  role,
  showAll,
}) => {
  const checkRole = id && role && !showAll ? `/by-${role}/${id}` : "";
  const checkId = id && role && showAll ? `/by-${role}-userId/${id}` : "";
  const queryString =
    limit && page ? qs.stringify({ limit, page, search }) : "";
  const startEndDate =
    !dateParam?.length < 1
      ? `&orderStartDate=${moment(dateParam[0]?._d).format(
          "YYYY-MM-DD"
        )}&orderEndDate=${moment(dateParam[1]?._d).format("YYYY-MM-DD")}`
      : `&orderStartDate=${moment()
          .subtract(30, "days")
          .format("YYYY-MM-DD")}&orderEndDate=${moment().format("YYYY-MM-DD")}`;
  return instance.get(
    `/api/order${checkId}${checkRole}?${queryString}${startEndDate}`
  );
};

export const useGetOrders = ({
  limit,
  page,
  search,
  dateParam = [],
  id = NaN,
  role = "",
  showAll,
} = {}) => {
  return useQuery(
    ["order-get-query", search, dateParam, id, role, limit,page],
    () =>
      fetchAllOrder({
        limit,
        page,
        search,
        dateParam,
        id,
        role,
        showAll,
      }),
    {
      select: (data) => {
        const newData = data?.orderList.map((item, i) => {
          return {
            ...item,
            key: item?.orderId,
            orderMedia: Array.isArray(data?.orderMedia)
              ? data?.orderMedia[i]
              : [],
          };
        });
        return {
          ...data,
          orderList:
            role === "digitizer" && !showAll
              ? newData
              : formattedOrderList(newData || []),
        };
      },
    }
  );
};
