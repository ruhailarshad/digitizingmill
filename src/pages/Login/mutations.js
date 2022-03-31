import { useMutation } from 'react-query';
import instance from '../../services/AxiosConfig';

const fetchAccessToken = (loginCredentials = {}) => {
    return instance.post('/api/auth/login', loginCredentials);
}

export const useGetAccessToken = (onSuccess = () => {}, onError = () => {} ) => {
    return useMutation(fetchAccessToken, {
        mutatioKey: 'login-mutation-request',
        onSuccess,
        onError
    })
}