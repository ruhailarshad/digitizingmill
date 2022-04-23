import { useQuery } from "react-query";
import instance from "../../services/AxiosConfig";
const fetchCompanyDetailsByRole = (role, id) => {
  return instance.get(`/api/company/by-${role}/${id}`);
};

export const useGetCompanyByRole = ({ role,skip, id, onSuccess }) => {
  return useQuery(
    "company-byrole-query",
    () => fetchCompanyDetailsByRole(role, id),
    {
      enabled:skip
    }
  );
};
