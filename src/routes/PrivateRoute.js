import { Navigate } from "react-router-dom";
import { AdminPanelConfig } from "../pages/Admin";
import { CompanyDetailsConfig } from "../pages/Admin/CompanyDetails";
import { AdminDashboardConfig } from "../pages/Admin/Dashboard";
import { DigitizerConfig } from "../pages/Admin/Digitizers";
import { OrderDetailsConfig } from "../pages/Admin/OrderDetails";
import { SalesAgentConfig } from "../pages/Admin/SalesAgent";
import {
  DegitizerDetailConfig,
  UserDetailsConfig,
} from "../pages/Admin/UserDetails";
import { DigitizerPanelConfig } from "../pages/Digitizer";
import { DigitizerDashboardConfig } from "../pages/Digitizer/Dashboard";
import { DigitizerOrderDetailsConfig } from "../pages/Digitizer/OrderDetails";
import { LoginFormConfig } from "../pages/Login";
import { SalesAgentPanelConfig } from "../pages/SalesAgent";
import { SalesCompanyDetailsConfig } from "../pages/SalesAgent/CompanyDetails";
import { SalesDashboardConfig } from "../pages/SalesAgent/Dashboard";
import { SalesOrderDetailsConfig } from "../pages/SalesAgent/OrderDetails";
import { SalesReportConfig } from "../pages/SalesAgent/SalesReport";
import RouteNames from "./RouteNames";

const routes = ({isLoggedIn,role}) => [
  { path: "/login", element:!isLoggedIn ? <LoginFormConfig /> : <Navigate to={`/${role}`} /> },
  {
    path: RouteNames.admin,
    element: isLoggedIn && role==='admin' ? <AdminPanelConfig /> : <Navigate to="/login" />,
    children: [
      {
        index: true,
        element: <AdminDashboardConfig />,
      },
      {
        path: RouteNames.adminSalesAgent,
        element: <SalesAgentConfig />,
      },
      { path: RouteNames.adminSalesAgentView, element: <UserDetailsConfig /> },

      { path: RouteNames.adminDigitizer, element: <DigitizerConfig /> },
      {
        path: RouteNames.adminDigitizerView,
        element: <DegitizerDetailConfig />,
      },
      { path: RouteNames.adminOrderDetails, element: <OrderDetailsConfig /> },
      {
        path: RouteNames.adminCompanyDetails,
        element: <CompanyDetailsConfig />,
      },
    ],
  },
  //sales
  {
    path: RouteNames.salesAgent,
    element: isLoggedIn && role==='sales-agent'  ?  <SalesAgentPanelConfig /> : <Navigate to="/login" />,
    children: [
      {
        index: true,
        element: <SalesDashboardConfig />,
      },
      {
        path: RouteNames.salesAgentCompanyDetail,
        element: <SalesCompanyDetailsConfig />,
      },
      {
        
        path: RouteNames.salesAgentOrderDetail,
        element: <SalesOrderDetailsConfig />,
      },
      {
        
        path: RouteNames.salesAgentSalesReport,
        element: <SalesReportConfig />,
      },
    ],
  },
  //digitzer
  {
    path: RouteNames.digitizer,
    element: isLoggedIn && role==='digitizer'  ?  <DigitizerPanelConfig /> : <Navigate to="/login" />,
    children: [
      {
        index: true,
        element: <DigitizerDashboardConfig />,
      },
      {
        path: RouteNames.digitizerOrderDetail,
        element: <DigitizerOrderDetailsConfig />,
      },
    
    ],
  },
];

export default routes;
