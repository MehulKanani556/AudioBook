import React from 'react'
import '../../CSS/Role.css'
import { Link } from 'react-router-dom'
import pen from '../../Images/dhruvin/pancil.svg'
import trash from '../../Images/dhruvin/delete.svg'
import { Button, Modal } from 'react-bootstrap'

const Role = () => {
  return (
    <div>
      <div className='ds_dash_main'>
         <div className='ds_dash_inner'>
             <div className='d-flex justify-content-between align-items-center'>
                <div>
                   <h4 className="text-light pt-4 mb-0">Role</h4>
                   <p><Link to="/layout/dashboard" className='ds_head_txt text-decoration-none'>Dashboard /</Link> <span className='text-light'>Role</span></p>
                </div>
                <div>
                  <button className='ds_role_btn'><i className="fa-solid fa-plus me-2"></i> Add</button>
                </div>
             </div>

             <div className='ds_role_bg mt-2'>
                <div>
                  <table className='w-100 text-light ds_role_table'>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>01</td>
                        <td>Admin</td>
                        <td>
                          <span className='ds_role_icon ds_cursor me-2'>
                            <img src={pen} alt="" />
                          </span>
                          <span className='ds_role_icon ds_cursor'>
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

      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
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
      <Modal.Footer>
        <Button>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>
  )
}

export default Role
