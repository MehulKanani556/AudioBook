import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import pen from '../../Images/dhruvin/pancil.svg'
import trash from '../../Images/dhruvin/trash.svg'
import eye from '../../Images/dhruvin/eye_icon.svg'
import { Button, Modal } from 'react-bootstrap'
import "../../CSS/Review.css"
import Close from "../../Images/Parth/close_button.png"

const CastCrew = () => {
    const [addCastCrew, setAddCastCrew] = useState(false);
    const [editCastCrew, setEditCastCrew] = useState(false);
    const [viewCastCrew, setViewCastCrew] = useState(false);
    const [removeCastCrew, setRemoveCastCrew] = useState(false);
    const [fileName, setFileName] = useState("No file chosen");

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setFileName(file ? file.name : "No file chosen");
    };

    const totalPages = 10;
    const [currentPage, setCurrentPage] = useState(1);

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
                            <p><Link to="/layout/dashboard" className='ds_head_txt text-decoration-none'>Dashboard /</Link> <span className='text-light'>Cast Crew</span></p>
                        </div>
                        <div>
                            <button className='V_review_btn' onClick={() => setAddCastCrew(true)}><i className="fa-solid fa-plus me-2"></i> Add</button>
                        </div>
                    </div>

                    <div className='V_review_bg mt-2'>
                        <div className='ds_user_master_scroll overflow-auto'>
                            <table className='w-100 text-light V_review_table  text-nowrap '>
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
                                    <tr>
                                        <td>01</td>
                                        <td>
                                            <img src={require("../../Images/Parth/homeCorouselImage.png")} alt="" className='V_home_corousel_image' />
                                        </td>
                                        <td>2541211</td>
                                        <td>Johan patel</td>
                                        <td>Lorem Ipsum</td>
                                        <td className=''>
                                            <span className='ds_sub_eye ds_cursor me-2' onClick={() => setViewCastCrew(true)} >
                                                <img src={eye} alt="" />
                                            </span>
                                            <span className='ds_role_icon ds_cursor me-2' onClick={() => setEditCastCrew(true)} >
                                                <img src={pen} alt="" />
                                            </span>
                                            <span className='ds_role_icon ds_cursor' onClick={() => setRemoveCastCrew(true)} >
                                                <img src={trash} alt="" />
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>02</td>
                                        <td>
                                            <img src={require("../../Images/Parth/homeCorouselImage.png")} alt="" className='V_home_corousel_image' />
                                        </td>
                                        <td>8216614</td>
                                        <td>Johan patel</td>
                                        <td>Lorem Ipsum</td>
                                        <td className=''>
                                            <span className='ds_sub_eye ds_cursor me-2' onClick={() => setViewCastCrew(true)} >
                                                <img src={eye} alt="" />
                                            </span>
                                            <span className='ds_role_icon ds_cursor me-2' onClick={() => setEditCastCrew(true)} >
                                                <img src={pen} alt="" />
                                            </span>
                                            <span className='ds_role_icon ds_cursor' onClick={() => setRemoveCastCrew(true)} >
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
                        <div className="row py-md-3  px-lg-5 ">
                            <div className="col-12 col-sm-6  pt-2 pt-md-3">
                                <label className='V_label'>Audio Book ID</label>
                                <input type="text" className='V_input_text_for_all mt-1 mt-md-2' />
                            </div>
                            <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                                <label className='V_label'>Name</label>
                                <input type="text" className='V_input_text_for_all mt-1 mt-md-2' />
                            </div>
                            <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                                <label className='V_label'>Role</label>
                                <input type="text" className='V_input_text_for_all mt-1 mt-md-2' />
                            </div>
                            <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                                <label className='V_label'>Image</label>
                                <div class="custom-input-group mt-1 mt-md-2">
                                <input type="text" class="custom-text" placeholder=""  value={fileName}  readonly />
                                    <label for="fileInput" class="custom-button">CHOOSE</label>
                                    <input type="file" id="fileInput" class="custom-file-input "  onChange={handleFileChange}/>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className='V_modal_header mx-auto pb-4'>
                        <div className="d-flex justify-content-center">
                            <button className='ds_role_save'>Save</button>
                            <button className='ds_sub_cancel' onClick={() => setAddCastCrew(false)}>Clear</button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>


            {/* ==========    Edit Cast Crew Modal    ========== */}
            <div className=''>
                <Modal
                    show={editCastCrew}
                    onHide={() => setEditCastCrew(false)}
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
                                <div className='ms-auto' onClick={() => setEditCastCrew(false)}>
                                    <img src={Close} alt="" />
                                </div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row py-md-3  px-lg-5 ">
                            <div className="col-12 col-sm-6  pt-2 pt-md-3">
                                <label className='V_label'>Audio Book ID</label>
                                <input type="text" className='V_input_text_for_all mt-1 mt-md-2' />
                            </div>
                            <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                                <label className='V_label'>Name</label>
                                <input type="text" className='V_input_text_for_all mt-1 mt-md-2' />
                            </div>
                            <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                                <label className='V_label'>Role</label>
                                <input type="text" className='V_input_text_for_all mt-1 mt-md-2' />
                            </div>
                            <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                                <label className='V_label'>Image</label>
                                <div class="custom-input-group mt-1 mt-md-2">
                                    <input type="text" class="custom-text" placeholder=""  value={fileName}  readonly />
                                    <label for="fileInput" class="custom-button">CHOOSE</label>
                                    <input type="file" id="fileInput" class="custom-file-input "  onChange={handleFileChange}/>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className='V_modal_header mx-auto pb-4'>
                        <div className="d-flex justify-content-center">
                            <button className='ds_role_save'>Save</button>
                            <button className='ds_sub_cancel' onClick={() => setEditCastCrew(false)}>Clear</button>
                        </div>
                    </Modal.Footer>
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
                        <div className="row  justify-content-center  py-md-3  px-lg-5 ">
                            <div className="col-12 col-sm-3  align-self-center text-center pt-2 pt-md-3">
                                <img src={require('../../Images/Parth/homeCorouselImage.png')} alt="" className='V_castCrew_image' />
                            </div>

                            <div className='col-12 col-sm-9   pt-3 '>
                                <div className="row py-md-3  px-md-3 ">
                                    <div className="col-5 col-md-6  pt-2 pt-sm-0">
                                        <p className='V_label2 mb-0'>Audio Book ID</p>
                                    </div>
                                    <div className="col-7 col-md-6 pt-2 pt-sm-0">
                                        <p>: <span className='ms-2 V_label1'>9854</span></p>
                                    </div>
                                    <div className="col-5 col-md-6  pt-2 pt-sm-0">
                                        <p className='V_label2 mb-0'>Name</p>
                                    </div>
                                    <div className="col-7 col-md-6 pt-2 pt-sm-0">
                                        <p>: <span className='ms-2 V_label1'>Johan Patel</span></p>
                                    </div>
                                    <div className="col-5 col-md-6  pt-2 pt-sm-0">
                                        <p className='V_label2 mb-0'>Role</p>
                                    </div>
                                    <div className="col-7 col-md-6 pt-2 pt-sm-0">
                                        <p>: <span className='ms-2 V_label1'>Lorem Ipsum</span></p>
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
                            <button className='ds_delete_yes'>Yes</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div >
    )
}

export default CastCrew