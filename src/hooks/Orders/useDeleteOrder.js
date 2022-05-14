import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import instance from '../../services/AxiosConfig'
const deleteOrderAPI = (id) => {
    return instance.delete(`/api/order/${id}`);
}

export const useDeleteOrder = () => {
    const queryClient=useQueryClient()
    return useMutation(deleteOrderAPI, {  
        mutatioKey: 'order-delete-mutation',
        onSuccess:()=>{
            message.success("Company Deleted Successfully")
            queryClient.invalidateQueries("order-get-query");

        },
    })
}