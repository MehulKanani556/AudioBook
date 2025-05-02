import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import pen from '../../Images/dhruvin/pancil.svg'
import trash from '../../Images/dhruvin/trash.svg'
import eye from '../../Images/dhruvin/eye_icon.svg'
import { Button, Modal } from 'react-bootstrap'
import "../../CSS/Review.css"
import Close from "../../Images/Parth/close_button.png"
import { useDispatch, useSelector } from 'react-redux'
import { CreateEpisode, DeleteEpisode, EditEpisode, EpisodeData } from '../../Toolkit/Slices/EpisodesSlice'
import { useFormik } from 'formik'
import { getAllAudioBookData } from '../../Toolkit/Slices/AudioBookSlice'
import { CreateEpisodeSchema } from '../Formik'

const Episodes = () => {
    const [addEpisodes, setAddEpisodes] = useState(false);
    const [editEpisodes, setEditEpisodes] = useState(false);
    const [viewEpisodes, setViewEpisodes] = useState(false);
    const [removeEpisodes, setRemoveEpisodes] = useState(false);
    const [fileName, setFileName] = useState("No file chosen");
    const [file, setFile] = useState("")
    const episodeMap = useSelector((state)=>state?.episode?.episodeData)
    const audioBookMap = useSelector((state)=>state?.audioBook?.audioBook)
    const dispatch = useDispatch()

    let itemPerPage = 10;
    let totalPages = Math.ceil(episodeMap?.length / itemPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData,setCurrentData] = useState([]);
    const [fileError, setFileError] = useState("");
    const [deleteId, setDeleteId] = useState(null)
    const [viewData, setViewData] = useState({})
    const [editObj, setEditObj] = useState({})
    const [editId, setEditId] = useState(null)


    useEffect(()=>{
        dispatch(EpisodeData())
    },[])

    useEffect(()=>{
        dispatch(getAllAudioBookData())
    },[])

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemPerPage;
        const endIndex = startIndex + itemPerPage;
        const paginatedData = episodeMap?.slice(startIndex, endIndex);
        setCurrentData(paginatedData);
      }, [currentPage, episodeMap]);
    
      const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const validAudioTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/x-wav', 'audio/x-m4a', 'audio/mp4'];
          if (!validAudioTypes.includes(file.type)) {
            setFileName("No file chosen");
            setFileError("Only audio files are allowed (e.g., .mp3, .wav)");
            return;
          }
          setFileName(file.name);
          setFile(file)
          setFileError("");
        } else {
          setFileName("No file chosen");
          setFileError("");
          setFile("")
        }
      }; 

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

    const createEpisodeVal = {
        name:"",
        audioBookId:"",
        premium:"",
        duration:""
    }
  
    const CreateEpisodeFormik = useFormik({
        initialValues:createEpisodeVal,
        validationSchema: CreateEpisodeSchema,
        onSubmit:(values ,action)=>{
           if(fileError === "" && file){
            //   console.log("jjjjjjj",values , file);
              dispatch(CreateEpisode({values , file}))
              setAddEpisodes(false)
              action.resetForm()
              setFileName("No file chosen")
              setFile("")
           }
           else{
            alert("Please Select Audio File")
           }
        }
    })

    const handleDelete = () => {
        if(deleteId){
            dispatch(DeleteEpisode(deleteId))
            setRemoveEpisodes(false) 
        }
    }

    const editEposideVal = {
        name:editObj?.name,
        audioBookId:editObj?.audioBookData?.length ? editObj?.audioBookData[0]._id : "",
        premium:editObj?.premium,
        duration:editObj?.duration
    }
    const EditEpisodeFormik = useFormik({
        enableReinitialize: true,
        initialValues:editEposideVal,
        validationSchema: CreateEpisodeSchema,
        onSubmit:(values)=>{
           if (!file && !editObj?.audioFile ) {
              alert("Please choose an audio file!");
            return;
           }
           else if(fileError){
            alert("Please choose an audio file!");
            return;
           }

          let payload = {
            values,
            id: editObj?._id,
           };
    
          if (file) {
            payload.file = file; 
          } else {
            payload.audioFile = editObj?.audioFile; 
          }

         dispatch(EditEpisode(payload));
         setEditEpisodes(false)
        }
    })

    return (
        <div className="ds_dash_master">
            <div className='ds_dash_main'>
                <div className='ds_dash_inner'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <h4 className="text-light pt-4 mb-0">Episodes</h4>
                            <p><Link to="/admin/dashboard" className='ds_head_txt ds_role_link text-decoration-none'>Dashboard /</Link> <span className='text-light'>Episodes</span></p>
                        </div>
                        <div>
                            <button className='V_review_btn' onClick={() => setAddEpisodes(true)}><i className="fa-solid fa-plus me-2"></i> Add</button>
                        </div>
                    </div>

                    <div className='V_review_bg mt-2'>
                        <div className='ds_user_master_scroll overflow-auto'>
                            <table className='w-100 text-light V_review_table  text-nowrap text-capitalize'>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Audio Book ID</th>
                                        <th>Premium</th>
                                        {/* <th>Coins Required</th> */}
                                        <th>Duration</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData?.map((element ,index)=>{
                                        console.log('hi' , element);
                                        return(
                                            <tr key={element?._id}>
                                               <td>{((currentPage - 1) * 10) +( index + 1 )}</td>
                                               <td>{element?.name || '-'}</td>
                                               <td>{element?.audioBookData[0]?.name || '-'}</td>
                                               <td>{element?.premium || '-'}</td>
                                               {/* <td>{element?.coinRequired}</td> */}
                                               <td>{element?.duration}</td>
                                               <td>
                                                   <span className='ds_sub_eye ds_cursor me-2' onClick={() => {setViewEpisodes(true) ; setViewData(element)}} >
                                                       <img src={eye} alt="" />
                                                   </span>
                                                   <span className='ds_role_icon ds_cursor me-2' onClick={() => {setEditEpisodes(true) ; setEditObj(element) ; setEditId(element?._id)}} >
                                                       <img src={pen} alt="" />
                                                   </span>
                                                   <span className='ds_role_icon ds_cursor' onClick={() => {setRemoveEpisodes(true) ; setDeleteId(element?._id)}} >
                                                       <img src={trash} alt="" />
                                                   </span>
                                               </td>
                                           </tr>
                                        )
                                    })}
                                    {/* <tr>
                                        <td>02</td>
                                        <td>8216614</td>
                                        <td>Lorem Ipsum</td>
                                        <td>Lorem Ipsum</td>
                                        <td>Lorem Ipsum</td>
                                        <td>
                                            <span className='ds_sub_eye ds_cursor me-2' onClick={() => setViewEpisodes(true)} >
                                                <img src={eye} alt="" />
                                            </span>
                                            <span className='ds_role_icon ds_cursor me-2' onClick={() => setEditEpisodes(true)} >
                                                <img src={pen} alt="" />
                                            </span>
                                            <span className='ds_role_icon ds_cursor' onClick={() => setRemoveEpisodes(true)} >
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



            {/* ==========    Add Episodes Modal    ========== */}
            <div className=''>
                <Modal show={addEpisodes} onHide={() => setAddEpisodes(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" className='text-white V_modal_width' centered>
                    <Modal.Header className='V_modal_header'>
                        <Modal.Title id="contained-modal-title-vcenter" className='px-lg-5 w-100' >
                            <div className="d-flex justify-content-between ">
                                <div>
                                    Add Episodes
                                </div>
                                <div className='ms-auto ds_cursor' onClick={() => setAddEpisodes(false)}>
                                    <img src={Close} alt="" />
                                </div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            <form onSubmit={CreateEpisodeFormik.handleSubmit}>
                             <div className="row py-md-3  px-lg-5 ">
                                <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                                    <label className='V_label'>Name</label>
                                    <input type="text" name="name" value={CreateEpisodeFormik.values.name} onChange={CreateEpisodeFormik.handleChange} onBlur={ CreateEpisodeFormik.handleBlur}  className='V_input_text_for_all mt-1 mt-md-2' />
                                    {CreateEpisodeFormik.touched.name && CreateEpisodeFormik.errors.name && (
                                      <div className='text-danger mb-0 text-start ps-1 pt-1' style={{fontSize:"14px"}}>{CreateEpisodeFormik.errors.name}</div>
                                    )}
                                </div>
                                <div className="col-12 col-sm-6  pt-2 pt-md-3">
                                    <label className='V_label'>Audio Book ID</label>
                                    {/* <input type="text"  /> */}
                                    <select name="audioBookId" value={CreateEpisodeFormik.values.audioBookId} onChange={CreateEpisodeFormik.handleChange} onBlur={ CreateEpisodeFormik.handleBlur} className='V_input_text_for_all mt-1 mt-md-2' >
                                        <option value='' disabled>select audio book</option>
                                        {
                                            audioBookMap?.map((element)=>{
                                                return(
                                                    <option key={element?._id} value={element?._id}>{element?.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    {CreateEpisodeFormik.touched.audioBookId && CreateEpisodeFormik.errors.audioBookId && (
                                     <div className='text-danger mb-0 text-start ps-1 pt-1' style={{fontSize:"14px"}}>{CreateEpisodeFormik.errors.audioBookId}</div>
                                     )}
                                </div>
                                <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                                    <label className='V_label'>Audio file</label>
                                    <div class="custom-input-group mt-1 mt-md-2">
                                        <input type="text" class="custom-text" placeholder="" value={fileName} readonly  accept="audio/*"/>
                                        <label for="fileInput" class="custom-button">CHOOSE</label>
                                        <input type="file" id="fileInput"  class="custom-file-input " onChange={handleFileChange} />
                                    </div>
                                    {fileError && <p className='text-danger mb-0 text-start ps-1 pt-1' style={{fontSize:"14px"}}>{fileError}</p>}
                                </div>
                                <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                                    <label className='V_label'>Premium</label>
                                    <input type="text" name="premium" value={CreateEpisodeFormik.values.premium} onChange={CreateEpisodeFormik.handleChange} onBlur={ CreateEpisodeFormik.handleBlur}  className='V_input_text_for_all mt-1 mt-md-2' />
                                    {CreateEpisodeFormik.touched.premium && CreateEpisodeFormik.errors.premium && (
                                      <div className='text-danger mb-0 text-start ps-1 pt-1' style={{fontSize:"14px"}}>{CreateEpisodeFormik.errors.premium}</div>
                                    )}
                                </div>
                                
                                <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                                    <label className='V_label'>Duration</label>
                                    <input type="text" name="duration" value={CreateEpisodeFormik.values.duration} onChange={CreateEpisodeFormik.handleChange} onBlur={ CreateEpisodeFormik.handleBlur}  className='V_input_text_for_all mt-1 mt-md-2' />
                                    {CreateEpisodeFormik.touched.duration && CreateEpisodeFormik.errors.duration && (
                                       <div className='text-danger mb-0 text-start ps-1 pt-1' style={{fontSize:"14px"}}>{CreateEpisodeFormik.errors.duration}</div>
                                     )}
                                </div>
                            </div>
                            <div className='V_modal_header mx-auto pb-4 pt-5'>
                                <div className="d-flex justify-content-center">
                                    <button type='submit' className='ds_role_save'>Save</button>
                                    <button type='button' className='ds_sub_cancel'onClick={() => {setAddEpisodes(false); setFileName("No file chosen")}}>Clear</button>
                                </div>
                            </div>
                            </form>
                    </Modal.Body>
                </Modal>
            </div>


            {/* ==========    Edit Episodes Modal    ========== */}
            <div className=''>
                <Modal show={editEpisodes} onHide={() => setEditEpisodes(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" className='text-white V_modal_width' centered>
                    <Modal.Header className='V_modal_header'>
                        <Modal.Title id="contained-modal-title-vcenter" className='px-lg-5 w-100' >
                            <div className="d-flex justify-content-between ">
                                <div>
                                    Edit Episodes
                                </div>
                                <div className='ms-auto ds_cursor' onClick={() => setEditEpisodes(false)}>
                                    <img src={Close} alt="" />
                                </div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                       <form onSubmit={EditEpisodeFormik.handleSubmit}>
                             <div className="row py-md-3  px-lg-5 ">
                                <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                                    <label className='V_label'>Name</label>
                                    <input type="text" name="name" value={EditEpisodeFormik.values.name} onChange={EditEpisodeFormik.handleChange} onBlur={ EditEpisodeFormik.handleBlur}  className='V_input_text_for_all mt-1 mt-md-2' />
                                    {EditEpisodeFormik.touched.name && EditEpisodeFormik.errors.name && (
                                      <div className='text-danger mb-0 text-start ps-1 pt-1' style={{fontSize:"14px"}}>{EditEpisodeFormik.errors.name}</div>
                                    )}
                                </div>
                                <div className="col-12 col-sm-6  pt-2 pt-md-3">
                                    <label className='V_label'>Audio Book ID</label>
                                    {/* <input type="text"  /> */}
                                    <select name="audioBookId" value={EditEpisodeFormik.values.audioBookId} onChange={EditEpisodeFormik.handleChange} onBlur={ EditEpisodeFormik.handleBlur} className='V_input_text_for_all mt-1 mt-md-2' >
                                        <option value='' disabled>select audio book</option>
                                        {
                                            audioBookMap?.map((element)=>{
                                                return(
                                                    <option key={element?._id} value={element?._id}>{element?.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    {EditEpisodeFormik.touched.audioBookId && EditEpisodeFormik.errors.audioBookId && (
                                     <div className='text-danger mb-0 text-start ps-1 pt-1' style={{fontSize:"14px"}}>{EditEpisodeFormik.errors.audioBookId}</div>
                                     )}
                                </div>
                                <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                                    <label className='V_label'>Audio file</label>
                                    <div class="custom-input-group mt-1 mt-md-2">
                                        <input type="text" class="custom-text" placeholder="" value={fileName !== "No file chosen" ? fileName : editObj?.audioFile?.replace(/\\/g, "/")?.split("/")?.pop()} readonly  accept="audio/*"/>
                                        <label for="fileInput" class="custom-button">CHOOSE</label>
                                        <input type="file" id="fileInput"  class="custom-file-input " onChange={handleFileChange} />
                                    </div>
                                    {fileError && <p className='text-danger mb-0 text-start ps-1 pt-1' style={{fontSize:"14px"}}>{fileError}</p>}
                                </div>
                                <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                                    <label className='V_label'>Premium</label>
                                    <input type="text" name="premium" value={EditEpisodeFormik.values.premium} onChange={EditEpisodeFormik.handleChange} onBlur={ EditEpisodeFormik.handleBlur}  className='V_input_text_for_all mt-1 mt-md-2' />
                                    {EditEpisodeFormik.touched.premium && EditEpisodeFormik.errors.premium && (
                                      <div className='text-danger mb-0 text-start ps-1 pt-1' style={{fontSize:"14px"}}>{EditEpisodeFormik.errors.premium}</div>
                                    )}
                                </div>
                                
                                <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                                    <label className='V_label'>Duration</label>
                                    <input type="text" name="duration" value={EditEpisodeFormik.values.duration} onChange={EditEpisodeFormik.handleChange} onBlur={ EditEpisodeFormik.handleBlur}  className='V_input_text_for_all mt-1 mt-md-2' />
                                    {EditEpisodeFormik.touched.duration && EditEpisodeFormik.errors.duration && (
                                       <div className='text-danger mb-0 text-start ps-1 pt-1' style={{fontSize:"14px"}}>{EditEpisodeFormik.errors.duration}</div>
                                     )}
                                </div>
                            </div>
                            <div className='V_modal_header mx-auto pb-4 pt-5'>
                                <div className="d-flex justify-content-center">
                                    <button type='submit' className='ds_role_save'>Save</button>
                                    <button type='button' className='ds_sub_cancel'onClick={() => {setEditEpisodes(false); setFileName("No file chosen")}}>Clear</button>
                                </div>
                            </div>
                            </form>
                    </Modal.Body>
                </Modal>
            </div>



            {/* ==========    View Episodes Modal    ========== */}
            <div className=''>
                <Modal show={viewEpisodes} onHide={() => setViewEpisodes(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" className='text-white V_modal_width ' centered>
                    <Modal.Header className='V_modal_header'>
                        <Modal.Title id="contained-modal-title-vcenter" className='px-md-5 w-100' >
                            <div className="d-flex justify-content-between ">
                                <div>
                                    Episodes Details
                                </div>
                                <div className='ms-auto ds_cursor' onClick={() => setViewEpisodes(false)}>
                                    <img src={Close} alt="" />
                                </div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row py-md-3  px-md-5 text-capitalize">
                        <div className="col-6  pt-2 pt-sm-0">
                                <p className='V_label2 mb-0'>Name</p>
                            </div>
                            <div className="col-6 pt-2 pt-sm-0">
                                <p>: <span className='ms-2 V_label1'>{viewData?.name}</span></p>
                            </div>
                            <div className="col-6  pt-2 pt-sm-0">
                                <p className='V_label2 mb-0'>Audio Book ID</p>
                            </div>
                            <div className="col-6 pt-2 pt-sm-0">
                                <p>: <span className='ms-2 V_label1'>{viewData?.audioBookData?.length ? viewData?.audioBookData[0]?.name : ""}</span></p>
                            </div>
                            <div className="col-6  pt-2 pt-sm-0">
                                <p className='V_label2 mb-0'>Premium</p>
                            </div>
                            <div className="col-6 pt-2 pt-sm-0">
                                <p>: <span className='ms-2 V_label1'>{viewData?.premium}</span></p>
                            </div>
                            {/* <div className="col-6  pt-2 pt-sm-0">
                                <p className='V_label2 mb-0'>Coins Required</p>
                            </div>
                            <div className="col-6 pt-2 pt-sm-0">
                                <p>: <span className='ms-2 V_label1'>12/12/2023</span></p>
                            </div> */}
                            <div className="col-6  pt-2 pt-sm-0">
                                <p className='V_label2 mb-0'>Duration</p>
                            </div>
                            <div className="col-6 pt-2 pt-sm-0">
                                <p>: <span className='ms-2 V_label1'>{viewData?.duration}</span></p>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>

            {/* -================= Delete Episodes Modal ==================*/}

            <Modal show={removeEpisodes} onHide={() => setRemoveEpisodes(false)} size="md" aria-labelledby="contained-modal-title-vcenter " className='text-light ds_role_delete_modal' centered>

                <Modal.Body >
                    <div className='text-center'>
                        <h4 className='mt-4'>Delete</h4>
                        <p className='ds_role_text'>Are you sure you want to delete Episodes?</p>
                        <div className='mt-5 mb-5'>
                            <button className='ds_delete_cancel' onClick={() => setRemoveEpisodes(false)}>Cancel</button>
                            <button className='ds_delete_yes' onClick={handleDelete}>Yes</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Episodes