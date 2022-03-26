import loadable from '@loadable/component';

// import RouteName from '../../routes/RouteNames';

export { default as DigitizerContainer } from './DigitizerContainer';

export const DigitizerConfig = loadable(() => import('./DigitizerContainer'))
