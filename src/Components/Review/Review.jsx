import React, { useState } from 'react';
import './Review.css';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
// import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Review = () => {
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate()

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
        <>
            <section className='V_outlet_back text-white pt-3 px-3 pt-lg-5 px-lg-5'>
                <div className="d-flex justify-content-between">
                    <div>
                        <h1 className='V_title'>Review</h1>
                        <p><span className='V_his_first'>Dashboard</span> / <span className='V_his_second'>Review</span></p>
                    </div>
                    <div>
                        <button className='V_add_button bg-white text-black py-2 px-4 ' onClick={() => navigate('/layout/addreview')}>
                            <FaPlus />     Add
                        </button>
                    </div>
                </div>

                <div className="V_outlet_sub_back">
                    <div className=" d-flex justify-content-between flex-column overflow-auto">
                        <table className=" text-white">
                            <thead className='V_border_bottom'>
                                <tr >
                                    <th className='V_thead'>No</th>
                                    <th className='V_thead'>Audio Book ID</th>
                                    <th className='V_thead'>User ID</th>
                                    <th className='V_thead'>Date</th>
                                    <th className='V_thead'>Review</th>
                                    <th className='V_thead'>Rating</th>
                                    <th className='V_thead'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='V_thead'>01</td>
                                    <td className='V_thead'>2541211</td>
                                    <td className='V_thead'>Johanwick08</td>
                                    <td className='V_thead'>12/12/2023</td>
                                    <td className='V_thead'>Lorem Ipsum</td>
                                    <td className='V_thead'>Lorem Ipsum</td>
                                    <td className='V_thead'>
                                        <div className="d-flex justify-content-center">
                                            <div>
                                                <img src={require('../../Images/Parth/view_button.png')} alt="" className='V_action_image' onClick={() => setModalShow(true)} />
                                            </div>
                                            <div>
                                                <img src={require('../../Images/Parth/edit_button.png')} alt="" className='V_action_image' onClick={() => navigate("/layout/editreview")} />
                                            </div>
                                            <div>
                                                <img src={require('../../Images/Parth/delete_button.png')} alt="" className='V_action_image' />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='V_thead'>02</td>
                                    <td className='V_thead'>8216614</td>
                                    <td className='V_thead'>Johanwick08</td>
                                    <td className='V_thead'>12/12/2023</td>
                                    <td className='V_thead'>Lorem Ipsum</td>
                                    <td className='V_thead'>Lorem Ipsum</td>
                                    <td className='V_thead'>
                                        <div className="d-flex justify-content-center">
                                            <div>
                                                <img src={require('../../Images/Parth/view_button.png')} alt="" className='V_action_image' />
                                            </div>
                                            <div>
                                                <img src={require('../../Images/Parth/edit_button.png')} alt="" className='V_action_image' />
                                            </div>
                                            <div>
                                                <img src={require('../../Images/Parth/delete_button.png')} alt="" className='V_action_image' />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>

                <div className="pt-3 d-flex justify-content-center justify-content-md-end">
                    {/* <div className='V_pagination text-center'>Prev</div>
                    <div className='V_pagination1 text-center'>1</div>
                    <div className='V_pagination text-center'>2</div>
                    <div className='V_pagination text-center'>3</div>
                    <div className='V_pagination text-center'>...</div>
                    <div className='V_pagination text-center'>10</div>
                    <div className='V_pagination text-center'>Next</div> */}
                    {renderPagination()}
                </div>
            </section>



            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className='V_review_modal_width m-auto'
            >
                <div className='V_rview_modal'>
                    <Modal.Header className='border-0'>
                        <Modal.Title id="contained-modal-title-vcenter" className='w-100 px-sm-4' >
                            <div className="text-white d-flex justify-content-between w-100">
                                <div>
                                    <p className='V_review'>Review Details</p>
                                </div>
                                <div className='ms-auto'>
                                    <img src={require('../../Images/Parth/close_button.png')} alt="" className='' onClick={() => setModalShow(false)}/>
                                </div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row px-sm-4">
                            <div className="col-6 V_label1 mb-3">Audio Book ID</div>
                            <div className="col-6 text-white mb-3">:<span className='ps-2'>45256</span></div>
                            <div className="col-6 V_label1 mb-3">User ID</div>
                            <div className="col-6 text-white mb-3">:<span className='ps-2'>Johanwick08</span></div>
                            <div className="col-6 V_label1 mb-3">Date</div>
                            <div className="col-6 text-white mb-3">:<span className='ps-2'>12/12/2023</span></div>
                            <div className="col-6 V_label1 mb-3">Review</div>
                            <div className="col-6 text-white mb-3">:<span className='ps-2'>Lorem Ipsum</span></div>
                            <div className="col-6 V_label1 mb-3">Rating</div>
                            <div className="col-6 text-white mb-3">:<span className='ps-2'>Lorem Ipsum</span></div>
                        </div>
                    </Modal.Body>
                </div>
            </Modal>

        </>
    )
}

export default Review