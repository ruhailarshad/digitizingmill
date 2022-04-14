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
import RequireAuth from "./RequireAuth";
import RouteNames from "./RouteNames";
const Roles = {
  digitizer: "digitizer",
  sales: "sales-agent",
  admin: "admin",
};
const routes = () => [
  {
    path: RouteNames.admin,
    element: (
      <RequireAuth role={Roles.admin}>
        <AdminPanelConfig />
      </RequireAuth>
    ),
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
    element: (
      <RequireAuth role={Roles.salesAgent}>
        <SalesAgentPanelConfig />
      </RequireAuth>
    ),
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
  {
    path: RouteNames.digitizer,
    element: (
      <RequireAuth role={Roles.digitizer}>
        <DigitizerPanelConfig />
      </RequireAuth>
    ),
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
  { path: "/login", element: <LoginFormConfig /> },
];

export default routes;
