import { useMutation } from "react-query";
import instance from '../../services/AxiosConfig'
const fetchCompanyDetails = (orderData = {}) => {
    return instance.post('/api/order', orderData, {contentType: 'multipart/form-data'});
}

export const usePostOrder = (onSuccess) => {
    return useMutation(fetchCompanyDetails, {
        mutatioKey: 'order-details-mutation',
        onSuccess,
    })
}