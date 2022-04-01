import React, { useState } from "react";
import NewUserForm from "../../../core/Forms/NewUserForm";
import NewUserAdd from "../Common/NewUserAdd";
import { useUserData } from "../SalesAgent/request";
import { openErrorNotification } from "../../../alerts/commonAlert";

const SalesAgentContainer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const onError = (error) => {
    openErrorNotification(error.response);
  }
  const { isLoading, data } = useUserData({
    queryParams: {name: searchTerm, role: 'digitizer'},
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
        onSearchChange={(data) => setSearchTerm(data)}
        data={usersData}
        isLoading={isLoading}
        name="Digitizer"
        btnHandler={() => setIsModalVisible(true)}
      />
    </div>
  );
};

export default SalesAgentContainer;
