import { useQuery } from "react-query";
import qs from "qs";
import moment from "moment";
import instance from "../../services/AxiosConfig";

const formatHistory = (orderHistory) => {
  if (!orderHistory?.changedData) return;
  return Object.entries(JSON.parse(orderHistory.changedData)).reduce(
    (string, [key, value]) => {
      const newStr = `${string} ${string.length ? "\n" : ""} User ${
        orderHistory.username
      } has changed  ${value} at ${moment(orderHistory.updatedAt).format(
        "MMMM Do YYYY,h:mm:ss"
      )}`;
      return newStr;
    },
    ""
  );
};

const formattedOrderList = (orderList) =>
  orderList.map((order) => ({
    ...order,
    orderHistory: order.Order_Audit_Logs.map((orderHistory) =>
      formatHistory(orderHistory)
    ),
  }));

const fetchAllOrder = ({ limit, page, search, dateParam, id,role ,showAll}) => {
  const checkRole=id && role && !showAll ? `/by-${role}/${id}` : ''
  const checkId = id && role && showAll? `/by-${role}-userId/${id}` : "";
  const queryString =
    limit && page ? qs.stringify({ limit, page, search }) : "";
  const startEndDate =
    !dateParam?.length < 1
      ? `&orderStartDate=${moment(dateParam[0]?._d).format(
          "YYYY-MM-DD"
        )}&orderEndDate=${moment(dateParam[1]?._d).format("YYYY-MM-DD")}`
      : `&orderStartDate=${moment()
          .subtract(10, "days")
          .format("YYYY-MM-DD")}&orderEndDate=${moment().format("YYYY-MM-DD")}`;
  return instance.get(`/api/order${checkId}${checkRole}?${queryString}${startEndDate}`);
};

export const useGetOrders = ({
  limit,
  page,
  search,
  dateParam,
  id,
  role='',
  showAll
} = {}) => {
  return useQuery(
    ["order-get-query", search, dateParam,id,role,limit],
    () =>
      fetchAllOrder({
        limit,
        page,
        search,
        dateParam,
        id,
        role,
        showAll
      }),
    {
      select: (data) => {
         const newData = data?.orderList.map((item) => {
          return { ...item, key: item?.orderId };
        });
        return { ...data, orderList: formattedOrderList(newData || []) };
      },
    }
  );
};
