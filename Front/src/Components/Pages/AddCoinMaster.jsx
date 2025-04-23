import React, { useState } from 'react'
import '../../CSS/CoinMaster.css'
import { useNavigate } from 'react-router-dom'

const AddCoinMaster = () => {

const [toggle, setToggle] = useState(false)
const [redioVal, setRedioVal] = useState("Active")
const [subCheck, setSubCheck] = useState(true)


  return (
    <div className='ds_dash_master'>
       <div className='ds_dash_main'>
          <div className="ds_dash_inner">
                <div>
                   <h4 className="text-light pt-4 mb-0">Add Coin Master</h4>
                </div>
                <form action="">
                    <div className="row pt-2">
                        <div className="col-xl-6 col-lg-6 mt-4">
                           <div>
                               <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Coins</label>
                               <input type="email" className="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                           </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 mt-4">
                           <div>
                               <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Payment</label>
                               <input type="email" className="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                           </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 mt-4">
                           <div>
                               <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Free Coins</label>
                               <input type="email" className="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                           </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 mt-4">
                           <div>
                               <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Label ID</label>
                               <input type="email" className="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                           </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 mt-4">
                           <div>
                               <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">is one time</label>
                               <input type="time" className="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                           </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 mt-4">
                           <div>
                               <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Valid till</label>
                               <input type="email" className="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                           </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 mt-4">
                        <div>
                            <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Status</label>
                            <div className='select-wrapper position-relative'>
                               <div className='ds_sub_select' onClick={()=> setToggle(!toggle)}>{redioVal}</div>
                                 {toggle && (<div className='ds_sub_select_box'>
                                               <div className="form-check mb-3" onClick={()=> {setRedioVal("Active"); setToggle(false)}}>
                                                   <input className="form-check-input ds_sub_check" type="radio" name="exampleRadios" id="exampleRadios1" value="Active" checked={redioVal === "Active" && subCheck ? true : false} />
                                                   <label className="form-check-label" htmlFor="exampleRadios1">
                                                      Active
                                                   </label>
                                                 </div>
                                                 <div className="form-check" onClick={()=> {setRedioVal("Block"); setToggle(false)}}>
                                                   <input className="form-check-input ds_sub_check" type="radio" name="exampleRadios" id="exampleRadios2" value="Block" checked={redioVal === "Block" && subCheck ? true : false}/>
                                                   <label className="form-check-label" htmlFor="exampleRadios2">
                                                      Block
                                                   </label> 
                                                 </div>
                                             </div>
                                         )}
                            </div>
                        </div>
                      </div>

                    </div>

                    <div className='text-center mt-5 pt-lg-5 mb-lg-0 pb-4'>
                       <button className='ds_role_save'>Save</button>
                       <button className='ds_sub_cancel'>Clear</button>
                    </div>
                </form>
          </div>
       </div>
    </div>
  )
}

export default AddCoinMaster
