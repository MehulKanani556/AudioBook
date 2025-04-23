import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import '../CSS/Layout.css'

const Layout = () => {

const [offToggle, setOffToggle] = useState(false)  

  return (
    <div>
       <div className=''>
          
          <div className='d-flex '>
            <div className='p-0 position-relative'>
              <Sidebar offToggle={offToggle} setOffToggle={setOffToggle}/>
            </div>
            <div className='p-0 flex-fill w-100'>
              <Header setOffToggle={setOffToggle} />
              <Outlet />
            </div>
          </div>
       </div>
    </div>
  )
}

export default Layout
