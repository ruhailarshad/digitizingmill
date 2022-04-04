import { useMutation } from "react-query";
import instance from "../../services/AxiosConfig";

const updateSalesAgent = (data) => {
    return instance.put('/api/user', data);
}

export const useUpdateUser = (onSuccess = () => {}) => {
    return useMutation(updateSalesAgent, {
        mutationKey: 'create-sales-agent',
        onSuccess,
    })
}
