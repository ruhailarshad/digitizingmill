import { useQuery } from "react-query";
import instance from '../../services/AxiosConfig'
const fetchCompanyDetailsById = (id) => {
    return instance.get(`/api/company/${id}`);
}

export const useGetCompanyById = ( {id ,skip,onSuccess}) => {
    return useQuery( ['company-byid-query'+id],()=>fetchCompanyDetailsById(id),{enabled:skip,onSuccess})
}