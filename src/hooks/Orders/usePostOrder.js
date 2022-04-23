import { useMutation } from "react-query";
import instance from '../../services/AxiosConfig'
const fetchCompanyDetails = (orderData = {}) => {
    return instance.post('/api/order', orderData);
}

export const usePostOrderDetails = (onSuccess) => {
    return useMutation(fetchCompanyDetails, {
        mutatioKey: 'order-details-mutation',
        onSuccess,
    })
}