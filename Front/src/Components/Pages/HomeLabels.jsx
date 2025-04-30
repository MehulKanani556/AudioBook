import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import pen from '../../Images/dhruvin/pancil.svg'
import trash from '../../Images/dhruvin/trash.svg'
import eye from '../../Images/dhruvin/eye_icon.svg'
import { Button, Modal } from 'react-bootstrap'
import "../../CSS/Review.css"
import Close from "../../Images/Parth/close_button.png"
import { useDispatch, useSelector } from 'react-redux'
import { CreateHomeLabel, DeleteHomeLabel, EditHomeLabel, HomeLabelData } from '../../Toolkit/Slices/HomeLabelsSlice'
import { useFormik } from 'formik'
import { CreateHomeLableSchema } from '../Formik'
import { EditCoinLabel } from '../../Toolkit/Slices/CoinLabelSlice'

const HomeLabels = () => {
    const [addHomeLabelsModal, setAddHomeLabelsModal] = useState(false);
    const [editHomeLabelsModal, setEditHomeLabelsModal] = useState(false);
    const [removeHomeLabels, setRemoveHomeLabels] = useState(false);
    let itemPerPage = 10;
    const dispatch = useDispatch()
    const homeLabelMap = useSelector(state => state?.homeLabel?.homeLabelData)
    const [editObj, setEditObj] = useState({})

    useEffect(()=>{
       dispatch(HomeLabelData())
    },[])
   
    let totalPages = Math.ceil(homeLabelMap?.length / itemPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData,setCurrentData] = useState([]);
    const [deleteId, setDeleteId] = useState(null)

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemPerPage;
        const endIndex = startIndex + itemPerPage;
        const paginatedData = homeLabelMap?.slice(startIndex, endIndex);
        setCurrentData(paginatedData);
    }, [currentPage, homeLabelMap]);

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

    const CreateHomeLabelFormik = useFormik({
        initialValues:{
            labelName:""
        },
        validationSchema:CreateHomeLableSchema,
        onSubmit:(values , action)=>{
            dispatch(CreateHomeLabel(values))
            setAddHomeLabelsModal(false)
            action.resetForm()
        }
    })

    const editHomeLabelVal = {
        labelName:editObj?.labelName
    }
    const EditHomeLabelFormik = useFormik({
        enableReinitialize: true,
        initialValues:editHomeLabelVal,
        validationSchema:CreateHomeLableSchema,
        onSubmit:(values , action)=>{
            dispatch(EditHomeLabel({values , editObj}))
            setEditHomeLabelsModal(false)
            action.resetForm()
        }
    })

    const handleDelete = () => {
        dispatch(DeleteHomeLabel(deleteId))
        setRemoveHomeLabels(false)
    }

    return (
        <div className="ds_dash_master">
            <div className='ds_dash_main'>
                <div className='ds_dash_inner'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <h4 className="text-light pt-4 mb-0">Home Labels</h4>
                            <p><Link to="/admin/dashboard" className='ds_head_txt ds_role_link text-decoration-none'>Dashboard /</Link> <span className='text-light'>Home Labels</span></p>
                        </div>
                        <div>
                            <button className='V_review_btn' onClick={() => setAddHomeLabelsModal(true)}><i className="fa-solid fa-plus me-2"></i> Add</button>
                        </div>
                    </div>

                    <div className='V_review_bg mt-2'>
                        <div className='ds_user_master_scroll overflow-auto'>
                            <table className='w-100 text-light V_review_table  text-nowrap '>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData?.map((element , index)=>{
                                        return(
                                            <tr key={element?._id}>
                                               <td>{((currentPage - 1) * 10) +( index + 1 )}</td>
                                               <td>{element?.labelName}</td>
                                               <td className=''>
                                               <span className='ds_role_icon ds_cursor me-2' onClick={() => {setEditHomeLabelsModal(true); setEditObj(element)}} >
                                                       <img src={pen} alt="" />
                                                   </span>
                                                   <span className='ds_role_icon ds_cursor' onClick={() => {setRemoveHomeLabels(true) ; setDeleteId(element?._id)}} >
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

                <div className="py-3 d-flex justify-content-center justify-content-md-end px-2 px-md-5">
                    {renderPagination()}
                </div>
            </div>



            {/* ==========     Add Home Labels    ========== */}
            <div className=''>
                <Modal show={addHomeLabelsModal} onHide={() => setAddHomeLabelsModal(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" className='text-white V_modal_width' centered>
                    <Modal.Header className='V_modal_header'>
                        <Modal.Title id="contained-modal-title-vcenter" className='px-lg-5 w-100' >
                            <div className="d-flex justify-content-between ">
                                <div>
                                    Add Home Labels
                                </div>
                                <div className='ms-auto ds_cursor' onClick={() => setAddHomeLabelsModal(false)}>
                                    <img src={Close} alt="" />
                                </div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={CreateHomeLabelFormik.handleSubmit}>
                          <div className="row py-md-3  px-lg-5 ">
                              <div className="col-12   pt-2 pt-md-3">
                                  <label className='V_label'>Name</label>
                                  <input type="text" name='labelName' value={CreateHomeLabelFormik.values.labelName} onChange={CreateHomeLabelFormik.handleChange} onBlur={CreateHomeLabelFormik.handleBlur} className='V_input_text_for_all mt-1 mt-md-2' />
                                  <p className='text-danger mb-0 text-start ps-1 pt-1' style={{fontSize:"14px"}}>{CreateHomeLabelFormik.errors.labelName}</p>
                              </div>
                          </div>
                          <div className='V_modal_header mx-auto pb-4 pt-4'>
                            <div className="d-flex justify-content-center">
                              <button type='submit' className='ds_role_save'>Save</button>
                              <button className='ds_sub_cancel' onClick={() => setAddHomeLabelsModal(false)}>Clear</button>
                             </div>
                          </div>
                        </form>                  
                    </Modal.Body>
                    
                </Modal>
            </div>


            {/* ==========    Edit Home Labels     ========== */}
            <div className=''>
                <Modal show={editHomeLabelsModal} onHide={() => setEditHomeLabelsModal(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" className='text-white V_modal_width' centered>
                    <Modal.Header className='V_modal_header'>
                        <Modal.Title id="contained-modal-title-vcenter" className='px-lg-5 w-100' >
                            <div className="d-flex justify-content-between ">
                                <div>
                                    Edit Home Labels
                                </div>
                                <div className='ms-auto' onClick={() => setEditHomeLabelsModal(false)}>
                                    <img src={Close} alt="" />
                                </div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={EditHomeLabelFormik.handleSubmit}>
                           <div className="row py-md-3  px-lg-5 ">
                               <div className="col-12   pt-2 pt-md-3">
                                   <label className='V_label'>Name</label>
                                   <input type="text" name='labelName' value={EditHomeLabelFormik.values.labelName} onChange={EditHomeLabelFormik.handleChange} onBlur={EditHomeLabelFormik.handleBlur} className='V_input_text_for_all mt-1 mt-md-2' />
                                   <p className='text-danger mb-0 text-start ps-1 pt-1' style={{fontSize:"14px"}}>{EditHomeLabelFormik.errors.labelName}</p>
                               </div>
                           </div>
                           <div className='V_modal_header mx-auto pb-4 pt-4'>
                             <div className="d-flex justify-content-center">
                               <button type='submit' className='ds_role_save'>Save</button>
                               <button type='button' className='ds_sub_cancel' onClick={() => setEditHomeLabelsModal(false)}>Clear</button>
                              </div>
                           </div>
                        </form>  
                    </Modal.Body>
                </Modal>
            </div>



            {/* -================= Delete Home Label Join Modal ==================*/}
            <Modal show={removeHomeLabels} onHide={() => setRemoveHomeLabels(false)} size="md" aria-labelledby="contained-modal-title-vcenter " className='text-light ds_role_delete_modal' centered>
                <Modal.Body >
                    <div className='text-center'>
                        <h4 className='mt-4'>Delete</h4>
                        <p className='ds_role_text'>Are you sure you want to delete Home Labels?</p>
                        <div className='mt-5 mb-5'>
                            <button className='ds_delete_cancel' onClick={() => setRemoveHomeLabels(false)}>Cancel</button>
                            <button className='ds_delete_yes' onClick={handleDelete}>Yes</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default HomeLabels
