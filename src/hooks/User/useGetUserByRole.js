import { useQuery } from "react-query";
import instance from '../../services/AxiosConfig'
const fetchUserByRole = async ( role) => {
    return instance.get(`/api/user?role=${role}`);
}

export const useGetUserByRole = ({
    role,
    onSucess = () => {},
    onError = () => {}
}) => {
    return useQuery(['user-byrole' + role],() => fetchUserByRole(role), {
        onSucess,
        onError
    });
}