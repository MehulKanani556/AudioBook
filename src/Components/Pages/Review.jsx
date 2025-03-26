import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import pen from '../../Images/Parth/edit_button.png'
import trash from '../../Images/Parth/delete_button.png'
import view from '../../Images/Parth/view_button.png'
import { Button, Modal } from 'react-bootstrap'
import "../../CSS/Review.css"

const Review = () => {
    const [modalShow, setModalShow] = useState(false);
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
                            <h4 className="text-light pt-4 mb-0">Review</h4>
                            <p><Link to="/layout/dashboard" className='ds_head_txt text-decoration-none'>Dashboard /</Link> <span className='text-light'>Review</span></p>
                        </div>
                        <div>
                            <button className='V_review_btn'  onClick={() => setModalShow(true)}><i className="fa-solid fa-plus me-2"></i> Add</button>
                        </div>
                    </div>

                    <div className='V_review_bg mt-2'>
                        <div className='overflow-auto'>
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
                                    <tr>
                                        <td>01</td>
                                        <td>2541211</td>
                                        <td>Johanwick08</td>
                                        <td>12/12/2023</td>
                                        <td>Lorem Ipsum</td>
                                        <td>Lorem Ipsum</td>
                                        <td className=''>
                                            <span className=' ds_cursor me-2'>
                                                <img src={view} alt="" />
                                            </span>
                                            <span className=' me-2 ds_cursor'>
                                                <img src={pen} alt="" />
                                            </span>
                                            <span className='ds_cursor'>
                                                <img src={trash} alt="" />
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>02</td>
                                        <td>2541211</td>
                                        <td>Johanwick08</td>
                                        <td>12/12/2023</td>
                                        <td>Lorem Ipsum</td>
                                        <td>Lorem Ipsum</td>
                                        <td>
                                            <span className=' ds_cursor me-2'>
                                                <img src={view} alt="" />
                                            </span>
                                            <span className=' me-2 ds_cursor'>
                                                <img src={pen} alt="" />
                                            </span>
                                            <span className='ds_cursor'>
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

            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Modal heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Centered Modal</h4>
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                        consectetur ac, vestibulum at eros.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Review
