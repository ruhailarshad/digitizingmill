import loadable from '@loadable/component';

// import RouteName from '../../routes/RouteNames';

export { default as SalesAgentContainer } from './DashboardContainer';

export const AdminDashboardConfig =  loadable(() => import('./DashboardContainer'))
