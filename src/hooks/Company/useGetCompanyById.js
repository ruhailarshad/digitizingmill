import { useQuery } from "react-query";
import instance from '../../services/AxiosConfig'
const fetchCompanyDetailsById = (id) => {
    return instance.get(`/api/company/${id}`);
}

export const useGetCompanyById = ( id ,onSuccess) => {
    return useQuery( 'company-byid-query',()=>fetchCompanyDetailsById(id),{enabled:!!id,onSuccess})
}