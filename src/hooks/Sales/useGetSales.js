api/sales/?salesFilter=monthly&month=2&byCurrency=EURO

import { useQuery } from "react-query";
import instance from "../../services/AxiosConfig";
import qs from 'qs';

const fetchSales = ({ byCurrency}) => {
  const queryString = qs.stringify({salesFilter:'monthly',
  month:'12',byCurrency}) 
  return instance.get(`/api/sales?${queryString}`);
};

export const useGetAllSales = ({
    byCurrency
}={}) => {
  return useQuery("get-sales", () => fetchSales({
    byCurrency
  }));
};
