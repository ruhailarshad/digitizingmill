import loadable from '@loadable/component';


export { default as OrderDetailsContainer } from './OrderDetailsContainer';

export const OrderDetailsConfig =  loadable(() => import('./OrderDetailsContainer'))
