import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import instance from "../../services/AxiosConfig";
const updateOrderDetails = (orderData = {}) => {
  return instance.put("/api/order", orderData);
};

export const useUpdateOrder = (onSuccess) => {
  return useMutation(updateOrderDetails, {
    mutatioKey: "order-update-mutation",
    onSuccess,
  });
};
