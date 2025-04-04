import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../CSS/UserMaster.css'
import pen from '../../Images/dhruvin/pancil.svg'
import trash from '../../Images/dhruvin/trash.svg'
import eye from '../../Images/dhruvin/eye_icon.svg'
import person from '../../Images/dhruvin/user_img.png'
import { Modal } from 'react-bootstrap'
import bigimg from '../../Images/dhruvin/big_img.png'


const UserMaster = () => {

const navigate = useNavigate()
const totalPages = 10;
const [currentPage, setCurrentPage] = useState(1);
const [userDetail, setUserDetail] = useState(false)
const [userDelete, setUserDelete] = useState(false)

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
                           <h4 className="text-light pt-4 mb-0">User Master</h4>
                           <p><Link to="/layout/dashboard" className='ds_head_txt ds_role_link text-decoration-none'>Dashboard /</Link> <span className='text-light'>User Master</span></p>
                        </div>
                       <div>
                         <button className='ds_role_btn' onClick={()=> navigate("/layout/addusermaster")} ><i className="fa-solid fa-plus me-2"></i> Add</button>
                       </div>
              </div>

              <div className='ds_role_bg mt-2'>
                    <div className='ds_table_wrapper ds_user_master_scroll overflow-auto'>
                      <table className='w-100 text-light ds_user_master'>
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Image</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Password </th>
                            <th>Role ID</th>
                            <th>Bio</th>
                            <th>Age</th>
                            <th>Occupation</th>
                            <th>student_verification_status</th>
                            <th>student_ID_image</th>
                            <th>Coins</th>
                            <th>Language</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>01</td>
                            <td>
                                <img src={person} className='ds_user_master_img' alt="" />
                            </td>
                            <td>abc@gmail.com</td>
                            <td>8475695523</td>
                            <td>54789</td>
                            <td>123</td>
                            <td>dhfkwgfg</td>
                            <td>20</td>
                            <td>Student</td>
                            <td>
                                <span className='ds_user_master_pending'>Pending</span>
                            </td>
                            <td>20</td>
                            <td>₹99</td>
                            <td>English</td>
                            <td>
                               <span className='ds_sub_active'>Active</span>
                            </td>
                            <td>
                            <span className='ds_sub_eye ds_cursor me-2' onClick={()=> setUserDetail(true)} >
                                <img src={eye} alt=""  />
                            </span>
                              <span className='ds_role_icon ds_cursor me-2' onClick={()=> navigate("/layout/editusermaster")} >
                                <img src={pen} alt=""  />
                              </span>
                              <span className='ds_role_icon ds_cursor' onClick={()=> setUserDelete(true)} >
                                <img src={trash} alt="" />
                              </span>
                            </td>
                          </tr>
    
                          <tr>
                            <td>01</td>
                            <td>
                                <img src={person} className='ds_user_master_img' alt="" />
                            </td>
                            <td>abc@gmail.com</td>
                            <td>8475695523</td>
                            <td>54789</td>
                            <td>123</td>
                            <td>dhfkwgfg</td>
                            <td>20</td>
                            <td>Student</td>
                            <td>
                                <span className='ds_user_master_pending'>Pending</span>
                            </td>
                            <td>20</td>
                            <td>₹99</td>
                            <td>English</td>
                            <td>
                               <span className='ds_sub_active'>Active</span>
                            </td>
                            <td>
                            <span className='ds_sub_eye ds_cursor me-2' onClick={()=> setUserDetail(true)} >
                                <img src={eye} alt=""  />
                            </span>
                              <span className='ds_role_icon ds_cursor me-2' onClick={()=> navigate("/layout/editusermaster")} >
                                <img src={pen} alt=""  />
                              </span>
                              <span className='ds_role_icon ds_cursor' onClick={()=> setUserDelete(true)} >
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

       {/* ******************* User Master Details ************* */}
       <Modal show={userDetail} onHide={()=> setUserDetail(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" className='text-light ds_user_master_detail' centered>
          <Modal.Header className='border-0' >
            <Modal.Title id="contained-modal-title-vcenter" className='w-100'>
               <div className='d-flex justify-content-between align-items-center w-100'>
                  <div>
                    User Master Details
                  </div>
                  <i className="fa-solid fa-xmark ds_cursor" onClick={()=> setUserDetail(false)}></i>
               </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="row">
                 <div className="col-xl-3 col-lg-3 col-md-12 mb-lg-0 mb-4 text-lg-start text-center">
                    <div>
                       <img src={bigimg} alt="" className='ds_user_master_big' />
                    </div>
                 </div>

                 <div className="col-xl-9 col-lg-9 col-md-12">
                    <div className="row">
                        <div className="col-xl-6 col-lg-7 col-md-7 col-sm-7 col-7">
                          <div className='d-flex justify-content-between mb-2'>
                             <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>Email</h5>
                             <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                         </div>
                        </div>
                        <div className="col-xl-6 col-lg-5 col-md-5 col-sm-5 col-5">
                            <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >Coin Name</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-6 col-lg-7 col-md-7 col-sm-7 col-7">
                          <div className='d-flex justify-content-between mb-2'>
                             <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>Phone</h5>
                             <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                         </div>
                        </div>
                        <div className="col-xl-6 col-lg-5 col-md-5 col-sm-5 col-5">
                            <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >₹99</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-6 col-lg-7 col-md-7 col-sm-7 col-7">
                          <div className='d-flex justify-content-between mb-2'>
                             <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>Password</h5>
                             <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                         </div>
                        </div>
                        <div className="col-xl-6 col-lg-5 col-md-5 col-sm-5 col-5">
                            <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >Coin Name</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-6 col-lg-7 col-md-7 col-sm-7 col-7">
                          <div className='d-flex justify-content-between mb-2'>
                             <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>Role ID </h5>
                             <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                         </div>
                        </div>
                        <div className="col-xl-6 col-lg-5 col-md-5 col-sm-5 col-5">
                            <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >Label ID</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-6 col-lg-7 col-md-7 col-sm-7 col-7">
                          <div className='d-flex justify-content-between mb-2'>
                             <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>Bio</h5>
                             <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                         </div>
                        </div>
                        <div className="col-xl-6 col-lg-5 col-md-5 col-sm-5 col-5">
                            <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >03:31</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-6 col-lg-7 col-md-7 col-sm-7 col-7">
                          <div className='d-flex justify-content-between mb-2'>
                             <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>Age</h5>
                             <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                         </div>
                        </div>
                        <div className="col-xl-6 col-lg-5 col-md-5 col-sm-5 col-5">
                            <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >20</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-6 col-lg-7 col-md-7 col-sm-7 col-7">
                          <div className='d-flex justify-content-between mb-2'>
                             <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>Occupation</h5>
                             <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                         </div>
                        </div>
                        <div className="col-xl-6 col-lg-5 col-md-5 col-sm-5 col-5">
                            <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >Student</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-6 col-lg-7 col-md-7 col-sm-7 col-7">
                          <div className='d-flex justify-content-between mb-2'>
                             <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300" , wordBreak:"break-word"}}>Student_verification_status</h5>
                             <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                         </div>
                        </div>
                        <div className="col-xl-6 col-lg-5 col-md-5 col-sm-5 col-5">
                            <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >Pending</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-6 col-lg-7 col-md-7 col-sm-7 col-7">
                          <div className='d-flex justify-content-between mb-2'>
                             <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300" , wordBreak:"break-word"}}>Student_ID_image</h5>
                             <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                         </div>
                        </div>
                        <div className="col-xl-6 col-lg-5 col-md-5 col-sm-5 col-5">
                            <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >20</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-6 col-lg-7 col-md-7 col-sm-7 col-7">
                          <div className='d-flex justify-content-between mb-2'>
                             <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>Coins</h5>
                             <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                         </div>
                        </div>
                        <div className="col-xl-6 col-lg-5 col-md-5 col-sm-5 col-5">
                            <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >₹99</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-6 col-lg-7 col-md-7 col-sm-7 col-7">
                          <div className='d-flex justify-content-between mb-2'>
                             <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>Language</h5>
                             <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                         </div>
                        </div>
                        <div className="col-xl-6 col-lg-5 col-md-5 col-sm-5 col-5">
                            <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >English</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-6 col-lg-7 col-md-7 col-sm-7 col-7">
                          <div className='d-flex justify-content-between mb-2'>
                             <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300" }} >Status
                             </h5>
                             <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                         </div>
                        </div>
                        <div className="col-xl-6 col-lg-5 col-md-5 col-sm-5 col-5">
                            <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >Active</h5>
                        </div>
                    </div>
                    
                    {/* <div className="row">
                        <div className="col-xl-6">
                          <div className='d-flex justify-content-between mb-2'>
                             <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>Email</h5>
                             <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                         </div>
                        </div>
                        <div className="col-xl-6">
                            <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >Coin Name</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-6">
                          <div className='d-flex justify-content-between mb-2'>
                             <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>Email</h5>
                             <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                         </div>
                        </div>
                        <div className="col-xl-6">
                            <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >Coin Name</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-6">
                          <div className='d-flex justify-content-between mb-2'>
                             <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>Email</h5>
                             <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                         </div>
                        </div>
                        <div className="col-xl-6">
                            <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >Coin Name</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-6">
                          <div className='d-flex justify-content-between mb-2'>
                             <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>Email</h5>
                             <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                         </div>
                        </div>
                        <div className="col-xl-6">
                            <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >Coin Name</h5>
                        </div>
                    </div> */}
                 </div>
                 {/* <div className="col-xl-5 col-lg-5 col-md-6 col-sm-6 col-7">
                   
                   <div className='d-flex justify-content-between mb-2'>
                      <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>Phone</h5>
                      <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                   </div>
                   <div className='d-flex justify-content-between mb-2'>
                      <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>Password</h5>
                      <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                   </div>
                   <div className='d-flex justify-content-between mb-2'>
                      <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>Role ID </h5>
                      <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                   </div>
                   <div className='d-flex justify-content-between mb-2'>
                      <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>Bio</h5>
                      <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                   </div>
                   <div className='d-flex justify-content-between mb-2'>
                      <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>Age</h5>
                      <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                   </div>
                   <div className='d-flex justify-content-between mb-2'>
                      <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>Occupation</h5>
                      <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                   </div>
                   <div className='d-flex justify-content-between mb-2'>
                      <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300" , wordBreak:"break-word"}}>Student_verification_status</h5>
                      <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                   </div>
                   <div className='d-flex justify-content-between mb-2'>
                      <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>Student_ID_image</h5>
                      <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                   </div>
                   <div className='d-flex justify-content-between mb-2'>
                      <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>Coins</h5>
                      <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                   </div>
                   <div className='d-flex justify-content-between mb-2'>
                      <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>Language</h5>
                      <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                   </div>
                   <div className='d-flex justify-content-between mb-2'>
                      <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>Status</h5>
                      <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                   </div>
                 </div> */}
                 {/* <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-5">
                   <div>
                      <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >₹99</h5>
                      <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >Coin Name</h5>
                      <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >Label ID</h5>
                      <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >03:31</h5>
                      <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >20</h5>
                      <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >Student</h5>
                      <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >Pending</h5>
                      <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >20</h5>
                      <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >₹99</h5>
                      <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >English</h5>
                      <h5 className='text-light ds_coin_master_text' style={{fontWeight:"400"}} >Active</h5>
                   </div>
                 </div> */}
              </div>
            </div>
          </Modal.Body>
        </Modal>

          {/* **************** Delete Master Details **************** */}
          <Modal show={userDelete} onHide={()=> setUserDelete(false)} size="md" aria-labelledby="contained-modal-title-vcenter " className='text-light ds_role_delete_modal' centered>
         <Modal.Body >
            <div className='text-center'>
               <h4 className='mt-4'>Delete</h4>
               <p className='ds_role_text'>Are you sure you want to delete User Master ?</p>
               <div className='mt-5 mb-5'>
                 <button className='ds_delete_cancel' onClick={()=> setUserDelete(false)}>Cancel</button>
                 <button className='ds_delete_yes'>Yes</button>
               </div>
            </div>
         </Modal.Body>
       </Modal>
    </div>
  )
}

export default UserMaster
