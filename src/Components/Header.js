import React from 'react'
import '../CSS/Header.css'
import search from '../Images/dhruvin/search.svg'
import bell from '../Images/dhruvin/bell.svg'
import profile from '../Images/dhruvin/Profile.svg'
import cancel from '../Images/dhruvin/cancel.svg'


const Header = () => {
  return (
    <div>
      <div className='ds_header_img'>
          <div className='d-flex justify-content-between align-items-center'>
             <div>
                <div className='position-relative ms-3'>
                   <input type="text" className='ds_header_input' placeholder='Search..' />
                   <div className='ds_search'>
                      <img src={search} alt=""  />
                   </div>
                </div>
             </div>
             <div className='d-flex align-items-center mt-2 position-relative'>
                <div className='me-3'>
                   <img src={bell} alt="" className='ds_cursor' />
                </div>
                <div className='me-3'>
                   <img src={profile} alt="" />
                </div>

                <div className='ds_notifi'>
                   <div>
                      <div className='d-flex justify-content-between px-3 py-3'>
                        <h6 className='text-light mb-0'>Notification</h6>
                         <div>
                            <img src={cancel} alt=""  className='ds_cursor'/>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
      </div>
    </div>
  )
}

export default Header
