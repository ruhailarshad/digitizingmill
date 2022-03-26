import React from "react";
import { detailsStats } from "../../../constants/stats";
import UserDetails from "../Common/UserDetails";

const DigitizerDetailsContainer = () => {
  return (
    <UserDetails
      data={{
        name: "Ruhail Arshad",
        role: "Admin",
        email: "ruhailarshad@gmail.com",
        number: "03462880800",
        address: "saleem north karachi",
      }}
      stats={detailsStats(256, 6, 6, 6)}
    />
  );
};

export default DigitizerDetailsContainer;
