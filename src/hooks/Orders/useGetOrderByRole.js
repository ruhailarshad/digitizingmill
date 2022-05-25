import { useQuery } from "react-query";
import qs from "qs";
import moment from "moment";
import instance from "../../services/AxiosConfig";



const fetchAllOrder = ({ limit, page, search, dateParam, role, id }) => {
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
  return instance.get(`/api/order/by-${role}/${id}?${queryString}${startEndDate}`);
};

export const useGetOrderByRole = ({
  limit,
  page,
  search,
  dateParam,
  role,
  id,
} = {}) => {
  return useQuery(
    ["order-getbyrole-query", search, dateParam, role],
    () =>
      fetchAllOrder({
        limit,
        page,
        search,
        dateParam,
        role,
        id,
      }),
    {
      select: (data) => {
        const newData = data?.orders.orders.map((item) => {
          return { ...item, key: item?.orderId };
        });
         return { orders:newData }
          
      },
    }
  );
};
