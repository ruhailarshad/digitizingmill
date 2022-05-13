import { useQuery } from "react-query";
import qs from "qs";
import instance from "../../services/AxiosConfig";
const fetchAllOrder = ({ limit, page, search }) => {
  const queryString =
    limit && page ? qs.stringify({ limit, page, search }) : "";
  return instance.get(`/api/order?${queryString}`);
};

export const useGetOrders = ({ limit, page, search } = {}) => {
  return useQuery(["order-get-query" + search], () =>
    fetchAllOrder({
      limit,
      page,
      search,
    })
  );
};
