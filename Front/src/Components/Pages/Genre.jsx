import React, { useEffect, useState } from 'react'
import { Link , } from 'react-router-dom'
import pen from '../../Images/dhruvin/pancil.svg'
import trash from '../../Images/dhruvin/trash.svg'
import eye from '../../Images/dhruvin/eye_icon.svg'
import { Button, Modal } from 'react-bootstrap'
import "../../CSS/Review.css"
import Close from "../../Images/Parth/close_button.png"
import { useDispatch, useSelector } from 'react-redux'
import { CreateGenreData, DeleteGenreData, EditGenreData, GenreData } from '../../Toolkit/Slices/GenreSlice'
import { useFormik } from 'formik'
import { CreateGenreSchema, CreateLableSchema } from '../Formik'


const Genre = () => {

    let itemPerPage = 10;
    const [addGenreModal, setAddGenreModal] = useState(false);
    const [editGenre, setEditGenre] = useState(false);
    const [removeGenre, setRemoveGenre] = useState(false);
    const [fileName, setFileName] = useState("No file chosen");
    const dispatch = useDispatch()
    const genreGet = useSelector((state)=> state?.genre?.genreData)
    // console.log("hihihihiih" , genreGet?.genre?.genreData);
    const [currentData,setCurrentData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [file, setFile] = useState(null);
    const [editObj, setEditObj] = useState({})
    const [deleteId, setDeleteId] = useState(null)
    
    useEffect(()=>{
      dispatch(GenreData())
    },[])

    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     setFileName(file ? file.name : "No file chosen");
    // };

    let totalPages = Math.ceil(genreGet?.length / itemPerPage);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemPerPage;
        const endIndex = startIndex + itemPerPage;
        const paginatedData = genreGet?.slice(startIndex, endIndex);
        setCurrentData(paginatedData);
      }, [currentPage, genreGet]);

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


    const CreateGenreFormik = useFormik({
        initialValues: {
          name: '',
        },
        validationSchema: CreateGenreSchema, 
        onSubmit: async (values, action) => {
          if (!file) {
            alert("Please choose an image file!");
            return;
          }
    
          dispatch(CreateGenreData({values , file}));
          action.resetForm();
          setFile(null);
          setFileName("No file chosen")
          setAddGenreModal(false)
        },
    });

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
          setFile(selectedFile);
          setFileName(selectedFile.name);
        }
    };

    const editVal = {
        name: editObj?.name, 
    }

    const EditGenreFormik = useFormik({
        enableReinitialize: true,
        initialValues:editVal,
        validationSchema: CreateGenreSchema, 
        onSubmit: async (values, { resetForm }) => {
          
            if (!file && !editObj?.generImage) {
                alert("Please choose an image file!");
                return;
            }
            let payload = {
                values,
                id: editObj?._id,
            };
        
            if (file) {
                payload.file = file; 
            } else {
                payload.oldImage = editObj?.generImage; 
            }
    
          dispatch(EditGenreData(payload));
          resetForm();
          setFile(null);
          setAddGenreModal(false)
          setEditGenre(false)
        },
    });

    const handleDelete = () => {
        dispatch(DeleteGenreData(deleteId))
        setRemoveGenre(false)
    }

    

    return (
        <div className="ds_dash_master">
            <div className='ds_dash_main'>
                <div className='ds_dash_inner'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <h4 className="text-light pt-4 mb-0">Genre</h4>
                            <p><Link to="/admin/dashboard" className='ds_head_txt ds_role_link text-decoration-none'>Dashboard /</Link> <span className='text-light'>Genre</span></p>
                        </div>
                        <div>
                            <button className='V_review_btn' onClick={() => setAddGenreModal(true)}><i className="fa-solid fa-plus me-2"></i> Add</button>
                        </div>
                    </div>

                    <div className='V_review_bg mt-2'>
                        <div className='ds_user_master_scroll overflow-auto'>
                            <table className='w-100 text-light V_review_table  text-nowrap '>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData?.map((element , index)=>{
                                        return(
                                            <tr key={element._id}>
                                               <td>{((currentPage - 1) * 10) +( index + 1 )}</td>
                                               <td>
                                                   <img src={`http://localhost:4000/${element?.generImage}`} alt="" className='V_home_corousel_image' />
                                               </td>
                                               <td>{element?.name || '-'}</td>
                                               <td className=''>
                                                   <span className='ds_role_icon ds_cursor me-2' onClick={() =>{ setEditGenre(true) ; setEditObj(element)}} >
                                                       <img src={pen} alt="" />
                                                   </span>
                                                   <span className='ds_role_icon ds_cursor' onClick={() =>{setRemoveGenre(true); setDeleteId(element?._id)}}>
                                                       <img src={trash} alt="" />
                                                   </span>
                                               </td>
                                            </tr>
                                        )
                                    })}
                                    {/* <tr>
                                        <td>02</td>
                                        <td>
                                            <img src={require("../../Images/Parth/homeCorouselImage.png")} alt="" className='V_home_corousel_image' />
                                        </td>
                                        <td>Johnwick</td>
                                        <td className=''>
                                            <span className='ds_role_icon ds_cursor me-2' onClick={() => setEditGenre(true)} >
                                                <img src={pen} alt="" />
                                            </span>
                                            <span className='ds_role_icon ds_cursor' onClick={() => setRemoveGenre(true)} >
                                                <img src={trash} alt="" />
                                            </span>
                                        </td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="py-3 d-flex justify-content-center justify-content-md-end px-5">
                    {renderPagination()}
                </div>
            </div>



            {/* ==========     Add Genre    ========== */}
            <div className=''>
                <Modal
                    show={addGenreModal}
                    onHide={() => setAddGenreModal(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    className='text-white V_modal_width'
                    centered>
                    <Modal.Header className='V_modal_header'>
                        <Modal.Title id="contained-modal-title-vcenter" className='px-lg-5 w-100' >
                            <div className="d-flex justify-content-between ">
                                <div>
                                    Add Genre
                                </div>
                                <div className='ms-auto ds_cursor' onClick={() => setAddGenreModal(false)}>
                                    <img src={Close} alt="" />
                                </div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form onSubmit={CreateGenreFormik.handleSubmit}>
                          <div className="row py-md-3 px-lg-5">
                            {/* File Input */}
                            <div className="col-12 col-sm-6 pt-2 pt-md-3">
                              <label className='V_label'>Image</label>
                              <div className="custom-input-group">
                                <input type="text" className="custom-text" placeholder="" value={fileName} readOnly  />
                                <label htmlFor="fileInput" className="custom-button">CHOOSE</label>
                                <input type="file" id="fileInput" className="custom-file-input" onChange={handleFileChange}/>
                              </div>
                            </div>
                    
                            {/* Name Input */}
                            <div className="col-12 col-sm-6 pt-2 pt-md-3">
                              <label className='V_label'>Name</label>
                              <input type="text" name='name' value={CreateGenreFormik.values.name} onChange={CreateGenreFormik.handleChange} onBlur={CreateGenreFormik.handleBlur} className='V_input_text_for_all'/>
                              {CreateGenreFormik.touched.name && CreateGenreFormik.errors.name ? (
                                <div style={{ color: 'red', fontSize: '12px' }}>
                                  {CreateGenreFormik.errors.name}
                                </div>
                              ) : null}
                            </div>
                          </div>
                    
                          {/* Buttons */}
                          <div className='V_modal_header mx-auto pb-4 pt-5'>
                            <div className="d-flex justify-content-center">
                              <button type='submit' className='ds_role_save'>Save</button>
                              <button type='button' className='ds_sub_cancel' onClick={() => {   setAddGenreModal(false);   setFileName("No file chosen");   setFile(null);   CreateGenreFormik.resetForm(); }}>
                                Clear
                              </button>
                            </div>
                          </div>
                    </form>
                    </Modal.Body>
                   
                </Modal>
            </div>


            {/* ==========    Edit Genre     ========== */}
            <div className=''>
                <Modal
                    show={editGenre}
                    onHide={() => setEditGenre(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    className='text-white V_modal_width'
                    centered>
                    <Modal.Header className='V_modal_header'>
                        <Modal.Title id="contained-modal-title-vcenter" className='px-lg-5 w-100' >
                            <div className="d-flex justify-content-between ">
                                <div>
                                    Edit Genre
                                </div>
                                <div className='ms-auto ds_cursor' onClick={() => setEditGenre(false)}>
                                    <img src={Close} alt="" />
                                </div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                       <form onSubmit={EditGenreFormik.handleSubmit}>
                          <div className="row py-md-3  px-lg-5 ">
                              <div className="col-12 col-sm-6   pt-2 pt-md-3">
                                  <label className='V_label'>Image</label>
                                  <div className="custom-input-group">
                                      {/* {console.log("file" , fileName)} */}
                                      <input type="text" className="custom-text" placeholder="" value={fileName !== "No file chosen"   ? fileName : editObj?.generImage?.replace(/\\/g, "/")?.split("/")?.pop()} readonly />
                                      <label htmlFor="fileInput" className="custom-button">CHOOSE</label>
                                      <input type="file" id="fileInput" className="custom-file-input " onChange={handleFileChange} />
                                  </div>
                              </div>
                              <div className="col-12 col-sm-6  pt-2 pt-md-3">
                                  <label className='V_label'>Name</label>
                                  <input type="text" name='name' value={EditGenreFormik.values.name} onChange={EditGenreFormik.handleChange} onBlur={EditGenreFormik.handleBlur} className='V_input_text_for_all ' />
                                  {EditGenreFormik.touched.name && EditGenreFormik.errors.name ? (
                                     <div style={{ color: 'red', fontSize: '12px' }}>
                                        {EditGenreFormik.errors.name}
                                     </div>) : null}
                              </div>
                              <div className='V_modal_header mx-auto pb-4 pt-5'>
                               <div className="d-flex justify-content-center">
                                  <button type='submit' className='ds_role_save'>Save</button>
                                  <button type='button' className='ds_sub_cancel' onClick={() => {setEditGenre(false); }}>Clear</button>
                                </div>
                              </div>
                          </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>



            {/* -================= Delete Genre Modal ==================*/}
            <Modal show={removeGenre} onHide={() => setRemoveGenre(false)} size="md" aria-labelledby="contained-modal-title-vcenter " className='text-light ds_role_delete_modal' centered>

                <Modal.Body >
                    <div className='text-center'>
                        <h4 className='mt-4'>Delete</h4>
                        <p className='ds_role_text'>Are you sure you want to delete Genre?</p>
                        <div className='mt-5 mb-5'>
                            <button className='ds_delete_cancel' onClick={() => setRemoveGenre(false)}>Cancel</button>
                            <button className='ds_delete_yes' onClick={handleDelete}>Yes</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Genre