import React, { useState } from "react";
import NewUserForm from "../../../core/Forms/NewUserForm";
import NewUserAdd from "../Common/NewUserAdd";
import { useUserData } from '../request';
import { openErrorNotification } from '../../../alerts/commonAlert';


const SalesAgentContainer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const onError = (error) => {
    openErrorNotification(error.response);
  }
  console.log(searchTerm,"searchTerm")
  const { isLoading, data, refetch } = useUserData({
    queryParams: {name: searchTerm, role: 'sales-agent'},
    onError,
  });

  const usersData = data;
  
  const onCreate = (values) => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <NewUserForm
        visible={isModalVisible}
        onCreate={onCreate}
        onCancel={() => 
          setIsModalVisible(false)}
        toggleModal={() => setIsModalVisible(prev => !prev)}
        refetchUsers={refetch}
        userRole='sales-agent'
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
