import { useMutation } from "react-query";
import instance from '../services/AxiosConfig'
const fetchCompanyDetails = (companyData = {}) => {
    return instance.post('/api/company', companyData);
}

export const usePostCompanyDetails = (onSuccess) => {
    
    return useMutation(fetchCompanyDetails, {
        mutatioKey: 'company-details-mutation',
        onSuccess,
    })
}