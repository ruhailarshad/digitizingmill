import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import instance from "../../services/AxiosConfig";
const deleteOrderAPI = (data) => {
    return instance.delete(`api/order/bulk/delete`,data);
}

export const useBulkDeleteOrders = () => {
    const queryClient=useQueryClient()
    return useMutation(deleteOrderAPI, {  
        mutatioKey: 'order-bulk-delete-mutation',
        onSuccess:()=>{
            message.success("Companies Deleted Successfully")
            queryClient.invalidateQueries("order-get-query");
        },
    })
}