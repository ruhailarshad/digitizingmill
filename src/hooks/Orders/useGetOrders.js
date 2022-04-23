import { useQuery } from "react-query";
import instance from "../../services/AxiosConfig";
const fetchAllOrder = () => {
  return instance.get(`/api/order`);
};

export const useGetOrders = () => {
  return useQuery("order-get-query", fetchAllOrder,
  {
    select: (data) => {
      const newData = data?.orders.map((item) => {
        return { ...item, salesAgent: item?.user?.name,key:item?.companyId };
      });
      return {companies:newData};
    },
  });
};
