import loadable from '@loadable/component';

// import RouteName from '../../routes/RouteNames';

export { default as LoginForm } from './LoginForm';

export const LoginFormConfig = loadable(() => import('./LoginForm'))
