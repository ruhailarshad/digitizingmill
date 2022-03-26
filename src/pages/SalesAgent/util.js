import { FaSuitcase } from "react-icons/fa";
import {
  MdDashboard,
  MdMonitor,
  MdOutlineStore,
} from "react-icons/md";

import RouteNames from '../../routes/RouteNames';

export const salesSideNavData = [
    {
      icon: <MdDashboard  size={24}/>,
      name: "Dashboard",
      link: '',
    },
    {
      icon: <MdOutlineStore  size={24}/>,
      name: "Order Details",
      link: RouteNames.salesAgentOrderDetail,
    },
    {
      icon: <FaSuitcase  size={24} />,
      name: "Company Details",
      link: RouteNames.salesAgentCompanyDetail,
    },
    {
      icon: <MdMonitor  size={24} />,
      name: "Sales Report",
      link: RouteNames.salesAgentSalesReport,
    },
  ];