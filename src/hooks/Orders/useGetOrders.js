import { useQuery } from "react-query";
import qs from "qs";
import moment from "moment";
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
    const startEndDate=dateParam ?`&orderStartDate=${moment(dateParam[0]?._d).format('YYYY-MM-DD')}&orderEndDate=${moment(dateParam[1]?._d).format('YYYY-MM-DD')}`:''
  return instance.get(`/api/order?${queryString}${startEndDate}`);
};

export const useGetOrders = ({ limit, page, search,dateParam } = {}) => {

  return useQuery(["order-get-query" , search ], () =>
    fetchAllOrder({
      limit,
      page,
      search,
      dateParam
    }),
    {
      select: (data) => {
        const newData = data?.orderList.map((item) => {
          return { ...item,key:item?.orderId };
        });
        return {...data, orderList: formattedOrderList(newData || [])};
      }
    }
  );
};
