import loadable from '@loadable/component';


export { default as OrderDetailsContainer } from './OrderDetailsContainer';

export const DigitizerOrderDetailsConfig =  loadable(() => import('./OrderDetailsContainer'))
