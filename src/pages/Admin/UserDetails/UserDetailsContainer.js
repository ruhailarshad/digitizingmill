import React, { useState } from "react";
import { detailsStats } from "../../../constants/stats";
import UserDetails from "../Common/UserDetails";
import { useParams } from "react-router-dom";
import NewUserForm from "../../../core/Forms/NewUserForm";
import { useGetUserById } from "../../../hooks/User/useGetUserById";

const UserDetailsContainer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sales, setSales] = useState("totalSalesDollar");

  const { id } = useParams();
  const { data, isLoading } = useGetUserById({
    id,
    role: "sales-agent",
  });

  const totalCompanies = data?.totalCompanies;
  const totalSales = data?.[sales] || 0;
  const pendingSales = data?.pendingSales;
  const completedSales = data?.completedSales;

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
          totalCompanies,
          totalSales,
          pendingSales,
          completedSales
        )}
        role="sales-agent"
        handler={(values) => setSales(values)}

      />
      {isModalVisible && (
        
        <NewUserForm
        editable
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
