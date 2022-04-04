import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import instance from '../services/AxiosConfig'
const deleteCompanyAPI = (id) => {
    console.log(id)
    return instance.delete(`/api/company/${id}`);
}

export const useDeleteCompany = () => {
    const queryClient=useQueryClient()
    return useMutation(deleteCompanyAPI, {  
        mutatioKey: 'company-delete-mutation',
        onSuccess:()=>{
            message.success("Company Deleted Successfully")
            queryClient.invalidateQueries("company-add-query");

        },
    })
}