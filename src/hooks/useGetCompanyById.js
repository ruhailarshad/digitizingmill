import { useQuery } from "react-query";
import instance from '../services/AxiosConfig'
const fetchCompanyDetailsById = (token) => {
    return instance.get(`/api/company/${token}`);
}

export const useGetCompanyById = ( token ) => {
    return useQuery( 'company-byid-query',()=>fetchCompanyDetailsById(token))
}