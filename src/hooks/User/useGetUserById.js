import { useQuery } from "react-query";
import instance from '../../services/AxiosConfig'
const fetchUserById = async (id, role) => {
    return instance.get(`/api/user/${id}/role/${role}`);
}

export const useGetUserById = ({
    id,
    role,
    onSucess = () => {},
    onError = () => {}
}) => {
    return useQuery(['user-byid',id, role], () => fetchUserById(id, role), {
        onSucess,
        onError
    });
}