import React from "react";
import { detailsStats } from "../../../constants/stats";
import UserDetails from "../Common/UserDetails";
import { useUserById } from "../request";
import { useParams } from "react-router-dom";

const DigitizerDetailsContainer = () => {

  const { id } = useParams();
  const {data, isLoading} = useUserById({
    id,
    role: 'digitizer'
  });
  
  const getCurrencyWiseStats = (currencyName) => {
    if(data?.userStats[currencyName]) {
      return data.userStats[currencyName].sales;
    }
    return 0;
  }

  const getSalesByCAD = getCurrencyWiseStats('CAD');
  const getSalesByUSD = getCurrencyWiseStats('USD');
  const getSalesByEuro = getCurrencyWiseStats('Euro');
  const getCompanies = data?.totalCompanies || 0;

  return (
    <UserDetails
      data={data?.userData ?  {
        ...data.userData[0]
      } :{ }}
      userCompanies={data?.userCompanies?.companies}
      userSales={data?.userOrders}
      isLoading={isLoading}
      stats={detailsStats(getCompanies, getSalesByUSD, getSalesByCAD, getSalesByEuro)}
    />
  );
};

export default DigitizerDetailsContainer;
