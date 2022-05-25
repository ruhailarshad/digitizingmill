import { useMutation } from "react-query";
import instance from "../../services/AxiosConfig";
const updateCompanyDetails = (companyData = {}) => {
  return instance.put("/api/company", companyData);
};

export const useUpdateCompany = (onSuccess) => {
  return useMutation(updateCompanyDetails, {
    mutatioKey: "company-update-mutation",
    onSuccess,
  });
};
