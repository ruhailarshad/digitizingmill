import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import instance from "../../services/AxiosConfig";
const updateOrderDetails = ({orderData = {}, extensions}) => {
  const query = JSON.stringify(extensions);
  return instance.put(`/api/order?extensions=${query}`, orderData);
};

export const useUpdateOrder = (onSuccess) => {
  return useMutation(updateOrderDetails, {
    mutatioKey: "order-update-mutation",
    onSuccess,
  });
};
