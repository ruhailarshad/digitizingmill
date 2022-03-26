import React, { useState } from "react";
import NewUserForm from "../../../core/Forms/NewUserForm";
import NewUserAdd from "../Common/NewUserAdd";

const SalesAgentContainer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  
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
        name="Digitizer"
        btnHandler={() => setIsModalVisible(true)}
      />
    </div>
  );
};

export default SalesAgentContainer;
