import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import instance from "../../services/AxiosConfig";
const deleteCompanyAPI = (data) => {
    return instance.delete(`api/company/bulk/delete`,data);
}

export const useBulkDeleteCompany = () => {
    const queryClient=useQueryClient()
    return useMutation(deleteCompanyAPI, {  
        mutatioKey: 'company-bulk-delete-mutation',
        onSuccess:()=>{
            message.success("Companies Deleted Successfully")
            queryClient.invalidateQueries("company-add-query");

        },
    })
}