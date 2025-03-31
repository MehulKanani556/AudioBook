import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import pen from '../../Images/Parth/edit_button.png'
import trash from '../../Images/Parth/delete_button.png'
import view from '../../Images/Parth/view_button.png'
import { Button, Modal } from 'react-bootstrap'
import "../../CSS/Review.css"
import Close from "../../Images/Parth/close_button.png"


const HomeCorousel = () => {
    const [addHomeLabelCorouselModal, setAddHomeLabelCorouselModal] = useState(false);
    const [editHomeLabelCorousel, setEditHomeLabelCorousel] = useState(false);
    const [removeHomeCorousel, setRemoveHomeCorousel] = useState(false);


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
                            <h4 className="text-light pt-4 mb-0">Home Corousel</h4>
                            <p><Link to="/layout/dashboard" className='ds_head_txt text-decoration-none'>Dashboard /</Link> <span className='text-light'>Home Corousel</span></p>
                        </div>
                        <div>
                            <button className='V_review_btn1' onClick={() => setAddHomeLabelCorouselModal(true)}><i className="fa-solid fa-plus me-2"></i> Add</button>
                        </div>
                    </div>

                    <div className='V_review_bg mt-2'>
                        <div className='overflow-auto'>
                            <table className='w-100 text-light V_review_table  text-nowrap '>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>01</td>
                                        <td>
                                            <img src={require("../../Images/Parth/homeCorouselImage.png")} alt="" className='V_home_corousel_image' />
                                        </td>
                                        <td className=''>
                                            <span className='ds_role_icon ds_cursor me-2' onClick={() => setEditHomeLabelCorousel(true)} >
                                                <img src={pen} alt="" />
                                            </span>
                                            <span className='ds_role_icon ds_cursor' onClick={() => setRemoveHomeCorousel(true)} >
                                                <img src={trash} alt="" />
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>02</td>
                                        <td>
                                            <img src={require("../../Images/Parth/homeCorouselImage.png")} alt="" className='V_home_corousel_image' />
                                        </td>
                                        <td className=''>
                                            <span className='ds_role_icon ds_cursor me-2' onClick={() => setEditHomeLabelCorousel(true)} >
                                                <img src={pen} alt="" />
                                            </span>
                                            <span className='ds_role_icon ds_cursor' onClick={() => setRemoveHomeCorousel(true)} >
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



            {/* ==========     Add Home Labels    ========== */}
            <div className=''>
                <Modal
                    show={addHomeLabelCorouselModal}
                    onHide={() => setAddHomeLabelCorouselModal(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    className='text-white V_modal_width'
                    centered>
                    <Modal.Header className='V_modal_header'>
                        <Modal.Title id="contained-modal-title-vcenter" className='px-lg-5 w-100' >
                            <div className="d-flex justify-content-between ">
                                <div>
                                    Add Home Corousel
                                </div>
                                <div className='ms-auto' onClick={() => setAddHomeLabelCorouselModal(false)}>
                                    <img src={Close} alt="" />
                                </div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row py-md-3  px-lg-5 ">
                            <div className="col-12   pt-2 pt-md-3">
                                <label className='V_label'>Image</label>
                                <div class="custom-input-group">
                                    <input type="text" class="custom-text" placeholder="" readonly />
                                    <label for="fileInput" class="custom-button">CHOOSE</label>
                                    <input type="file" id="fileInput" class="custom-file-input" />
                                </div>
                            </div>
                        </div>


                    </Modal.Body>
                    <Modal.Footer className='V_modal_header mx-auto pb-4'>
                        <div className="d-flex justify-content-center">
                            <button className='ds_role_save'>Save</button>
                            <button className='ds_sub_cancel'>Clear</button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>


            {/* ==========    Edit Home Labels     ========== */}
            <div className=''>
                <Modal
                    show={editHomeLabelCorousel}
                    onHide={() => setEditHomeLabelCorousel(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    className='text-white V_modal_width'
                    centered>
                    <Modal.Header className='V_modal_header'>
                        <Modal.Title id="contained-modal-title-vcenter" className='px-lg-5 w-100' >
                            <div className="d-flex justify-content-between ">
                                <div>
                                    Edit Home Corousel
                                </div>
                                <div className='ms-auto' onClick={() => setEditHomeLabelCorousel(false)}>
                                    <img src={Close} alt="" />
                                </div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row py-md-3  px-lg-5 ">
                            <div className="col-12   pt-2 pt-md-3">
                                <label className='V_label'>Image</label>
                                <div class="custom-input-group">
                                    <input type="text" class="custom-text" placeholder="" readonly />
                                    <label for="fileInput" class="custom-button">CHOOSE</label>
                                    <input type="file" id="fileInput" class="custom-file-input" />
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className='V_modal_header mx-auto pb-4'>
                        <div className="d-flex justify-content-center">
                            <button className='ds_role_save'>Save</button>
                            <button className='ds_sub_cancel'>Clear</button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>



            {/* -================= Delete Home Label Join Modal ==================*/}
            <Modal show={removeHomeCorousel} onHide={() => setRemoveHomeCorousel(false)} size="md" aria-labelledby="contained-modal-title-vcenter " className='text-light ds_role_delete_modal' centered>

                <Modal.Body >
                    <div className='text-center'>
                        <h4 className='mt-4'>Delete</h4>
                        <p className='ds_role_text'>Are you sure you want to delete Home Corousel?</p>
                        <div className='mt-5 mb-5'>
                            <button className='ds_delete_cancel' onClick={() => setRemoveHomeCorousel(false)}>Cancel</button>
                            <button className='ds_delete_yes'>Yes</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default HomeCorousel