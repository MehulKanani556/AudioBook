import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import pen from '../../Images/dhruvin/pancil.svg'
import trash from '../../Images/dhruvin/trash.svg'
import eye from '../../Images/dhruvin/eye_icon.svg'
import { Button, Modal } from 'react-bootstrap'
import "../../CSS/Review.css"
import Close from "../../Images/Parth/close_button.png"
import { useDispatch, useSelector } from 'react-redux'
import { getReview } from '../../Toolkit/Slices/reviewSlice'

const Review = () => {
    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [viewModalShow, setViewModalShow] = useState(false);
    const [removeReview, setRemoveReview] = useState(false);
    const [currentData, setCurrentData] = useState([]);


    const [selectData,setSelectData] = useState(null);
    // user connection code here
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getReview())
    }, [])
    var reviewData = useSelector((state) => state.review.review)
    console.log('reviewData', reviewData);
    const itemPerPage = 10;
    var totalPages = Math.ceil(reviewData?.length / itemPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemPerPage;
        const endIndex = startIndex + itemPerPage;
        const paginatedData = reviewData?.slice(startIndex, endIndex);
        setCurrentData(paginatedData);
    }, [currentPage, reviewData]);
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

    return (
        <div className="ds_dash_master">
            <div className='ds_dash_main'>
                <div className='ds_dash_inner'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <h4 className="text-light pt-4 mb-0">Review</h4>
                            <p><Link to="/layout/dashboard" className='ds_head_txt text-decoration-none'>Dashboard /</Link> <span className='text-light'>Review</span></p>
                        </div>
                        {/* <div>
                            <button className='V_review_btn' onClick={() => setModalShow(true)}><i className="fa-solid fa-plus me-2"></i> Add</button>
                        </div> */}
                    </div>

                    <div className='V_review_bg mt-2'>
                        <div className='ds_user_master_scroll overflow-auto'>
                            <table className='w-100 text-light V_review_table  text-nowrap '>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Audio Book ID</th>
                                        <th>User</th>
                                        <th>Date</th>
                                        <th>Review</th>
                                        <th>Rating</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.map((ele,ind)=>{
                                        return(
                                            <tr>
                                            <td>{((currentPage - 1) * 10) + (ind + 1)}</td>
                                            <td>{ele?.audioBookData?.[0]?.name || '-'}</td>
                                            <td>{ele?.userData?.[0]?.firstName || '-'}</td>
                                            <td>{ele.date}</td>
                                            <td>{ele.review.slice(0, 10)}</td>
                                            <td>{ele.rating}</td>
                                            <td>
                                                <span className='ds_sub_eye ds_cursor me-2' onClick={() => {setViewModalShow(true);setSelectData(ele)}} >
                                                    <img src={eye} alt="" />
                                                </span>
                                                {/* <span className='ds_role_icon ds_cursor me-2' onClick={() => setEditModalShow(true)} >
                                                    <img src={pen} alt="" />
                                                </span>
                                                <span className='ds_role_icon ds_cursor' onClick={() => setRemoveReview(true)} >
                                                    <img src={trash} alt="" />
                                                </span> */}
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



            {/* ==========    Add review Modal    ========== */}
            <div className=''>
                <Modal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    className='text-white V_modal_width'
                    centered>
                    <Modal.Header className='V_modal_header'>
                        <Modal.Title id="contained-modal-title-vcenter" className='px-lg-5 w-100' >
                            <div className="d-flex justify-content-between ">
                                <div>
                                    Add Review
                                </div>
                                <div className='ms-auto' onClick={() => setModalShow(false)}>
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
                                <label className='V_label'>User ID</label>
                                <input type="text" className='V_input_text_for_all mt-1 mt-md-2' />
                            </div>
                            <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                                <label className='V_label'>Date</label>
                                <input type="text" className='V_input_text_for_all mt-1 mt-md-2' />
                            </div>
                            <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                                <label className='V_label'>Review</label>
                                <input type="text" className='V_input_text_for_all mt-1 mt-md-2' />
                            </div>
                            <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                                <label className='V_label'>Rating</label>
                                <input type="text" className='V_input_text_for_all mt-1 mt-md-2' />
                            </div>
                        </div>




                    </Modal.Body>
                    <Modal.Footer className='V_modal_header mx-auto pb-4'>
                        <div className="d-flex justify-content-center">
                            <button className='ds_role_save'>Save</button>
                            <button className='ds_sub_cancel' onClick={() => setModalShow(false)}>Clear</button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>


            {/* ==========    Edit review Modal    ========== */}
            <div className=''>
                <Modal
                    show={editModalShow}
                    onHide={() => setEditModalShow(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    className='text-white V_modal_width'
                    centered>
                    <Modal.Header className='V_modal_header'>
                        <Modal.Title id="contained-modal-title-vcenter" className='px-lg-5 w-100' >
                            <div className="d-flex justify-content-between ">
                                <div>
                                    Edit Review
                                </div>
                                <div className='ms-auto' onClick={() => setEditModalShow(false)}>
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
                                <label className='V_label'>User ID</label>
                                <input type="text" className='V_input_text_for_all mt-1 mt-md-2' />
                            </div>
                            <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                                <label className='V_label'>Date</label>
                                <input type="text" className='V_input_text_for_all mt-1 mt-md-2' />
                            </div>
                            <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                                <label className='V_label'>Review</label>
                                <input type="text" className='V_input_text_for_all mt-1 mt-md-2' />
                            </div>
                            <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                                <label className='V_label'>Rating</label>
                                <input type="text" className='V_input_text_for_all mt-1 mt-md-2' />
                            </div>
                        </div>


                    </Modal.Body>
                    <Modal.Footer className='V_modal_header mx-auto pb-4'>
                        <div className="d-flex justify-content-center">
                            <button className='ds_role_save'>Save</button>
                            <button className='ds_sub_cancel' onClick={() => setEditModalShow(false)}>Clear</button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>



            {/* ==========    View review Modal    ========== */}
            <div className=''>
                <Modal
                    show={viewModalShow}
                    onHide={() => setViewModalShow(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    className='text-white V_modal_width '
                    centered>
                    <Modal.Header className='V_modal_header'>
                        <Modal.Title id="contained-modal-title-vcenter" className='px-md-5 w-100' >
                            <div className="d-flex justify-content-between ">
                                <div>
                                    Review Details
                                </div>
                                <div className='ms-auto' onClick={() => setViewModalShow(false)}>
                                    <img src={Close} alt="" />
                                </div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row py-md-3  px-md-5 ">
                            <div className="col-6  pt-2 pt-sm-0">
                                <p className='V_label2 mb-0'>Audio Book ID</p>
                            </div>
                            <div className="col-6 pt-2 pt-sm-0">
                                <p>: <span className='ms-2 V_label1'>{selectData?.audioBookId}</span></p>
                            </div>
                            <div className="col-6  pt-2 pt-sm-0">
                                <p className='V_label2 mb-0'>User ID</p>
                            </div>
                            <div className="col-6 pt-2 pt-sm-0">
                                <p>: <span className='ms-2 V_label1'>{selectData?.userId}</span></p>
                            </div>
                            <div className="col-6  pt-2 pt-sm-0">
                                <p className='V_label2 mb-0'>Date</p>
                            </div>
                            <div className="col-6 pt-2 pt-sm-0">
                                <p>: <span className='ms-2 V_label1'>{selectData?.date}</span></p>
                            </div>
                            <div className="col-6  pt-2 pt-sm-0">
                                <p className='V_label2 mb-0'>Review</p>
                            </div>
                            <div className="col-6 pt-2 pt-sm-0">
                                <p>: <span className='ms-2 V_label1'>{selectData?.review}</span></p>
                            </div>
                            <div className="col-6  pt-2 pt-sm-0">
                                <p className='V_label2 mb-0'>Rating</p>
                            </div>
                            <div className="col-6 pt-2 pt-sm-0">
                                <p>: <span className='ms-2 V_label1'>{selectData?.rating}</span></p>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>

            {/* -================= Delete Review Modal ==================*/}

            <Modal show={removeReview} onHide={() => setRemoveReview(false)} size="md" aria-labelledby="contained-modal-title-vcenter " className='text-light ds_role_delete_modal' centered>

                <Modal.Body >
                    <div className='text-center'>
                        <h4 className='mt-4'>Delete</h4>
                        <p className='ds_role_text'>Are you sure you want to delete Review?</p>
                        <div className='mt-5 mb-5'>
                            <button className='ds_delete_cancel' onClick={() => setRemoveReview(false)}>Cancel</button>
                            <button className='ds_delete_yes'>Yes</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Review
