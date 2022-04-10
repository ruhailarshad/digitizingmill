import { useMutation } from "react-query";
import instance from "../../services/AxiosConfig";
const updateCompanyDetails = (companyData) => {
  return instance.put("api/company/bulk-update-sales-agent", companyData);
};

export const useBulkUpdateSalesAgent = (onSuccess) => {
  return useMutation(updateCompanyDetails, {
    mutatioKey: "company-bulk-update-salesagent-mutation",
    onSuccess,
  });
};
