import React from "react";
import { dashboardStats } from "../../../constants/stats";
import Dashboard from "../../../core/Dashboard";

const DashboardContainer = () => {
  return <Dashboard dashboardStats={dashboardStats(254, 4, 4, 4)} />;
};

export default DashboardContainer;
