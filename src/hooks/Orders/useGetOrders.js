import { useQuery } from "react-query";
import qs from "qs";
import instance from "../../services/AxiosConfig";

const formatHistory = (orderHistory) => {
  if (!orderHistory?.changedData) return;
  return Object.entries(JSON.parse(orderHistory.changedData)).reduce((string, [key, value]) => {
    const newStr = `${string} ${string.length ? '\n' : ''} User ${orderHistory.username} has ${key === 'created' ? key : ` changed ${key}`}  ${value} at ${orderHistory.updatedAt}`;
    return newStr;
  }, '');
};

const formattedOrderList = (orderList) => orderList.map((order) => ({
  ...order,
  orderHistory: order.Order_Audit_Logs.map(orderHistory => formatHistory(orderHistory)),
}));

const fetchAllOrder = ({ limit, page, search ,dateParam}) => {
  console.log(dateParam,'dateParam')
  const queryString =
    limit && page ? qs.stringify({ limit, page, search }) : "";
  return instance.get(`/api/order?${queryString}`);
};

export const useGetOrders = ({ limit, page, search,dateParam } = {}) => {
  return useQuery(["order-get-query" + search || dateParam], () =>
    fetchAllOrder({
      limit,
      page,
      search,
      dateParam
    }),
    {
      select: (data) => {
        return {...data, orderList: formattedOrderList(data?.orderList || [])};
      }
    }
  );
};
