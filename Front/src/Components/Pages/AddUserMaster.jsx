import langs from 'langs'
import React, { useState } from 'react'

const AddUserMaster = () => {

const [toggle, setToggle] = useState(false)
const [redioVal, setRedioVal] = useState("Active")
const [subCheck, setSubCheck] = useState(true)

const [toggle2, setToggle2] = useState(false)
const [redioVal2, setRedioVal2] = useState("Active")
const [subCheck2, setSubCheck2] = useState(true)

const language = langs.all()

  return (
    <div className='ds_dash_master'>
       <div className='ds_dash_main'>
          <div className="ds_dash_inner">
                <div>
                   <h4 className="text-light pt-4 mb-0">Add User Master</h4>
                </div>
                <form action="">
                    <div className="row pt-2">
                        <div className="col-xl-6 col-lg-6 mt-4">
                           <div>
                               <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Email</label>
                               <input type="email" className="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                           </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 mt-4">
                           <div>
                               <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Phone</label>
                               <input type="email" className="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                           </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 mt-4">
                           <div>
                               <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Password</label>
                               <input type="email" className="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                           </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 mt-4">
                           <div>
                               <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Role ID</label>
                               <input type="email" className="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                           </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 mt-4">
                           <div>
                               <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Bio</label>
                               <input type="text" className="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                           </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 mt-4">
                           <div>
                               <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Age</label>
                               <input type="email" className="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                           </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 mt-4">
                           <div>
                               <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Occupation</label>
                               <input type="email" className="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                           </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 mt-4">
                        <div>
                            <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">student_verification_status</label>
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
                        <div className="col-xl-6 col-lg-6 mt-4">
                           <div>
                               <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">student_ID_image</label>
                               <input type="email" className="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                           </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 mt-4">
                           <div>
                               <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Coins</label>
                               <input type="email" className="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                           </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 mt-4">
                           <div>
                               <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Language</label>
                               <select className='ds_role_input w-100' name="" >
                                  <option value="" selected>select</option>
                                  {language.map((element , index)=>{
                                    return(
                                        <option key={index}>{element?.name}</option>
                                    )
                                  })}
                               </select>
                           </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 mt-4">
                           <div className='position-relative'>
                               <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Image</label>
                               <input type="email" className="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                               <input type="file" className='ds_add_master_choose' />
                           </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 mt-4">
                        <div>
                            <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Status</label>
                            <div className='select-wrapper position-relative'>
                               <div className='ds_sub_select' onClick={()=> setToggle2(!toggle2)}>{redioVal2}</div>
                                 {toggle2 && (<div className='ds_sub_select_box'>
                                               <div className="form-check mb-3" onClick={()=> {setRedioVal2("Active"); setToggle2(false)}}>
                                                   <input className="form-check-input ds_sub_check" type="radio" name="exampleRadios1" id="exampleRadios3" value="Active" checked={redioVal2 === "Active" && subCheck2 ? true : false} />
                                                   <label className="form-check-label" htmlFor="exampleRadios3">
                                                      Active
                                                   </label>
                                                 </div>
                                                 <div className="form-check" onClick={()=> {setRedioVal2("Block"); setToggle2(false)}}>
                                                   <input className="form-check-input ds_sub_check" type="radio" name="exampleRadios1" id="exampleRadios4" value="Block" checked={redioVal2 === "Block" && subCheck2 ? true : false}/>
                                                   <label className="form-check-label" htmlFor="exampleRadios4">
                                                      Block
                                                   </label> 
                                                 </div>
                                             </div>
                                         )}
                            </div>
                        </div>
                        </div>
                        

                    </div>

                    <div className='text-center mt-2 pt-lg-5 pt-4 mb-lg-0 pb-4'>
                       <button className='ds_role_save'>Save</button>
                       <button className='ds_sub_cancel'>Clear</button>
                    </div>
                </form>
          </div>

          
       </div>
    </div>
  )
}

export default AddUserMaster
