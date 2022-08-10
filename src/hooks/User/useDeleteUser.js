import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import instance from '../../services/AxiosConfig'
const deleteUserAPI = (id) => {
    console.log(id)
    return instance.delete(`/api/user/${id}`);
}

export const useDeleteUser = ({role}) => {
    const queryClient=useQueryClient()
    return useMutation(deleteUserAPI, {  
        mutatioKey: 'user-delete-mutation',
        onSuccess:()=>{
            message.success("User Deleted Successfully")
            queryClient.invalidateQueries("api/user");

        },
    })
}