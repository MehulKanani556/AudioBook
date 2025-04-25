import React, { useEffect, useState } from 'react'
import '../../CSS/CoinLabel.css'
import { Link } from 'react-router-dom'
import pen from '../../Images/dhruvin/pancil.svg'
import trash from '../../Images/dhruvin/trash.svg'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { CoinLabelData, CreateCoinLabel, DeleteCoinLabel, EditCoinLabel, SingleCoinLabel } from '../../Toolkit/Slices/CoinLabelSlice'
import { useFormik } from 'formik'
import { CreateLableSchema, EditLableSchema } from '../Formik'

const CoinLabel = () => {

let itemPerPage = 10;
const [coinAdd, setCoinAdd] = useState(false)
const [coinEdit, setCoinEdit] = useState(false)
const [coinDelete, setCoinDelete] = useState(false)
const [currentPage, setCurrentPage] = useState(1);
const allData =  useSelector((state)=> state?.coinLabel?.coinLaData)
const dispatch = useDispatch()
const singleData =  useSelector((state)=> state?.coinLabel?.singleData)
const [EditId, setEditId] = useState(null)
const [currentData,setCurrentData] = useState([]);


useEffect(()=>{
  dispatch(CoinLabelData())
},[])

let totalPages = Math.ceil(allData?.length / itemPerPage);

useEffect(() => {
  console.log("bbbbbbbbbb" , allData);
  
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const paginatedData = allData?.slice(startIndex, endIndex);
  setCurrentData(paginatedData);
}, [currentPage, allData]);

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

const labelNameVal = {
   labelNameVal:""
}
const CreateLableFormik = useFormik({
   initialValues:labelNameVal,
   validationSchema:CreateLableSchema,
   onSubmit:((value , action)=>{
      // console.log("ccccccccccc" , value);
      dispatch(CreateCoinLabel(value)).then((response)=>{
          if(response?.payload){
            setCoinAdd(false)
            dispatch(CoinLabelData())
          }  
          else{
            setCoinAdd(true)
          }  
      }) 
     action.resetForm()
   })
})

const editLabel = {
   editLabelName:singleData?.labelName || ""
}

const EditLabelFromik = useFormik({
  enableReinitialize: true,
  initialValues:editLabel,
  validationSchema:EditLableSchema,
  onSubmit:((values , action)=>{
     dispatch(EditCoinLabel({values , EditId})).then((response)=>{
         if(response?.payload){
           setCoinEdit(false)
           dispatch(CoinLabelData())
         }  
         else{
           setCoinEdit(true)
         }  
     }) 
    action.resetForm()
  })
})

const handleDeleteLabel = () => {
   dispatch(DeleteCoinLabel(EditId)).then((response)=>{
     setCoinDelete(false)
     dispatch(CoinLabelData())
  })
}

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
                      {currentData?.map((element , index)=>{
                        // console.log(element);
                        return(
                          <tr key={element?._id}>
                            <td>{((currentPage - 1) * 10) +( index + 1 )}</td>
                            <td>{element?.labelName}</td>
                            <td>
                              <span className='ds_role_icon ds_cursor me-2' onClick={()=> {setCoinEdit(true) ; dispatch(SingleCoinLabel(element._id)); setEditId(element._id)}}>
                                <img src={pen} alt=""  />
                              </span>
                              <span className='ds_role_icon ds_cursor' onClick={()=>{  setCoinDelete(true) ; setEditId(element._id)}}>
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
            <form onSubmit={CreateLableFormik.handleSubmit}>
              <div>
                 <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Label</label>
                 <input type="text" name='labelNameVal' value={CreateLableFormik.values.labelNameVal} onChange={CreateLableFormik.handleChange} onBlur={CreateLableFormik.handleBlur} className="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                 <p className='text-danger mb-0 text-start ps-1 pt-1' style={{fontSize:"14px"}}>{CreateLableFormik.errors.labelNameVal}</p>
              </div>
              <div className='mt-5 mb-3'>
                <div className='text-center'>
                   <button type='submit' className='ds_role_save'>Save</button>
                   <button className='ds_sub_cancel' onClick={()=> setCoinAdd(false)}>Clear</button>
                </div>
              </div>
            </form>
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
            <form onSubmit={EditLabelFromik.handleSubmit}>
              <div>
                 <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Label</label>
                 <input type="text" name='editLabelName' value={EditLabelFromik.values.editLabelName} onChange={EditLabelFromik.handleChange} onBlur={EditLabelFromik.handleBlur} className="form-control ds_role_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                 <p className='text-danger mb-0 text-start ps-1 pt-1' style={{fontSize:"14px"}}>{EditLabelFromik.errors.editLabelName}</p>
              </div>
              <div className='mt-5 mb-3'>
                <div className='text-center'>
                   <button type='submit' className='ds_role_save'>Save</button>
                   <button className='ds_sub_cancel' onClick={()=> setCoinEdit(false)}>Clear</button>
                </div>
              </div>
            </form>
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
                 <button className='ds_delete_yes' onClick={handleDeleteLabel}>Yes</button>
               </div>
            </div>
         </Modal.Body>
       </Modal>
      </div>
    </div>
  )
}

export default CoinLabel
