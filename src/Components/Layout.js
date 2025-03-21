import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
       <div className='container-fluid'>
          <div className='row'>
            <div className=''>
              <Sidebar/>
            </div>
            <div className='col-xl-9'>
              <Header/>
              <Outlet/>
            </div>
          </div>
       </div>
    </div>
  )
}

export default Layout
