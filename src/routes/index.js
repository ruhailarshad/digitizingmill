
import {useRoutes} from 'react-router-dom'
import routes from './PrivateRoute';
import { useUserData } from '../pages/Login/userContext';
const Routes = () => {
  const {userData}=useUserData()
  console.log(userData,"userData")
  const authRoutes = useRoutes(routes({isLoggedIn:userData?.data,role:userData?.data?.role}))
  return authRoutes
}

export default Routes