import React, { use, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import pen from '../../Images/dhruvin/pancil.svg'
import trash from '../../Images/dhruvin/trash.svg'
import eye from '../../Images/dhruvin/eye_icon.svg'
import { Button, Modal } from 'react-bootstrap'
import "../../CSS/Review.css"
import Close from "../../Images/Parth/close_button.png"
import { useDispatch, useSelector } from 'react-redux'
import { addCastCrewFunc, deleteCastCrew, getCastCrew, updateCastCrew } from '../../Toolkit/Slices/CastCrew'
import { useFormik } from 'formik'
import { crewSchema } from '../Formik'
import { getAllAudioBookData } from '../../Toolkit/Slices/AudioBookSlice'
import { getRole } from '../../Toolkit/Slices/RoleSlice'

const CastCrew = () => {
    useEffect(() => {
        dispatch(getAllAudioBookData());
        dispatch(getRole());
        dispatch(getCastCrew());
    }, [])
    const [addCastCrew, setAddCastCrew] = useState(false);
    const [editCastCrew, setEditCastCrew] = useState(false);
    const [viewCastCrew, setViewCastCrew] = useState(false);
    const [removeCastCrew, setRemoveCastCrew] = useState(false);
    const [fileName, setFileName] = useState("No file chosen");
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const dispatch = useDispatch();
    const [deleteId, setDeleteId] = useState();
    const [updateId, setUpdateId] = useState(null);
    const [selectData,setSelectData] = useState();
    const audioBookData = useSelector((state) => state.audioBook?.audioBook);
    const roleData = useSelector((state) => state.role.role);
    const crewData = useSelector((state) => state.castCrew.castCrew);
    console.log(crewData)
    const itemPerPage = 10;
    var totalPages = Math.ceil(crewData.length / itemPerPage);



    // formik code here

    const crewVal = {
        audiBookId: "",
        name: "",
        roleId: "",
        crewImage: ""
    };

    const crewValFormik = useFormik({
        initialValues: crewVal,
        validationSchema: crewSchema,
        onSubmit: (values, { resetForm }) => {
            if (updateId === null) {
                dispatch(addCastCrewFunc(values)).then((response) => {
                    console.log(response)
                    if (response.payload.success) {
                        setAddCastCrew(false);
                        dispatch(getCastCrew());
                        resetForm();
                        setFileName("No file chosen");
                    }
                    else {
                        alert('something gone wrong ! try again.')
                    }
                })
            }
            else {
                dispatch(updateCastCrew({ castCrewData: values, id: updateId })).then((response) => {
                    console.log(response)
                    if (response.payload.success) {
                        setEditCastCrew(false);
                        dispatch(getCastCrew());
                        resetForm();
                        setFileName("No file chosen");
                    }
                    else {
                        alert('something gone wrong ! try again.')
                    }
                })
            }

        }
    })



    // update code handling

    const getUpdateData = (ele) => {
        console.log('ele', ele);
        crewValFormik.setValues({ audiBookId: ele?.audiBookId, name: ele?.name, roleId: ele?.roleId, crewImage: ele?.crewImage });
        setFileName(ele?.crewImage)
        setUpdateId(ele._id)
    }
    const handleCloseEditModal = () => {
        setEditCastCrew(false);
        crewValFormik.setValues({ audiBookId: '', name: '', roleId: '', crewImage: '' });
        crewValFormik.setErrors({});
        crewValFormik.setTouched({});
        setFileName("No file chosen");
    }


    //  handle delete funtion;
    const handleDelete = () => {
        dispatch(deleteCastCrew(deleteId)).then((response) => {
            console.log(response);
            if (response.payload.success) {
                setRemoveCastCrew(false)
                dispatch(getCastCrew());
            }
        })
    }


    // pagination and image handling is here 
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileName(file ? file.name : "No file chosen");
    };

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemPerPage;
        const endIndex = startIndex + itemPerPage;
        const paginatedData = crewData.slice(startIndex, endIndex);
        setCurrentData(paginatedData);
    }, [currentPage, crewData]);



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
        <div className="ds_dash_master">
            <div className='ds_dash_main'>
                <div className='ds_dash_inner'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <h4 className="text-light pt-4 mb-0">Cast Crew</h4>
                            <p><Link to="/admin/dashboard" className='ds_head_txt ds_role_link text-decoration-none'>Dashboard /</Link> <span className='text-light'>Cast Crew</span></p>
                        </div>
                        <div>
                            <button className='V_review_btn' onClick={() => setAddCastCrew(true)}><i className="fa-solid fa-plus me-2"></i> Add</button>
                        </div>
                    </div>

                    <div className='V_review_bg mt-2'>
                        <div className='ds_user_master_scroll overflow-auto'>
                            <table className='w-100 text-light V_review_table  text-nowrap text-capitalize'>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Image</th>
                                        <th>Audio Book ID</th>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.map((ele, ind) => {
                                        return (
                                            <tr key={ele?._id}>
                                                <td>{((currentPage - 1) * 10) + (ind + 1)}</td>
                                                <td>
                                                    <img src={`http://localhost:4000/${ele?.crewImage}`} alt={ele._id} className='V_home_corousel_image' />
                                                </td>
                                                <td>{ele?.audiBookData?.[0]?.name || '-'}</td>
                                                <td>{ele?.name || '-'}</td>
                                                <td>{ele?.roleData?.[0]?.roleName || '-'}</td>
                                                <td className=''>
                                                    <span className='ds_sub_eye ds_cursor me-2' onClick={() => {setViewCastCrew(true);setSelectData(ele)}} >
                                                        <img src={eye} alt="" />
                                                    </span>
                                                    <span className='ds_role_icon ds_cursor me-2' onClick={() => { setEditCastCrew(true); getUpdateData(ele) }} >
                                                        <img src={pen} alt="" />
                                                    </span>
                                                    <span className='ds_role_icon ds_cursor' onClick={() => { setRemoveCastCrew(true); setDeleteId(ele._id) }} >
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



            {/* ==========    Add Cast Crew Modal    ========== */}
            <div className=''>
                <Modal
                    show={addCastCrew}
                    onHide={() => setAddCastCrew(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    className='text-white V_modal_width'
                    centered>
                    <Modal.Header className='V_modal_header'>
                        <Modal.Title id="contained-modal-title-vcenter" className='px-lg-5 w-100' >
                            <div className="d-flex justify-content-between ">
                                <div>
                                    Add Cast Crew
                                </div>
                                <div className='ms-auto' onClick={() => setAddCastCrew(false)}>
                                    <img src={Close} alt="" />
                                </div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={crewValFormik.handleSubmit} className="row py-md-3 px-lg-5">
                            {/* Audio Book ID */}
                            <div className="col-12 col-sm-6 pt-2 pt-md-3">
                                <div>
                                    <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Audio Book ID</label>
                                    <select type='text' name='audiBookId' value={crewValFormik.values.audiBookId}
                                        onChange={crewValFormik.handleChange}
                                        className="form-control ds_role_input" >
                                        <option value='' disabled>Select Audio Book</option>
                                        {audioBookData.map((ele, id) => {
                                            return (
                                                <option key={ele._id} value={ele._id}>{ele.name}</option>
                                            )
                                        })}
                                    </select>
                                    <p className='text-danger mb-0 text-start ps-1 pt-1 text-capitalize' style={{ fontSize: "14px" }}>{crewValFormik.errors.audiBookId}</p>
                                </div>
                            </div>

                            {/* Name */}
                            <div className="col-12 col-sm-6 pt-2 pt-md-3">
                                <label className='V_label'>Name</label>
                                <input
                                    type="text"
                                    className='V_input_text_for_all mt-1 mt-md-2'
                                    name="name"
                                    value={crewValFormik.values.name}
                                    onChange={crewValFormik.handleChange}
                                />
                                <p className='text-danger mb-0 text-start ps-1 pt-1 text-capitalize' style={{ fontSize: "14px" }}>
                                    {crewValFormik.errors.name}
                                </p>
                            </div>

                            {/* Role */}
                            <div className="col-12 col-sm-6 pt-2 pt-md-3">
                                <div>
                                    <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Role ID</label>
                                    <select type='text' name='roleId' value={crewValFormik.values.roleId}
                                        onChange={crewValFormik.handleChange}
                                        className="form-control ds_role_input" >
                                        <option value='' disabled>Select Role ID</option>
                                        {roleData?.map((ele, id) => {
                                            return (
                                                <option key={ele._id} value={ele._id}>{ele?.roleName}</option>
                                            )
                                        })}
                                    </select>
                                    <p className='text-danger mb-0 text-start ps-1 pt-1 text-capitalize' style={{ fontSize: "14px" }}>{crewValFormik.errors.roleId}</p>
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div className="col-12 col-sm-6 pt-2 pt-md-3">
                                <label className='V_label'>Image</label>
                                <div className="custom-input-group mt-1 mt-md-2">
                                    <input
                                        type="text"
                                        className="custom-text"
                                        placeholder=""
                                        value={fileName}
                                        readOnly
                                    />
                                    <label htmlFor="fileInput" className="custom-button">CHOOSE</label>
                                    <input
                                        type="file"
                                        id="fileInput"
                                        className="custom-file-input"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            setFileName(file?.name || ""); // assuming you track fileName in state
                                            crewValFormik.setFieldValue("crewImage", file);
                                        }}
                                    />
                                </div>
                                <p className='text-danger mb-0 text-start ps-1 pt-1 text-capitalize' style={{ fontSize: "14px" }}>
                                    {crewValFormik.errors.crewImage}
                                </p>
                            </div>

                            <div className="d-flex justify-content-center py-4">
                                <button type='submit' className='ds_role_save'>Save</button>
                                <button className='ds_sub_cancel' onClick={() => { setAddCastCrew(false); setFileName("No File Choosen") }}>Clear</button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>


            {/* ==========    Edit Cast Crew Modal    ========== */}
            <div className=''>
                <Modal
                    show={editCastCrew}
                    onHide={() => handleCloseEditModal()}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    className='text-white V_modal_width'
                    centered>
                    <Modal.Header className='V_modal_header'>
                        <Modal.Title id="contained-modal-title-vcenter" className='px-lg-5 w-100' >
                            <div className="d-flex justify-content-between ">
                                <div>
                                    Edit Cast Crew
                                </div>
                                <div className='ms-auto' onClick={() => handleCloseEditModal()}>
                                    <img src={Close} alt="" />
                                </div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={crewValFormik.handleSubmit} className="row py-md-3 px-lg-5">
                            {/* Audio Book ID */}
                            <div className="col-12 col-sm-6 pt-2 pt-md-3">
                                <div>
                                    <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Audio Book ID</label>
                                    <select type='text' name='audiBookId' value={crewValFormik.values.audiBookId}
                                        onChange={crewValFormik.handleChange}
                                        className="form-control ds_role_input" >
                                        <option>Audio Book</option>
                                        {audioBookData.map((ele, id) => {
                                            return (
                                                <option key={ele._id} value={ele._id}>{ele.name}</option>
                                            )
                                        })}
                                    </select>
                                    <p className='text-danger mb-0 text-start ps-1 pt-1 text-capitalize' style={{ fontSize: "14px" }}>{crewValFormik.errors.audiBookId}</p>
                                </div>
                            </div>

                            {/* Name */}
                            <div className="col-12 col-sm-6 pt-2 pt-md-3">
                                <label className='V_label'>Name</label>
                                <input
                                    type="text"
                                    className='V_input_text_for_all mt-1 mt-md-2'
                                    name="name"
                                    value={crewValFormik.values.name}
                                    onChange={crewValFormik.handleChange}
                                />
                                <p className='text-danger mb-0 text-start ps-1 pt-1 text-capitalize' style={{ fontSize: "14px" }}>
                                    {crewValFormik.errors.name}
                                </p>
                            </div>

                            {/* Role */}
                            <div className="col-12 col-sm-6 pt-2 pt-md-3">
                                <div>
                                    <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Role ID</label>
                                    <select type='text' name='roleId' value={crewValFormik.values.roleId}
                                        onChange={crewValFormik.handleChange}
                                        className="form-control ds_role_input" >
                                        <option>Role ID</option>
                                        {roleData?.map((ele, id) => {
                                            return (
                                                <option key={ele._id} value={ele._id}>{ele?.roleName}</option>
                                            )
                                        })}
                                    </select>
                                    <p className='text-danger mb-0 text-start ps-1 pt-1 text-capitalize' style={{ fontSize: "14px" }}>{crewValFormik.errors.roleId}</p>
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div className="col-12 col-sm-6 pt-2 pt-md-3">
                                <label className='V_label'>Image</label>
                                <div className="custom-input-group mt-1 mt-md-2">
                                    <input
                                        type="text"
                                        className="custom-text"
                                        placeholder=""
                                        value={fileName.replace(/\\/g, "/")?.split("/")?.pop()}
                                        readOnly
                                    />
                                    <label htmlFor="fileInput" className="custom-button">CHOOSE</label>
                                    <input
                                        type="file"
                                        id="fileInput"
                                        className="custom-file-input"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            setFileName(file?.name || ""); // assuming you track fileName in state
                                            crewValFormik.setFieldValue("crewImage", file);
                                        }}
                                    />
                                </div>
                                <p className='text-danger mb-0 text-start ps-1 pt-1 text-capitalize' style={{ fontSize: "14px" }}>
                                    {crewValFormik.errors.crewImage}
                                </p>
                            </div>

                            <div className="d-flex justify-content-center py-4">
                                <button type='submit' className='ds_role_save'>Save</button>
                                <button className='ds_sub_cancel' onClick={() => { handleCloseEditModal(); setFileName("No File Choosen") }}>Clear</button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>



            {/* ==========    View Cast Crew Modal    ========== */}
            <div className=''>
                <Modal
                    show={viewCastCrew}
                    onHide={() => setViewCastCrew(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    className='text-white V_modal_width '
                    centered>
                    <Modal.Header className='V_modal_header'>
                        <Modal.Title id="contained-modal-title-vcenter" className='px-md-5 w-100' >
                            <div className="d-flex justify-content-between ">
                                <div>
                                    Cast Crew Details
                                </div>
                                <div className='ms-auto' onClick={() => setViewCastCrew(false)}>
                                    <img src={Close} alt="" />
                                </div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row  justify-content-center  py-md-3  px-lg-5 text-capitalize">
                            <div className="col-12 col-sm-3  align-self-center text-center pt-2 pt-md-3">
                                <img src={`http://localhost:4000/${selectData?.crewImage}`} alt="" className='V_castCrew_image' />
                            </div>

                            <div className='col-12 col-sm-9   pt-3 '>
                                <div className="row py-md-3  px-md-3 ">
                                    <div className="col-5 col-md-6  pt-2 pt-sm-0">
                                        <p className='V_label2 mb-0'>Audio Book</p>
                                    </div>
                                    <div className="col-7 col-md-6 pt-2 pt-sm-0">
                                        <p>: <span className='ms-2 V_label1'>{selectData?.audiBookData?.[0]?.name || '-'}</span></p>
                                    </div>
                                    <div className="col-5 col-md-6  pt-2 pt-sm-0">
                                        <p className='V_label2 mb-0'>Name</p>
                                    </div>
                                    <div className="col-7 col-md-6 pt-2 pt-sm-0">
                                        <p>: <span className='ms-2 V_label1'>{selectData?.name || '-'}</span></p>
                                    </div>
                                    <div className="col-5 col-md-6  pt-2 pt-sm-0">
                                        <p className='V_label2 mb-0'>Role</p>
                                    </div>
                                    <div className="col-7 col-md-6 pt-2 pt-sm-0">
                                        <p>: <span className='ms-2 V_label1'>{selectData?.roleData?.[0]?.roleName || '-'}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>

            {/* -================= Delete Cast Crew Modal ==================*/}

            <Modal show={removeCastCrew} onHide={() => setRemoveCastCrew(false)} size="md" aria-labelledby="contained-modal-title-vcenter " className='text-light ds_role_delete_modal' centered>

                <Modal.Body >
                    <div className='text-center'>
                        <h4 className='mt-4'>Delete</h4>
                        <p className='ds_role_text'>Are you sure you want to delete Cast Crew?</p>
                        <div className='mt-5 mb-5'>
                            <button className='ds_delete_cancel' onClick={() => setRemoveCastCrew(false)}>Cancel</button>
                            <button className='ds_delete_yes' onClick={handleDelete}>Yes</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div >
    )
}

export default CastCrew