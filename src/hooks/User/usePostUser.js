import { useMutation } from "react-query";
import instance from "../../services/AxiosConfig";

const postSalesAgent = (data) => {
    return instance.post('/api/user', data, {contentType: 'multipart/form-data'});
}

const deleteUserImage = (data) => {
    const {userId, ...rest} = data;
    return instance.delete(`/api/user/image/${userId}`, { data: {...rest}});
}

export const usePostUser = (onSuccess = () => {}) => {
    return useMutation(postSalesAgent, {
        mutationKey: 'create-sales-agent',
        onSuccess,
    })
}

export const useDeleteUserImage = (onSuccess = () => {}) => {
    return useMutation(deleteUserImage, {
        mutationKey: 'delete-user-images',
        onSuccess,
    })
}
