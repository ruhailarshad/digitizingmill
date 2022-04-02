import React, { useState } from "react";
import NewUserForm from "../../../core/Forms/NewUserForm";
import NewUserAdd from "../Common/NewUserAdd";
import { useUserData } from './request';
import { openErrorNotification } from '../../../alerts/commonAlert';


const SalesAgentContainer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const onError = (error) => {
    openErrorNotification(error.response);
  }
  console.log(searchTerm,"searchTerm")
  const { isLoading, data } = useUserData({
    queryParams: {name: searchTerm, role: 'sales-agent'},
    onError,
  });

  const usersData = data?.data;
  
  const onCreate = (values) => {
      console.log(values,"onCreate")
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
        onSearchChange={(value) => setSearchTerm(value)}
      />
    </div>
  );
};

export default SalesAgentContainer;
