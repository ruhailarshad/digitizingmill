import { useMutation } from "react-query";
import instance from '../services/AxiosConfig'
const deleteCompanyAPI = (id) => {
    console.log(id)
    return instance.delete(`/api/company/${id}`);
}

export const useDeleteCompany = (onSuccess = () => {}, onError = () => {} ) => {
    return useMutation(deleteCompanyAPI, {  
        mutatioKey: 'company-delete-mutation',
        onSuccess,
        onError
    })
}