import { useMutation } from "react-query";
import instance from "../../services/AxiosConfig";

const updateSalesAgent = (data) => {
    return instance.put('api/company/update-sales-agent', data);
}

export const useUpdateCompanySalesAgent = (onSuccess = () => {}) => {
    return useMutation(updateSalesAgent, {
        mutationKey: 'update-company-sales-agent',
        onSuccess,
    })
}
