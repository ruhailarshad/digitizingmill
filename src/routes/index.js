
import {useRoutes} from 'react-router-dom'
import routes from './PrivateRoute';
import { getUserData } from '../services/utils';
const isLoggedIn = getUserData().data;
console.log(isLoggedIn,'asdasd')
const Routes = () => {

  const authRoutes = useRoutes(routes({isLoggedIn:isLoggedIn,role:isLoggedIn?.role}))
  return authRoutes
}

export default Routes