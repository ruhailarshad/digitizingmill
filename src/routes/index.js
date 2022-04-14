
import {useRoutes} from 'react-router-dom'
import routes from './PrivateRoute';
import { useUserData } from '../pages/Login/userContext';
const Routes = () => {
  const {isLoggedIn,role}=useUserData()
  const authRoutes = useRoutes(routes({isLoggedIn:isLoggedIn,role:role}))
  return authRoutes
}

export default Routes