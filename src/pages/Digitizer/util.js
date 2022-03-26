import {
  MdDashboard,
  MdOutlineStore,
} from "react-icons/md";

import RouteNames from '../../routes/RouteNames';
export const sideNavDigitzerData = [
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
   
  ];