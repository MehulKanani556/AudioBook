import React, { useState } from 'react'
import '../../CSS/Subscription.css'
import { Link } from 'react-router-dom'
import pen from '../../Images/dhruvin/pancil.svg'
import trash from '../../Images/dhruvin/trash.svg'
import eye from '../../Images/dhruvin/eye_icon.svg'
import { Modal } from 'react-bootstrap'

const Subscription = () => {

  const [subAdd, setSubAdd] = useState(false)
  const [subEdit, setSubEdit] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [redioVal, setRedioVal] = useState("Active")
  const [subCheck, setSubCheck] = useState(true)
  const [subDes, setSubDes] = useState(false)

  return (
    <div className='ds_dash_master'>
       <div className='ds_dash_main'>
          <div className="ds_dash_inner">
               <div className='d-flex justify-content-between align-items-center'>
                    <div>
                       <h4 className="text-light pt-4 mb-0">Subscription</h4>
                       <p><Link to="/layout/dashboard" className='ds_head_txt ds_role_link text-decoration-none'>Dashboard /</Link> <span className='text-light'>Subscription</span></p>
                    </div>
                   <div>
                     <button className='ds_role_btn' onClick={()=> setSubAdd(true)}><i className="fa-solid fa-plus me-2"></i> Add</button>
                   </div>
                </div>

                <div className='ds_role_bg mt-2'>
                <div className='ds_table_wrapper overflow-auto'>
                  <table className='w-100 text-light ds_sub_table '>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Discount</th>
                        <th>Scratch price</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>01</td>
                        <td>Admin</td>
                        <td>50%</td>
                        <td>₹99</td>
                        <td>₹100</td>
                        <td>
                           <span className='ds_sub_active'>Active</span>
                        </td>
                        <td>
                        <span className='ds_sub_eye ds_cursor me-2' onClick={()=> setSubDes(true)} >
                            <img src={eye} alt=""  />
                        </span>
                          <span className='ds_role_icon ds_cursor me-2' onClick={()=> setSubEdit(true)}>
                            <img src={pen} alt=""  />
                          </span>
                          <span className='ds_role_icon ds_cursor' >
                            <img src={trash} alt="" />
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td>01</td>
                        <td>Admin</td>
                        <td>50%</td>
                        <td>₹99</td>
                        <td>₹100</td>
                        <td>
                           <span className='ds_sub_block'>Block</span>
                        </td>
                        <td>
                          <span className='ds_sub_eye ds_cursor me-2' >
                              <img src={eye} alt=""  />
                          </span>
                          <span className='ds_role_icon ds_cursor me-2' onClick={()=> setSubEdit(true)}>
                            <img src={pen} alt=""  />
                          </span>
                          <span className='ds_role_icon ds_cursor' >
                            <img src={trash} alt="" />
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
             </div>
          </div>
       </div>

       {/* ******************* Add Modal ************* */}
       <Modal show={subAdd} onHide={()=> setSubAdd(false)}  size="lg" aria-labelledby="contained-modal-title-vcenter " className='text-light ds_sub_add_modal' centered>
            <Modal.Header className='border-0 pb-0' closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add Subscription
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className='pt-0' >
                <div>
                   <div className="row">
                      <div className="col-xl-6 col-lg-6 mt-4">
                        <div>
                            <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Name</label>
                            <input type="email" className="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 mt-4">
                        <div>
                            <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Discount</label>
                            <input type="email" className="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 mt-4">
                        <div>
                            <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Scratch</label>
                            <input type="email" className="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 mt-4">
                        <div>
                            <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Price</label>
                            <input type="email" className="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 mt-4">
                        <div>
                            <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Price</label>
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
                  <div className='mt-5 mb-3'>
                    <div className='text-center'>
                       <button className='ds_role_save'>Save</button>
                       <button className='ds_sub_cancel' onClick={()=> setSubAdd(false)}>Clear</button>
                    </div>
                  </div>
                </div>
            </Modal.Body>
       </Modal>


        {/* ******************* Edit Modal ************* */}
        <Modal show={subEdit} onHide={()=> setSubEdit(false)}  size="lg" aria-labelledby="contained-modal-title-vcenter " className='text-light ds_sub_add_modal' centered>
            <Modal.Header className='border-0 pb-0' closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                 Edit Subscription
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className='pt-0' >
                <div>
                   <div className="row">
                      <div className="col-xl-6 col-lg-6 mt-4">
                        <div>
                            <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Name</label>
                            <input type="email" className="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 mt-4">
                        <div>
                            <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Discount</label>
                            <input type="email" className="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 mt-4">
                        <div>
                            <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Scratch</label>
                            <input type="email" className="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 mt-4">
                        <div>
                            <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Price</label>
                            <input type="email" className="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 mt-4">
                        <div>
                            <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Price</label>
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
                  <div className='mt-5 mb-3'>
                    <div className='text-center'>
                       <button className='ds_role_save'>Save</button>
                       <button className='ds_sub_cancel' onClick={()=> setSubEdit(false)}>Clear</button>
                    </div>
                  </div>
                </div>
            </Modal.Body>
       </Modal>

        {/* ******************* Subscription Details ************* */}
        <Modal show={subDes} onHide={()=> setSubDes(false)} size="md" aria-labelledby="contained-modal-title-vcenter" className='text-light' centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
               Subscription Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Centered Modal</h4>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
              consectetur ac, vestibulum at eros.
            </p>
          </Modal.Body>
       </Modal>
    </div>
  )
}

export default Subscription
