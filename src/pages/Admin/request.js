import { useMutation, useQuery } from 'react-query';

import instance from '../../services/AxiosConfig';
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

const postSalesAgent = (data) => {
    return instance.post('/api/user', data, {});
}

export const usePostUser = ({onSuccess = () => {}, onError = () => {}}) => {
    return useMutation(postSalesAgent, {
        mutationKey: 'create-sales-agent',
        onSuccess,
        onError,
    })
}


const fetchUserById = async (id) => {
    return instance.get(`/api/user/${id}`);
}

export const useUserById = ({
    id,
    onSucess = () => {},
    onError = () => {}
}) => {
    return useQuery(['api/user',id], () => fetchUserById(id), {
        onSucess,
        onError
    });
}