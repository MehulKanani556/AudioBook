import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
       <div>
         <Sidebar/>
       </div>
       <div>
         <Header/>
         <Outlet/>
       </div>
    </div>
  )
}

export default Layout
