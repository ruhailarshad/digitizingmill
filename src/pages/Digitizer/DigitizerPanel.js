import React from 'react'
import SideNav from '../../core/Sidebar/sidebar'
import {  sideNavDigitzerData } from './util'


const AdminPanel = () => {
  return (
      <SideNav data={sideNavDigitzerData} indexRoute="digitizer"/>
  )
}

export default AdminPanel