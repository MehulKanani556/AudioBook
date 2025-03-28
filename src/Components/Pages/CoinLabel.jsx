import React, { useState } from 'react'
import '../../CSS/CoinLabel.css'
import { Link } from 'react-router-dom'
import pen from '../../Images/dhruvin/pancil.svg'
import trash from '../../Images/dhruvin/trash.svg'
import { Modal } from 'react-bootstrap'

const CoinLabel = () => {

const [coinAdd, setCoinAdd] = useState(false)
const [coinEdit, setCoinEdit] = useState(false)
const [coinDelete, setCoinDelete] = useState(false)

  return (
    <div className='ds_dash_master'>
      <div className='ds_dash_main'>
        <div className="ds_dash_inner">
            <div className='d-flex justify-content-between align-items-center'>
                    <div>
                       <h4 className="text-light pt-4 mb-0">Coin Label</h4>
                       <p><Link to="/layout/dashboard" className='ds_head_txt ds_role_link text-decoration-none'>Dashboard /</Link> <span className='text-light'>Coin Label</span></p>
                    </div>
                   <div>
                     <button className='ds_role_btn' onClick={()=> setCoinAdd(true)}><i className="fa-solid fa-plus me-2"></i> Add</button>
                   </div>
            </div>

            <div className='ds_role_bg mt-2'>
                <div className='ds_table_wrapper overflow-auto'>
                  <table className='w-100 text-light ds_role_table '>
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Label</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>01</td>
                        <td>Label Name</td>
                        <td>
                          <span className='ds_role_icon ds_cursor me-2' onClick={()=> setCoinEdit(true)}>
                            <img src={pen} alt=""  />
                          </span>
                          <span className='ds_role_icon ds_cursor' onClick={()=> setCoinDelete(true)}>
                            <img src={trash} alt="" />
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
               </div>

        </div>

        {/* **************** Add Coin **************** */}
      <Modal show={coinAdd} onHide={()=> setCoinAdd(false)} size="lg" aria-labelledby="contained-modal-title-vcenter " className='text-light ds_role_modal_main ' centered>
         <Modal.Header className='border-0 ds_role_modal w-100' >
           <Modal.Title id="contained-modal-title-vcenter" className='w-100'>
               <div className='d-flex justify-content-between align-items-center w-100'>
                  <div>
                     Add Coin Label
                  </div>
                  <i className="fa-solid fa-xmark ds_cursor" onClick={()=> setCoinAdd(false)}></i>
                </div>
           </Modal.Title>
         </Modal.Header>
         <Modal.Body >
            <div>
              <div>
                 <label for="exampleInputEmail1" class="form-label ds_role_text">Label</label>
                 <input type="email" class="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
              </div>
              <div className='mt-5 mb-3'>
                <div className='text-center'>
                   <button className='ds_role_save'>Save</button>
                   <button className='ds_role_cancel' onClick={()=> setCoinAdd(false)}>Cancel</button>
                </div>
              </div>
            </div>
         </Modal.Body>
      </Modal>

      {/* **************** Edit Coin **************** */}
      <Modal show={coinEdit} onHide={()=> setCoinEdit(false)} size="lg" aria-labelledby="contained-modal-title-vcenter " className='text-light ds_role_modal_main ' centered>
         <Modal.Header className='border-0 ds_role_modal w-100' >
           <Modal.Title id="contained-modal-title-vcenter" className='w-100'>
               <div className='d-flex justify-content-between align-items-center w-100'>
                  <div>
                     Edit Coin Label
                  </div>
                  <i className="fa-solid fa-xmark ds_cursor" onClick={()=> setCoinEdit(false)}></i>
                </div>
           </Modal.Title>
         </Modal.Header>
         <Modal.Body >
            <div>
              <div>
                 <label for="exampleInputEmail1" class="form-label ds_role_text">Label</label>
                 <input type="email" class="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
              </div>
              <div className='mt-5 mb-3'>
                <div className='text-center'>
                   <button className='ds_role_save'>Save</button>
                   <button className='ds_role_cancel' onClick={()=> setCoinEdit(false)}>Cancel</button>
                </div>
              </div>
            </div>
         </Modal.Body>
      </Modal>

      {/* **************** Delete Coin **************** */}
      <Modal show={coinDelete} onHide={()=> setCoinDelete(false)} size="md" aria-labelledby="contained-modal-title-vcenter " className='text-light ds_role_delete_modal' centered>
         <Modal.Body >
            <div className='text-center'>
               <h4 className='mt-4'>Delete</h4>
               <p className='ds_role_text'>Are you sure you want to delete Coin Label?</p>
               <div className='mt-5 mb-5'>
                 <button className='ds_delete_cancel' onClick={()=> setCoinDelete(false)}>Cancel</button>
                 <button className='ds_delete_yes'>Yes</button>
               </div>
            </div>
         </Modal.Body>
       </Modal>
      </div>
    </div>
  )
}

export default CoinLabel
