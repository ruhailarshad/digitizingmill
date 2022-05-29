import React, { useState } from "react";
import { detailsStats } from "../../../constants/stats";
import UserDetails from "../Common/UserDetails";
import { useParams } from "react-router-dom";
import { useGetUserById } from "../../../hooks/User/useGetUserById";
import NewUserForm from "../../../core/Forms/NewUserForm";

const DigitizerDetailsContainer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { id } = useParams();
  const { data, isLoading } = useGetUserById({
    id,
    role: "digitizer",
  });

  const getCurrencyWiseStats = (currencyName) => {
    if (data?.userStats[currencyName]) {
      return data.userStats[currencyName].sales;
    }
    return 0;
  };
  

  // const getSalesByCAD = getCurrencyWiseStats("CAD");
  // const getSalesByUSD = getCurrencyWiseStats("USD");
  // const getSalesByEuro = getCurrencyWiseStats("Euro");
  const getCompanies = data?.totalCompanies || 0;
  const getTotalSales = data?.totalSales || 0;
  const getPeningSales = data?.pendingSales || 0;
  const getCompletedSales = data?.completedSales || 0;

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
        userSales={data?.userOrders}
        isLoading={isLoading}
        stats={detailsStats(
          getCompanies,
          getTotalSales,
          getPeningSales,
          getCompletedSales
        )}
        role="digitizer"
        onModalShow={()=>{setIsModalVisible(true)}}

      />
      {isModalVisible && (
        <NewUserForm
        editable
          visible={isModalVisible}
          isLoading={isLoading}
          id={id}
          data={data?.userData[0]}
          userRole="digitizer"
          onCancel={() => setIsModalVisible(false)}
        />
      )}
    </>
  );
};

export default DigitizerDetailsContainer;
