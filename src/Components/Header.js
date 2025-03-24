import React, { useState } from 'react'
import '../CSS/Header.css'
import search from '../Images/dhruvin/search.svg'
import bell from '../Images/dhruvin/bell.svg'
import profile from '../Images/dhruvin/Profile.svg'
import cancel from '../Images/dhruvin/cancel.svg'
import noti from '../Images/dhruvin/notification.png'



const Header = ({setOffToggle}) => {

const [toggle, setToggle] = useState(false)   

  return (
    <div>
      <div className='ds_header_img'>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='d-md-none d-block'>
              <h3 className='text-light text-center pt-3 ms-sm-4 ms-2 ds_head_logo'>LOGO</h3>
            </div>
             <div>
                <div className='position-relative ms-sm-3 ms-1'>
                   <input type="text" className='ds_header_input' placeholder='Search..' />
                   <div className='ds_search'>
                      <img src={search} alt=""  />
                   </div>
                </div>
             </div>
             <div className='d-flex align-items-center mt-2 position-relative'>
                <div className='ds_noti_bell'>
                   <img src={bell} alt="" className='ds_cursor ds_noti_img' onClick={()=> setToggle(true)} />
                </div>
                <div className='ds_noti_bell'>
                   <img src={profile} alt="" className='ds_profile_img' />
                </div>
                <div className='d-md-none d-block'>
                  <i className="fa-solid fa-bars text-light fs-4 me-sm-3 me-2" onClick={()=> setOffToggle(true)}></i>
               </div>

                {toggle === true && <div className='ds_notifi'>
                   <div>
                      <div className='d-flex justify-content-between px-4 py-3'>
                        <h6 className='text-light mb-0'>Notification</h6>
                         <div>
                            <img src={cancel} alt=""  className='ds_cursor' onClick={()=> setToggle(false)}/>
                         </div>
                      </div>
                      <div className='ds_border'></div>
                      <div className='d-none'>
                         <div className='px-4 py-3'>
                            <h5 className='text-light'>Lorem Ipsum</h5>
                            <p className='ds_head_txt ds_lh'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <p className='ds_head_text' >24 Aug 2024, 14:24</p>
                            <div className='ds_border'></div>
                         </div>
                         <div className='px-4 pt-1'>
                            <h5 className='text-light'>Lorem Ipsum</h5>
                            <p className='ds_head_txt ds_lh'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <p className='ds_head_text' >24 Aug 2024, 14:24</p>
                            <div className='ds_border'></div>
                         </div>
                         <div className='px-4 pt-3'>
                            <h5 className='text-light'>Lorem Ipsum</h5>
                            <p className='ds_head_txt ds_lh'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <p className='ds_head_text' >24 Aug 2024, 14:24</p>
                            <div className='ds_border'></div>
                         </div>
                      </div>
                   </div>

                   <div className='d-non'>
                     <div className='ds_notification'>
                         <div className='d-flex justify-content-center align-items-center h-100'>
                            <div className='text-center'>
                               <img src={noti} alt="" width="50%" />
                               <h5 className='text-light'>No notifications</h5>
                               <p className='ds_head_text mx-xl-5 px-5 ds_lh'>There is no notification to 
                               show right now.</p>
                            </div>
                         </div>
                     </div>
                   </div>
                </div>}
             </div>
             
          </div>
      </div>
    </div>
  )
}

export default Header
