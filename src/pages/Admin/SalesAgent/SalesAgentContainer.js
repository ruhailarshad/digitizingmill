import React, { useState } from "react";
import NewUserForm from "../../../core/Forms/NewUserForm";
import NewUserAdd from "../Common/NewUserAdd";
import { useUserData } from './request';
import { openErrorNotification } from '../../../alerts/commonAlert';
import { debounce } from 'lodash';

const SalesAgentContainer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const onError = (error) => {
    openErrorNotification(error.response);
  }
  const { isLoading, data } = useUserData({
    queryParams: {user: searchTerm},
    onError,
  });

  const usersData = data?.data;
  
  const onCreate = (values) => {
      console.log(values)
    setIsModalVisible(false);
  };
  return (
    <div>
      <NewUserForm
        visible={isModalVisible}
        onCreate={onCreate}
        onCancel={() => 
          setIsModalVisible(false)}
      />
      <NewUserAdd
        isLoading={isLoading}
        name="Sales Agent"
        data={usersData}
        btnHandler={() => setIsModalVisible(true)}
      />
    </div>
  );
};

export default SalesAgentContainer;
