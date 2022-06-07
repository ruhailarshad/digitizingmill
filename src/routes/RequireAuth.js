import { Navigate, useLocation } from 'react-router-dom';
import { useUserData } from '../pages/Login/userContext'

const RequireAuth = ({role,children}) => {
  let location = useLocation();
  const {isLoggedIn,role:userRole}=useUserData()
  if(!isLoggedIn){
      return <Navigate to="/login" state={{ from: location }} />;
  }
   if(isLoggedIn && role!==userRole){
    return' No User Found'

   }
   return children
}

export default RequireAuth