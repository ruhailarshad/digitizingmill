import React from 'react'
import SideNav from '../../core/Sidebar/sidebar'
import { salesSideNavData } from './util'


const SalesAgentPanel = () => {
  return (
      <SideNav data={salesSideNavData} indexRoute="sales-agent"/>
  )
}

export default SalesAgentPanel