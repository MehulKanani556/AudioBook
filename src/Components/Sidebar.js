import React from 'react'
import '../CSS/Sidebar.css'
import dashboard from '../Images/dhruvin/dashboard.svg'
import role from '../Images/dhruvin/role.svg'
import king from '../Images/dhruvin/king.svg'
import coin from '../Images/dhruvin/coin.svg'
import master from '../Images/dhruvin/coin_master.svg'
import person from '../Images/dhruvin/person.svg'
import sub from '../Images/dhruvin/sub.svg'
import sell from '../Images/dhruvin/sell.svg'
import voucher from '../Images/dhruvin/voucher.svg'
import used from '../Images/dhruvin/used.svg'
import genre from '../Images/dhruvin/genre.svg'
import book from '../Images/dhruvin/book.svg'
import cast from '../Images/dhruvin/cast.svg'
import review from '../Images/dhruvin/Review.svg'

const Sidebar = () => {
  return (
    <div>
        <div className='ds_side_bg'>
           <div>
              <h3 className='text-light text-center pt-3'>LOGO</h3>
              <div className='mt-5'>
                 <div className=' ms-3 ds_active_pad  ds_active_color'>
                   <div className='d-flex  ms-5 '>
                     <div>
                        <img src={dashboard} alt="" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Dashboard</h5>
                   </div>
                 </div>

                 <div className=' ms-3 ds_active_pad  py-2 mt-3'>
                   <div className='d-flex  ms-5 '>
                     <div>
                        <img src={role} alt="" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Role</h5>
                   </div>
                 </div>

                 <div className=' ms-3 ds_active_pad  py-2 mt-3'>
                   <div className='d-flex  ms-5 '>
                     <div>
                        <img src={king} alt="" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Subscription</h5>
                   </div>
                 </div>

                 <div className=' ms-3 ds_active_pad  py-2 mt-3'>
                   <div className='d-flex  ms-5 '>
                     <div>
                        <img src={coin} alt="" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Coin Label</h5>
                   </div>
                 </div>

                 <div className=' ms-3 ds_active_pad  py-2 mt-3'>
                   <div className='d-flex  ms-5 '>
                     <div>
                        <img src={master} alt="" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Coin Master</h5>
                   </div>
                 </div>

                 <div className=' ms-3 ds_active_pad  py-2 mt-3'>
                   <div className='d-flex  ms-5 '>
                     <div>
                        <img src={person} alt="" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>User Master</h5>
                   </div>
                 </div>

                 <div className=' ms-3 ds_active_pad  py-2 mt-3'>
                   <div className='d-flex  ms-5 '>
                     <div>
                        <img src={sub} alt="" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Subscription Sell</h5>
                   </div>
                 </div>

                 <div className=' ms-3 ds_active_pad  py-2 mt-3'>
                   <div className='d-flex  ms-5 '>
                     <div>
                        <img src={sell} alt="" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Coin Sell</h5>
                   </div>
                 </div>

                 <div className=' ms-3 ds_active_pad  py-2 mt-3'>
                   <div className='d-flex  ms-5 '>
                     <div>
                        <img src={voucher} alt="" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Vouchers</h5>
                   </div>
                 </div>

                 <div className=' ms-3 ds_active_pad  py-2 mt-3'>
                   <div className='d-flex  ms-5 '>
                     <div>
                        <img src={used} alt="" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Vouchers Used</h5>
                   </div>
                 </div>

                 <div className=' ms-3 ds_active_pad  py-2 mt-3'>
                   <div className='d-flex  ms-5 '>
                     <div>
                        <img src={genre} alt="" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Genre</h5>
                   </div>
                 </div>

                 <div className=' ms-3 ds_active_pad  py-2 mt-3'>
                   <div className='d-flex  ms-5 '>
                     <div>
                        <img src={book} alt="" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Audio Book</h5>
                   </div>
                 </div>

                 <div className=' ms-3 ds_active_pad  py-2 mt-3'>
                   <div className='d-flex  ms-5 '>
                     <div>
                        <img src={cast} alt="" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Cast Crew</h5>
                   </div>
                 </div>

                 <div className=' ms-3 ds_active_pad  py-2 mt-3'>
                   <div className='d-flex  ms-5 '>
                     <div>
                        <img src={review} alt="" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Review</h5>
                   </div>
                 </div>

              </div>
           </div>
        </div>
    </div>
  )
}

export default Sidebar
