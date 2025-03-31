import React, { useEffect, useState } from 'react'
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
import episode from '../Images/dhruvin/Episode.svg'
import unlock from '../Images/dhruvin/unlock.svg'
import state from '../Images/dhruvin/state.svg'
import playmaster from '../Images/dhruvin/master.svg'
import song from '../Images/dhruvin/song.svg'
import home from '../Images/dhruvin/home.svg'
import label from '../Images/dhruvin/label.svg'
import join from '../Images/dhruvin/join.svg'

import { Offcanvas } from 'react-bootstrap'
import {  useNavigate } from 'react-router-dom'

const Sidebar = ({offToggle , setOffToggle }) => {

  const navigate = useNavigate();
  const [color, setColor] = useState(localStorage.getItem("activeMenu") || "dashboard");

  useEffect(() => {
    localStorage.setItem("activeMenu", color);
  }, [color]);

  


  return (
    <>
    <div className='p-0 ds_side_main d-md-block d-none'>
        <div className='ds_side_bg '>
           <div>
              <h3 className='text-light text-center pt-3'>LOGO</h3>
              <div className='mt-5'>
                 <div className={` ms-3 ds_active_pad ${color === "dashboard" ? 'ds_active_color' : '' }  `} onClick={() => {navigate('/layout/dashboard'); setColor("dashboard")}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3' >
                     <div>
                        <img src={dashboard} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Dashboard</h5>
                   </div>
                 </div>

                 <div className={`ms-3 ds_active_pad ${color === "role" ? 'ds_active_color' : '' }   mt-3 `} onClick={() => {navigate('/layout/role'); setColor("role")}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3' >
                     <div>
                        <img src={role} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Role</h5>
                   </div>
                 </div>

                 <div className={`ms-3 ds_active_pad ${color === "subscription" ? 'ds_active_color' : '' }  mt-3`} onClick={() => {navigate('/layout/subscription'); setColor("subscription")}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3' >
                     <div>
                        <img src={king} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Subscription</h5>
                   </div>
                 </div>

                 <div className={`ms-3 ds_active_pad ${color === "coinlabel" ? 'ds_active_color' : '' }  mt-3`} onClick={() => {navigate('/layout/coinlabel'); setColor("coinlabel")}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={coin} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Coin  Label</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "coinmaster" ? 'ds_active_color' : '' }  mt-3`} onClick={() => {navigate('/layout/coinmaster'); setColor("coinmaster")}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={master} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Coin Master</h5>
                   </div>
                 </div>

                 <div className={`ms-3 ds_active_pad ${color === "usermaster" ? 'ds_active_color' : '' } mt-3`} onClick={() => {navigate('/layout/usermaster'); setColor("usermaster")}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={person} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>User Master</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "subscriptionsell" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/subscriptionsell'); setColor("subscriptionsell")}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={sub} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Subscription Sell</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "coinsell" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/coinsell'); setColor("coinsell")}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={sell} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Coin Sell</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "voucher" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/voucher'); setColor("voucher")}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={voucher} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Vouchers</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "voucherused" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/voucherused'); setColor("voucherused")}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={used} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Vouchers Used</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "genre" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/genre'); setColor("genre")}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3' >
                     <div>
                        <img src={genre} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Genre</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "audiobooks" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/audiobooks'); setColor("audiobooks")}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={book} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Audio Book</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "castcrew" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/castcrew'); setColor("castcrew")}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={cast} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Cast Crew</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "review" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/review'); setColor("review")}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={review} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Review</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "episodes" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/episodes'); setColor("episodes")}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={episode} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Episodes</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "episodeunlock" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/episodeunlock'); setColor("episodeunlock")}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={unlock} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Episode Unlock</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "episodestate" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/episodestate'); setColor("episodestate")}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={state} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Episode State</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "playlistmaster" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/playlistmaster'); setColor("playlistmaster")}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={playmaster} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Playlist Master</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "playlistsongs" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/playlistsongs'); setColor("playlistsongs")}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={song} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Playlist Songs</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "homecorousel" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/homecorousel'); setColor("homecorousel")}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3' >
                     <div>
                        <img src={home} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Home Corousel</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "homelabels" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/homelabels'); setColor("homelabels")}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3' onClick={() => navigate('/layout/homelabels')}>
                     <div>
                        <img src={label} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Home Labels</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "homelabeljoin" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/homelabeljoin'); setColor("homelabeljoin")}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3' onClick={() => navigate('/layout/homelabeljoin')}>
                     <div>
                        <img src={join} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Home Label Join</h5>
                   </div>
                 </div>

              </div>
           </div>
        </div>
    </div>

    <div>
      <Offcanvas className="ds_side_off_main" show={offToggle} onHide={()=>setOffToggle(false)}>
         <Offcanvas.Header closeButton>
           <Offcanvas.Title className='text-light'>LOGO</Offcanvas.Title>
         </Offcanvas.Header>
         <Offcanvas.Body>
         <div className='mt-2'>
                 <div className={` ms-3 ds_active_pad ${color === "dashboard" ? 'ds_active_color' : '' }  `} onClick={() => {navigate('/layout/dashboard'); setColor("dashboard"); setOffToggle(false)}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={dashboard} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Dashboard</h5>
                   </div>
                 </div>

                 <div className={`ms-3 ds_active_pad ${color === "role" ? 'ds_active_color' : '' }   mt-3 `} onClick={() => {navigate('/layout/role'); setColor("role"); setOffToggle(false)}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={role} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Role</h5>
                   </div>
                 </div>

                 <div className={`ms-3 ds_active_pad ${color === "subscription" ? 'ds_active_color' : '' }  mt-3`} onClick={() => {navigate('/layout/subscription'); setColor("subscription"); setOffToggle(false)}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={king} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Subscription</h5>
                   </div>
                 </div>

                 <div className={`ms-3 ds_active_pad ${color === "coinlabel" ? 'ds_active_color' : '' }  mt-3`} onClick={() => {navigate('/layout/coinlabel'); setColor("coinlabel"); setOffToggle(false)}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={coin} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Coin Label</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "coinmaster" ? 'ds_active_color' : '' }  mt-3`} onClick={() => {navigate('/layout/coinmaster'); setColor("coinmaster"); setOffToggle(false)}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={master} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Coin Master</h5>
                   </div>
                 </div>

                 <div className={`ms-3 ds_active_pad ${color === "usermaster" ? 'ds_active_color' : '' } mt-3`} onClick={() => {navigate('/layout/usermaster'); setColor("usermaster"); setOffToggle(false)}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={person} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>User Master</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "subscriptionsell" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/subscriptionsell'); setColor("subscriptionsell"); setOffToggle(false)}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={sub} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Subscription Sell</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "coinsell" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/coinsell'); setColor("coinsell"); setOffToggle(false)}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={sell} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Coin Sell</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "voucher" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/voucher'); setColor("voucher"); setOffToggle(false)}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3' >
                     <div>
                        <img src={voucher} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Vouchers</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "voucherused" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/voucherused'); setColor("voucherused"); setOffToggle(false)}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={used} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Vouchers Used</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "genre" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/genre'); setColor("genre"); setOffToggle(false)}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3' >
                     <div>
                        <img src={genre} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Genre</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "audiobooks" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/audiobooks'); setColor("audiobooks"); setOffToggle(false)}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={book} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Audio Book</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "castcrew" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/castcrew'); setColor("castcrew"); setOffToggle(false)}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={cast} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Cast Crew</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "review" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/review'); setColor("review"); setOffToggle(false)}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={review} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Review</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "episodes" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/episodes'); setColor("episodes"); setOffToggle(false)}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3' >
                     <div>
                        <img src={episode} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Episodes</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "episodeunlock" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/episodeunlock'); setColor("episodeunlock"); setOffToggle(false)}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3' >
                     <div>
                        <img src={unlock} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Episode Unlock</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "episodestate" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/episodestate'); setColor("episodestate"); setOffToggle(false)}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={state} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Episode State</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "playlistmaster" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/playlistmaster'); setColor("playlistmaster"); setOffToggle(false)}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3' >
                     <div>
                        <img src={playmaster} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Playlist Master</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "playlistsongs" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/playlistsongs'); setColor("playlistsongs"); setOffToggle(false)}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3' >
                     <div>
                        <img src={song} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Playlist Songs</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "homecorousel" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/homecorousel'); setColor("homecorousel"); setOffToggle(false)}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={home} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Home Corousel</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "homelabels" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/homelabels'); setColor("homelabels"); setOffToggle(false)}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3' >
                     <div>
                        <img src={label} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Home Labels</h5>
                   </div>
                 </div>

                 <div className={` ms-3 ds_active_pad ${color === "homelabeljoin" ? 'ds_active_color' : '' } mt-3 `} onClick={() => {navigate('/layout/homelabeljoin'); setColor("homelabeljoin"); setOffToggle(false)}}>
                   <div className='d-flex align-items-center  ms-xl-5 ms-3'>
                     <div>
                        <img src={join} className="ds_side_icon" />
                     </div>
                     <h5 className='ms-3 text-light mb-0 ds_side_title'>Home Label Join</h5>
                   </div>
                 </div>

              </div>
         </Offcanvas.Body>
      </Offcanvas>
    </div>
    </>
  )
}

export default Sidebar
