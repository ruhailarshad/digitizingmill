import { useQuery } from "react-query";
import instance from "../../services/AxiosConfig";
import qs from 'qs';

const fetchUsers = async (queryString) => {
    return instance.get(`/api/user${queryString}`);
}

export const useUserData = ({
    queryParams,
    onSucess = () => {},
    onError = () => {}
}) => {
    const queryString = `?${qs.stringify(queryParams)}`;
    return useQuery(['api/user',queryParams], () => fetchUsers(queryString), {
        onSucess,
        onError
    });
}