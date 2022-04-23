import { useQuery } from "react-query";
import instance from "../../services/AxiosConfig";
const fetchAllCompany = () => {
  return instance.get(`/api/company`);
};

export const useGetAllCompany = () => {
  return useQuery("company-add-query", fetchAllCompany, {
    select: (data) => {
      const newData = data?.companies.map((item) => {
        return { ...item, salesAgent: item?.user?.name,key:item?.companyId };
      });
      return {companies:newData};
    },
  });
};
