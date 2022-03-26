import loadable from '@loadable/component';


export { default as SalesAgentContainer } from './SalesAgentContainer';

export const SalesAgentConfig =  loadable(() => import('./SalesAgentContainer'))
