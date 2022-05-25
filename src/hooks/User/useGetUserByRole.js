import { useQuery } from "react-query";
import instance from '../../services/AxiosConfig'
const fetchUserByRole = async ( role) => {
    const userRole=role ? `?role=${role}` : ''
    return instance.get(`/api/user${userRole}`);
}

export const useGetUserByRole = ({
    role='',
    skip=true,
    onSucess = () => {},
    onError = () => {}
}={}) => {
    return useQuery(['user-byrole' + role],() => fetchUserByRole(role), {
        onSucess,
        onError,
        enabled:skip
    },
    );
}