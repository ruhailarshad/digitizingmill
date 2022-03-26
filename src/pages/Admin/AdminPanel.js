import React from 'react'
import SideNav from '../../core/Sidebar/sidebar'
import { sideNavAdminData } from './util'


const AdminPanel = () => {
  return (
      <SideNav data={sideNavAdminData} indexRoute="admin"/>
  )
}

export default AdminPanel