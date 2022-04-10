import React, { useState } from "react";
import NewUserForm from "../../../core/Forms/NewUserForm";
import NewUserAdd from "../Common/NewUserAdd";
import { openErrorNotification } from '../../../alerts/commonAlert';
import { useUserDataSearchTerm } from "../../../hooks";


const SalesAgentContainer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const onError = (error) => {
    openErrorNotification(error.response);
  }
  const { isLoading, data:usersData } = useUserDataSearchTerm({
    queryParams: {name: searchTerm, role: 'sales-agent'},
    onError,
  });

  
 
  return (
    <div>
     {isModalVisible && <NewUserForm
        visible={isModalVisible}
        onCancel={() => 
          setIsModalVisible(false)}
        userRole='sales-agent'
      />
        }
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
