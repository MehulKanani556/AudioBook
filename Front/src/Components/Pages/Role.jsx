import React, { useEffect, useState } from 'react'
import '../../CSS/Role.css'
import { Link } from 'react-router-dom'
import pen from '../../Images/dhruvin/pancil.svg'
import trash from '../../Images/dhruvin/trash.svg'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addRole, deleteRole, getRole, updateRole } from '../../Toolkit/Slices/RoleSlice'
import { roleSchema } from '../Formik'
import { useFormik } from 'formik'

const Role = () => {
  // var totalPages = 10;
  var itemPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [add, setAdd] = useState(false)
  const [edit, setEdit] = useState(false)
  const [remove, setRemove] = useState(false)
  const [local, setLocal] = useState(false)
  const [deleteId, setDeleteId] = useState('');
  const [updateId, setUpdateId] = useState();
  const [currentData,setCurrentData] = useState([]);

  const searchID = useSelector((state)=>state?.firstDashboardData?.searchID)
  console.log(searchID)
  // back collection code is here
  const dispatch = useDispatch();
  // const [roleData,setRoleData] = useState([]);
  const roleData = useSelector((state) => state.role.role);
  var totalPages = Math.ceil(roleData.length / itemPerPage);
  // console.log('role', roles);
  // setRoleData(roles)
  useEffect(() => {
    dispatch(getRole())
  }, [])

  // formik handling here

  const roleVal = {
    role: "",
  };

  const roleValFormik = useFormik({
    initialValues: roleVal,
    validationSchema: roleSchema,
    onSubmit: (values,{ resetForm }) => {
      console.log(values)
      dispatch(addRole(values.role)).then((response)=>{
        console.log(response)
        if(response.payload.success){
          setAdd(false);
          dispatch(getRole());
          resetForm();
        }
      })
    }
  })

  const handleDelete=()=>{
    dispatch(deleteRole(deleteId)).then((response)=>{
      console.log(response);
      if(response.payload.success)
        {
          setRemove(false);
          dispatch(getRole());
        }})
  }

  const getUpdateData = (ele) =>{
    roleValFormik.setValues({role:ele.roleName});
    setUpdateId(ele._id)
  }
  const handleCloseEditModal= () =>{
    setEdit(false) ; 
    roleValFormik.setValues({role:''}) ;
    roleValFormik.setErrors({});
    roleValFormik.setTouched({});
    

  }
  const handleUpdate=()=>{
    dispatch(updateRole({
      role: roleValFormik.values.role,
      id: updateId
    })).then((response)=>{
      console.log(response);
      if(response.payload.success){
        // alert('');
        setEdit(false); 
        roleValFormik.setValues({role:''}) ;
        roleValFormik.setErrors({});
        roleValFormik.setTouched({});
        dispatch(getRole())
      }
      else{
        alert('something gone wrong ! try again.')
    }
    });
  }

  
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    const paginatedData = roleData.slice(startIndex, endIndex);
    setCurrentData(paginatedData);
  }, [currentPage, roleData]);

 

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
    // const startIndex = (currentPage - 1) * itemPerPage;
    // const endIndex = startIndex + itemPerPage;
    // const paginatedData = roleData.slice(startIndex, endIndex);
    // console.log(paginatedData);
    // setCurrentData(paginatedData);
    return pages;
  };

  useEffect(() => {
    if (local) {
      localStorage.setItem("activeMenu", "dashboard")
    }
  }, [local])

  
  return (
    <div className='ds_dash_master'>
      <div className='ds_dash_main'>
        <div className='ds_dash_inner'>
          <div className='d-flex justify-content-between align-items-center'>
            <div>
              <h4 className="text-light pt-4 mb-0">Role</h4>
              <p><Link to="/layout/dashboard" onClick={() => { setLocal(true) }} className='ds_head_txt ds_role_link text-decoration-none'>Dashboard /</Link> <span className='text-light'>Role</span></p>
            </div>
            <div>
              <button className='ds_role_btn' onClick={() => setAdd(true)}><i className="fa-solid fa-plus me-2"></i> Add</button>
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
                  {currentData.map((ele, ind) => {
                    return (
                      <tr>
                        <td>{((currentPage - 1) * 10) +( ind + 1 )}</td>
                        <td className='text-capitalize'>{ele.roleName}</td>
                        <td>
                          <span className='ds_role_icon ds_cursor me-2' onClick={() => {setEdit(true);getUpdateData(ele)}}>
                            <img src={pen} alt="" />
                          </span>
                          <span className='ds_role_icon ds_cursor' onClick={() => {setRemove(true); setDeleteId(ele._id)}}>
                            <img src={trash} alt="" />
                          </span>
                        </td>
                      </tr>
                    )
                  })}
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
      <Modal show={add} onHide={() => setAdd(false)} size="lg" aria-labelledby="contained-modal-title-vcenter " className='text-light ds_role_modal_main ' centered>
        <Modal.Header className='border-0 ds_role_modal w-100' >
          <Modal.Title id="contained-modal-title-vcenter" className='w-100'>
            <div className='d-flex justify-content-between align-items-center w-100'>
              <div>
                Add Role
              </div>
              <i className="fa-solid fa-xmark ds_cursor" onClick={() => setAdd(false)}></i>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <form onSubmit={roleValFormik.handleSubmit}>
            <div>
              <label for="exampleInputEmail1" class="form-label ds_role_text">Role</label>
              <input
                type="text"
                name="role" // important for Formik
                value={roleValFormik.values.role}
                onChange={roleValFormik.handleChange}
                onBlur={roleValFormik.handleBlur}
                className="form-control ds_role_input"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <p className='text-danger mb-0 text-start ps-1 pt-1 text-capitalize' style={{ fontSize: "14px" }}>{roleValFormik.errors.role}</p>
            </div>
            <div className='mt-5 mb-3'>
              <div className='text-center'>
                <button type='submit' className='ds_role_save' >Save</button>
                <button className='ds_sub_cancel' onClick={() => setAdd(false)}>Clear</button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>


      {/* **************** Edit Role **************** */}
      <Modal show={edit} onHide={() => {handleCloseEditModal()}} size="lg" aria-labelledby="contained-modal-title-vcenter " className='text-light ds_role_modal_main' centered>
        <Modal.Header className='border-0 ds_role_modal w-100' >
          <Modal.Title id="contained-modal-title-vcenter" className='w-100'>
            <div className='d-flex justify-content-between align-items-center w-100'>
              <div>
                Edit Role
              </div>
              <i className="fa-solid fa-xmark ds_cursor" onClick={() =>{handleCloseEditModal()}}></i>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div>
            <div>
              <label for="exampleInputEmail1" class="form-label ds_role_text">Role</label>
              <input
                type="text"
                name="role" // important for Formik
                value={roleValFormik.values.role}
                onChange={roleValFormik.handleChange}
                onBlur={roleValFormik.handleBlur}
                className="form-control ds_role_input"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <p className='text-danger mb-0 text-start ps-1 pt-1 text-capitalize' style={{ fontSize: "14px" }}>{roleValFormik.errors.role}</p>
            </div>
            <div className='mt-5 mb-3'>
              <div className='text-center'>
                <button className='ds_role_save' onClick={()=>{handleUpdate()}}>Save</button>
                <button className='ds_sub_cancel' onClick={() =>{handleCloseEditModal()}}>Clear</button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* **************** Delete Role **************** */}
      <Modal show={remove} onHide={() => setRemove(false)} size="md" aria-labelledby="contained-modal-title-vcenter " className='text-light ds_role_delete_modal' centered>
        <Modal.Body >
          <div className='text-center'>
            <h4 className='mt-4'>Delete</h4>
            <p className='ds_role_text'>Are you sure you want to delete Role?</p>
            <div className='mt-5 mb-5'>
              <button className='ds_delete_cancel' onClick={() => setRemove(false)}>Cancel</button>
              <button className='ds_delete_yes' onClick={()=>{handleDelete()}}>Yes</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Role
