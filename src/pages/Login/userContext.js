import * as React from 'react'
import { getUserData } from './utils'

const UserContext = React.createContext()



function UserProvider({children}) {
  const [userData, setUserData] = React.useState(getUserData())
  const value = {userData, setUserData}
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
function useUserData() {
    const context = React.useContext(UserContext)
  
    return {isLoggedIn:!!context?.userData?.data,role:context?.userData?.data?.role,setUserData:context.setUserData,userData:context.userData?.data}
  }

export {UserProvider,useUserData}