import loadable from '@loadable/component';

// import RouteName from '../../routes/RouteNames';

export { default as UserDetailsContainer } from './UserDetailsContainer';

 const DegitizerDetailConfig =  loadable(() => import('./DigitizerDetailsContainer'))
 const UserDetailsConfig =  loadable(() => import('./UserDetailsContainer'))
export {DegitizerDetailConfig,UserDetailsConfig}