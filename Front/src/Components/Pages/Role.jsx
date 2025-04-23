import React, { useEffect, useState } from 'react'
import '../../CSS/Role.css'
import { Link } from 'react-router-dom'
import pen from '../../Images/dhruvin/pancil.svg'
import trash from '../../Images/dhruvin/trash.svg'
import { Modal } from 'react-bootstrap'

const Role = () => {
  const totalPages = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [add, setAdd] = useState(false)
    const [edit, setEdit] = useState(false)
    const [remove, setRemove] = useState(false)
    const [local, setLocal] = useState(false)

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

    useEffect(()=>{
       if(local){
         localStorage.setItem("activeMenu" , "dashboard")
        }
    },[local])
    


  return (
    <div className='ds_dash_master'>
      <div className='ds_dash_main'>
         <div className='ds_dash_inner'>
             <div className='d-flex justify-content-between align-items-center'>
                <div>
                   <h4 className="text-light pt-4 mb-0">Role</h4>
                   <p><Link to="/layout/dashboard" onClick={()=>{setLocal(true)}}  className='ds_head_txt ds_role_link text-decoration-none'>Dashboard /</Link> <span className='text-light'>Role</span></p>
                </div>
                <div>
                  <button className='ds_role_btn' onClick={()=> setAdd(true)}><i className="fa-solid fa-plus me-2"></i> Add</button>
                </div>
             </div>

             <div className='ds_role_bg mt-2'>
                <div className='ds_table_wrapper overflow-auto'>
                  <table className='w-100 text-light ds_role_table '>
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>01</td>
                        <td>Admin</td>
                        <td>
                          <span className='ds_role_icon ds_cursor me-2' onClick={()=> setEdit(true)}>
                            <img src={pen} alt=""  />
                          </span>
                          <span className='ds_role_icon ds_cursor' onClick={()=> setRemove(true)}>
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

      {/* **************** Add Role **************** */}
      <Modal show={add} onHide={()=> setAdd(false)} size="lg" aria-labelledby="contained-modal-title-vcenter " className='text-light ds_role_modal_main ' centered>
      <Modal.Header className='border-0 ds_role_modal w-100' >
        <Modal.Title id="contained-modal-title-vcenter" className='w-100'>
            <div className='d-flex justify-content-between align-items-center w-100'>
               <div>
                  Add Role
               </div>
               <i className="fa-solid fa-xmark ds_cursor" onClick={()=> setAdd(false)}></i>
             </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
         <div>
           <div>
              <label for="exampleInputEmail1" class="form-label ds_role_text">Role</label>
              <input type="email" class="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
           </div>
           <div className='mt-5 mb-3'>
             <div className='text-center'>
                <button className='ds_role_save'>Save</button>
                <button className='ds_sub_cancel' onClick={()=> setAdd(false)}>Clear</button>
             </div>
           </div>
         </div>
      </Modal.Body>
      </Modal>


      {/* **************** Edit Role **************** */}
    <Modal show={edit} onHide={()=> setEdit(false)} size="lg" aria-labelledby="contained-modal-title-vcenter " className='text-light ds_role_modal_main' centered>
      <Modal.Header className='border-0 ds_role_modal w-100' >
        <Modal.Title id="contained-modal-title-vcenter" className='w-100'>
            <div className='d-flex justify-content-between align-items-center w-100'>
               <div>
                  Edit Role
               </div>
               <i className="fa-solid fa-xmark ds_cursor" onClick={()=> setEdit(false)}></i>
            </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
         <div>
           <div>
              <label for="exampleInputEmail1" class="form-label ds_role_text">Role</label>
              <input type="email" class="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
           </div>
           <div className='mt-5 mb-3'>
             <div className='text-center'>
                <button className='ds_role_save'>Save</button>
                <button className='ds_sub_cancel' onClick={()=> setEdit(false)}>Clear</button>
             </div>
           </div>
         </div>
      </Modal.Body>
    </Modal>

      {/* **************** Delete Role **************** */}
     <Modal show={remove} onHide={()=> setRemove(false)} size="md" aria-labelledby="contained-modal-title-vcenter " className='text-light ds_role_delete_modal' centered>
      <Modal.Body >
         <div className='text-center'>
            <h4 className='mt-4'>Delete</h4>
            <p className='ds_role_text'>Are you sure you want to delete Role?</p>
            <div className='mt-5 mb-5'>
              <button className='ds_delete_cancel' onClick={()=> setRemove(false)}>Cancel</button>
              <button className='ds_delete_yes'>Yes</button>
            </div>
         </div>
      </Modal.Body>
    </Modal>
    </div>
  )
}

export default Role
