import loadable from '@loadable/component';

// import RouteName from '../../routes/RouteNames';

export { default as AdminPanel } from './AdminPanel';

export const AdminPanelConfig =  loadable(() => import('./AdminPanel'))
