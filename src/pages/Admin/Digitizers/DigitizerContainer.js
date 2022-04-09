import React, { useState } from "react";
import NewUserForm from "../../../core/Forms/NewUserForm";
import NewUserAdd from "../Common/NewUserAdd";
import { openErrorNotification } from "../../../alerts/commonAlert";
import { useUserData } from "../../../hooks/User/useUserDataSearchTerm";

const DigitizerContainer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const onError = (error) => {
    openErrorNotification(error.response);
  }
  const { isLoading, data, refetch } = useUserData({
    queryParams: {name: searchTerm, role: 'digitizer'},
    onError,
  });
  const usersData = data;

  
  const onCreate = (values) => {
    console.log(values)
    setIsModalVisible(false);
  };
  return (
    <div>
    {isModalVisible &&  <NewUserForm
        visible={isModalVisible}
        onCreate={onCreate}
        onCancel={() => 
        setIsModalVisible(false)}
        userRole='digitizer'
        refetchUsers={refetch}
        toggleModal={() => setIsModalVisible(false)}
      />}
      <NewUserAdd
        onSearchChange={(value) => setSearchTerm(value)}
        data={usersData}
        isLoading={isLoading}
        name="Digitizer"
        btnHandler={() => setIsModalVisible(true)}
      />
    </div>
  );
};

export default DigitizerContainer;
