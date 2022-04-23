import { useQuery } from "react-query";
import instance from "../../services/AxiosConfig";
import qs from 'qs';

const fetchAllCompany = ({
  limit,
  page,
  search
}) => {
  const queryString = qs.stringify({limit,
    page, search});  
  return instance.get(`/api/company?${queryString}`);
};

export const useGetAllCompany = ({
  limit,
  page,
  search,
}) => {
  return useQuery(["company-add-query", page], () => fetchAllCompany({
    limit,
    page,
    search
  }), {
    select: (data) => {
      const newData = data?.companies.map((item) => {
        return { ...item, salesAgent: item?.user?.name,key:item?.companyId };
      });
      return {companies:newData, count: data?.count};
    },
  });
};
