import { FaSuitcase } from "react-icons/fa";
import {
  MdDashboard,
  MdPeopleAlt,
  MdMonitor,
  MdOutlineStore,
} from "react-icons/md";

import RouteNames from '../../routes/RouteNames';
export const sideNavAdminData = [
    {
      icon: <MdDashboard  size={24}/>,
      name: "Dashboard",
      link: '',
    },
    {
      icon: <MdOutlineStore  size={24}/>,
      name: "Order Details",
      link: RouteNames.adminOrderDetails,
    },
    {
      icon: <FaSuitcase  size={24} />,
      name: "Company Details",
      link: RouteNames.adminCompanyDetails,
    },
    {
      icon: <MdPeopleAlt  size={24}/>,
      name: "Sales Agents",
      link: RouteNames.adminSalesAgent,
    },
    {
      icon: <MdMonitor  size={24} />,
      name: "Digitizer",
      link: RouteNames.adminDigitizer,
    },
  ];