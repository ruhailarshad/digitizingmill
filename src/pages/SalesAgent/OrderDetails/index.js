import loadable from '@loadable/component';

// import RouteName from '../../routes/RouteNames';


export const SalesOrderDetailsConfig =  loadable(() => import('./OrderDetailsContainer'))
