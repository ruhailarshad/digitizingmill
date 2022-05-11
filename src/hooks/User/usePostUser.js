import { useMutation } from "react-query";
import instance from "../../services/AxiosConfig";

const postSalesAgent = (data) => {
    return instance.post('/api/user', data, {contentType: 'multipart/form-data'});
}

export const usePostUser = (onSuccess = () => {}) => {
    return useMutation(postSalesAgent, {
        mutationKey: 'create-sales-agent',
        onSuccess,
    })
}
