import loadable from '@loadable/component';

// import RouteName from '../../routes/RouteNames';

export { default as CompanyDetailsContainer } from './CompanyDetailsContainer';

export const CompanyDetailsConfig =  loadable(() => import('./CompanyDetailsContainer'))
