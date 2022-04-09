import React, { useState } from "react";
import { detailsStats } from "../../../constants/stats";
import UserDetails from "../Common/UserDetails";
import { useParams } from "react-router-dom";
import NewUserForm from "../../../core/Forms/NewUserForm";
import { useGetUserById } from "../../../hooks/User/useGetUserById";

const UserDetailsContainer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { id } = useParams();
  const { data, isLoading } = useGetUserById({
    id,
    role: "sales-agent",
  });

  const getCurrencyWiseStats = (currencyName) => {
    if (data?.userStats[currencyName]) {
      return data.userStats[currencyName].sales;
    }
    return 0;
  };

  const getSalesByCAD = getCurrencyWiseStats("CAD");
  const getSalesByUSD = getCurrencyWiseStats("USD");
  const getSalesByEuro = getCurrencyWiseStats("Euro");
  const getCompanies = data?.totalCompanies || 0;

  return (
    <>
      <UserDetails
        data={
          data?.userData
            ? {
                ...data.userData[0],
              }
            : {}
        }
        userCompanies={data?.userCompanies?.companies}
        userSales={data?.userOrders}
        isLoading={isLoading}
        onModalShow={()=>{setIsModalVisible(true)}}
        stats={detailsStats(
          getCompanies,
          getSalesByUSD,
          getSalesByCAD,
          getSalesByEuro
        )}
        role="sales-agent"
      />
      {isModalVisible && (
        
        <NewUserForm
          visible={isModalVisible}
          isLoading={isLoading}
          id={id}
          data={data?.userData[0]}
          userRole={'sales-agent'}
          onCancel={() => setIsModalVisible(false)}
        />
      )}
    </>
  );
};

export default UserDetailsContainer;
