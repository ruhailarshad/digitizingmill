import { useQuery } from 'react-query';

import instance from '../../../services/AxiosConfig';

const fetchUsers = async () => {
    const { data } = await instance.get('/api/user');
    return data;
}

export const useUserData = ({
    onSucess = () => {},
    onError = () => {}
}) => {
    return useQuery('api/user', fetchUsers, {
        onSucess,
        onError
    });
}