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
  const totalPages = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [subRemove, setSubRemove] = useState(false)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
    }
};

const handlePrev = () => {
    if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }
};

const handleNext = () => {
    if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
    }
};

const renderPagination = () => {
    let pages = [];

    pages.push(
        <div
            key="prev"
            className={`V_pagination text-center ${currentPage === 1 ? "disabled" : ""}`}
            onClick={handlePrev}
        >
            Prev
        </div>
    );

    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
            pages.push(
                <div
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`text-center ${currentPage === i ? "V_pagination1" : "V_pagination"}`}
                >
                    {i}
                </div>
            );
        } else if (
            (i === currentPage - 2 && currentPage > 3) ||
            (i === currentPage + 2 && currentPage < totalPages - 2)
        ) {
            pages.push(
                <div key={`dots-${i}`} className="V_pagination text-center">
                    ...
                </div>
            );
        }
    }

    pages.push(
        <div
            key="next"
            className={`V_pagination text-center ${currentPage === totalPages ? "disabled" : ""}`}
            onClick={handleNext}
        >
            Next
        </div>
    );

    return pages;
};


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
                        <th>No.</th>
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
                          <span className='ds_role_icon ds_cursor' onClick={()=> setSubRemove(true)}>
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
                          <span className='ds_sub_eye ds_cursor me-2' onClick={()=> setSubDes(true)}>
                              <img src={eye} alt=""  />
                          </span>
                          <span className='ds_role_icon ds_cursor me-2' onClick={()=> setSubEdit(true)}>
                            <img src={pen} alt=""  />
                          </span>
                          <span className='ds_role_icon ds_cursor' onClick={()=> setSubRemove(true)}>
                            <img src={trash} alt="" />
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
               </div>
          </div>
          <div className="py-3 d-flex justify-content-center justify-content-md-end px-5">
                    {renderPagination()}
          </div>
       </div>

       {/* ******************* Add Modal ************* */}
       <Modal show={subAdd} onHide={()=> setSubAdd(false)}  size="lg" aria-labelledby="contained-modal-title-vcenter ps-0" className='text-light ds_sub_add_modal' centered>
            <Modal.Header className='border-0 pb-0 w-100'>
              <Modal.Title id="contained-modal-title-vcenter" className='w-100'>
                  <div className='d-flex justify-content-between align-items-center w-100'>
                    <div>
                       Add Subscription
                    </div>
                    <i className="fa-solid fa-xmark ds_cursor" onClick={()=> setSubAdd(false)}></i>
                  </div>
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
                            <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Scratch Price</label>
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
                            <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Status</label>
                            <div className='select-wrapper position-relative'>
                               <div className='ds_sub_select ds_cursor' onClick={()=> setToggle(!toggle)}>{redioVal}</div>
                                 {toggle && (<div className='ds_sub_select_box'>
                                               <div className="form-check mb-3 ds_cursor" onClick={()=> {setRedioVal("Active"); setToggle(false)}}>
                                                   <input className="form-check-input ds_sub_check" type="radio" name="exampleRadios" id="exampleRadios1" value="Active" checked={redioVal === "Active" && subCheck ? true : false} />
                                                   <label className="form-check-label" htmlFor="exampleRadios1">
                                                      Active
                                                   </label>
                                                 </div>
                                                 <div className="form-check ds_cursor" onClick={()=> {setRedioVal("Block"); setToggle(false)}}>
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
            <Modal.Header className='border-0 pb-0 w-100'>
              <Modal.Title id="contained-modal-title-vcenter " className='w-100'>
                <div className='d-flex justify-content-between align-items-center w-100'>
                  <div>
                     Edit Subscription
                  </div>
                  <i className="fa-solid fa-xmark ds_cursor" onClick={()=> setSubEdit(false)}></i>
               </div>
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
                            <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Scratch Price</label>
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
        <Modal show={subDes} onHide={()=> setSubDes(false)} size="md" aria-labelledby="contained-modal-title-vcenter" className='text-light ds_sub_des_modal' centered>
          <Modal.Header className='border-0' >
            <Modal.Title id="contained-modal-title-vcenter" className='w-100'>
               <div className='d-flex justify-content-between align-items-center w-100'>
                  <div>
                     Subscription Details
                  </div>
                  <i className="fa-solid fa-xmark ds_cursor" onClick={()=> setSubDes(false)}></i>
               </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                  <div>
                    <p className='d-flex justify-content-between'>
                      <span className='ds_role_text'>Name</span>
                      <span className='ds_role_text'>:</span>
                    </p>
                  </div>
                  <div>
                    <p className='d-flex justify-content-between'>
                      <span className='ds_role_text'>Discount</span>
                      <span className='ds_role_text'>:</span>
                    </p>
                  </div>
                  <div>
                    <p className='d-flex justify-content-between'>
                      <span className='ds_role_text'>Scratch price</span>
                      <span className='ds_role_text'>:</span>
                    </p>
                  </div>
                  <div>
                    <p className='d-flex justify-content-between'>
                      <span className='ds_role_text'>Price</span>
                      <span className='ds_role_text'>:</span>
                    </p>
                  </div>
                  <div>
                    <p className='d-flex justify-content-between'>
                      <span className='ds_role_text'>Status</span>
                      <span className='ds_role_text'>:</span>
                    </p>
                  </div>
                </div>

                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 p-0">
                  <div>
                    <h6 className='mt-1'>Admin</h6>
                    <h6 className='mt-3 pt-1'>50%</h6>
                    <h6 className='mt-3 pt-1'>₹99</h6>
                    <h6 className='mt-3 pt-2'>₹100</h6>
                    <h6 className='mt-3 pt-1'>Active</h6>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
       </Modal>

        {/* **************** Delete Role **************** */}
        <Modal show={subRemove} onHide={()=> setSubRemove(false)} size="md" aria-labelledby="contained-modal-title-vcenter " className='text-light ds_role_delete_modal' centered>
         <Modal.Body >
            <div className='text-center'>
               <h4 className='mt-4'>Delete</h4>
               <p className='ds_role_text'>Are you sure you want to delete Subscription ?</p>
               <div className='mt-5 mb-5'>
                 <button className='ds_delete_cancel' onClick={()=> setSubRemove(false)}>Cancel</button>
                 <button className='ds_delete_yes'>Yes</button>
               </div>
            </div>
         </Modal.Body>
       </Modal>
    </div>
  )
}

export default Subscription
