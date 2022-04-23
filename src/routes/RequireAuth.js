import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useUserData } from '../pages/Login/userContext'

const RequireAuth = ({role,children}) => {
  const {isLoggedIn,role:userRole}=useUserData()
  return isLoggedIn && role===userRole
  ? children
  : <Navigate to="/login" replace   />
}

export default RequireAuth