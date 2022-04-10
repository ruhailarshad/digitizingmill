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
  
    return context
  }

export {UserProvider,useUserData}