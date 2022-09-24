import { useMutation } from "react-query";
import instance from '../../services/AxiosConfig'
const fetchCompanyDetails = ({orderData = {}, extensions}) => {
    const query = JSON.stringify(extensions);
    return instance.post(`/api/order?extensions=${query}`, orderData, {contentType: 'multipart/form-data'});
}

export const usePostOrder = (onSuccess) => {
    return useMutation(fetchCompanyDetails, {
        mutatioKey: 'order-details-mutation',
        onSuccess,
    })
}