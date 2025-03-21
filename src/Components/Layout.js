import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import '../CSS/Layout.css'

const Layout = () => {
  return (
    <div>
       <div className='container-fluid'>
          <div className='row'>
            <div className='p-0 ds_side_main'>
              <Sidebar/>
            </div>
            <div className='p-0 ds_header_main'>
              <Header/>
              <Outlet/>
            </div>
          </div>
       </div>
    </div>
  )
}

export default Layout
