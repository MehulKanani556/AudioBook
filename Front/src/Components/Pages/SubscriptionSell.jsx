import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import pen from '../../Images/dhruvin/pancil.svg'
import trash from '../../Images/dhruvin/trash.svg'
import eye from '../../Images/dhruvin/eye_icon.svg'
import { Button, Modal } from 'react-bootstrap'
import "../../CSS/Review.css"
import Close from "../../Images/Parth/close_button.png"
import { useDispatch, useSelector } from 'react-redux'
import { SubSellData } from '../../Toolkit/Slices/SubscriptionSellSlice'

const SubscriptionSell = () => {

    const navigate = useNavigate();

    const [viewSubscriptionSell, setViewSubscriptionSell] = useState(false);
    const [removeSubscriptionSell, setRemoveSubscriptionSell] = useState(false);
    const dispatch = useDispatch()
    const subData = useSelector((state)=> state.subSell.subSellDat)
    
    useEffect(()=>{
        dispatch(SubSellData())
    },[])

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
                            <h4 className="text-light pt-4 mb-0">Subscription Sell</h4>
                            <p><Link to="/layout/dashboard" className='ds_head_txt text-decoration-none'>Dashboard /</Link> <span className='text-light'>Subscription Sell</span></p>
                        </div>
                        <div>
                            <button className='V_review_btn1' onClick={() => navigate('/admin/addSubscriptionSell')} ><i className="fa-solid fa-plus me-2"></i> Add</button>
                        </div>
                    </div>

                    <div className='V_review_bg mt-2'>
                        <div className='ds_user_master_scroll overflow-auto'>
                            <table className='w-100 text-light V_review_table  text-nowrap '>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Subscription Plan ID</th>
                                        <th>User ID </th>
                                        <th>Expiry Date</th>
                                        <th>Amount</th>
                                        <th>Payment ID</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subData?.map((element)=>{
                                         console.log(element);
                                         return(
                                            <tr key={element._id}>
                                               <td>01</td>
                                               <td>{element?.subscriptionData[0]?._id}</td>
                                               <td>{element?._id}</td>
                                               <td>20/09/02020</td>
                                               <td>₹99</td>
                                               <td>9658</td>
                                               <td><span className='ds_sub_active'>Active</span></td>
                                               <td className=''>
                                                   <span className='ds_sub_eye ds_cursor me-2' onClick={() => setViewSubscriptionSell(true)} >
                                                       <img src={eye} alt="" />
                                                   </span>
                                                   <span className='ds_role_icon ds_cursor me-2' onClick={() => navigate('/layout/editSubscriptionSell')} >
                                                       <img src={pen} alt="" />
                                                   </span>
                                                   <span className='ds_role_icon ds_cursor' onClick={() => setRemoveSubscriptionSell(true)} >
                                                       <img src={trash} alt="" />
                                                   </span>
                                               </td>
                                            </tr>
                                         )
                                    })}
                                    <tr>
                                        <td>01</td>
                                        <td>9685</td>
                                        <td>Johnwick08</td>
                                        <td>20/09/02020</td>
                                        <td>₹99</td>
                                        <td>9658</td>
                                        <td><span className='ds_sub_block'>Block</span></td>
                                        <td className=''>
                                            <span className='ds_sub_eye ds_cursor me-2' onClick={() => setViewSubscriptionSell(true)} >
                                                <img src={eye} alt="" />
                                            </span>
                                            <span className='ds_role_icon ds_cursor me-2' onClick={() => navigate('/layout/editSubscriptionSell')} >
                                                <img src={pen} alt="" />
                                            </span>
                                            <span className='ds_role_icon ds_cursor' onClick={() => setRemoveSubscriptionSell(true)} >
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






            {/* ==========    View Subscription Sell Modal    ========== */}
            <div className=''>
                <Modal
                    show={viewSubscriptionSell}
                    onHide={() => setViewSubscriptionSell(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    className='text-white V_modal_width '
                    centered>
                    <Modal.Header className='V_modal_header'>
                        <Modal.Title id="contained-modal-title-vcenter" className='px-md-5 w-100' >
                            <div className="d-flex justify-content-between ">
                                <div>
                                    Subscription Sell Details
                                </div>
                                <div className='ms-auto' onClick={() => setViewSubscriptionSell(false)}>
                                    <img src={Close} alt="" />
                                </div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row py-md-3  px-md-5 ">
                            <div className="col-6  pt-2 pt-sm-0">
                                <p className='V_label2 mb-0'>Subscription Plan ID</p>
                            </div>
                            <div className="col-6 pt-2 pt-sm-0">
                                <p>: <span className='ms-2 V_label1'>9854</span></p>
                            </div>
                            <div className="col-6  pt-2 pt-sm-0">
                                <p className='V_label2 mb-0'>User ID</p>
                            </div>
                            <div className="col-6 pt-2 pt-sm-0">
                                <p>: <span className='ms-2 V_label1'>9854</span></p>
                            </div>
                            <div className="col-6  pt-2 pt-sm-0">
                                <p className='V_label2 mb-0'>Expiry Date</p>
                            </div>
                            <div className="col-6 pt-2 pt-sm-0">
                                <p>: <span className='ms-2 V_label1'>20/09/2020</span></p>
                            </div>
                            <div className="col-6  pt-2 pt-sm-0">
                                <p className='V_label2 mb-0'>Amount</p>
                            </div>
                            <div className="col-6 pt-2 pt-sm-0">
                                <p>: <span className='ms-2 V_label1'>₹99</span></p>
                            </div>
                            <div className="col-6  pt-2 pt-sm-0">
                                <p className='V_label2 mb-0'>Payment ID</p>
                            </div>
                            <div className="col-6 pt-2 pt-sm-0">
                                <p>: <span className='ms-2 V_label1'>5845</span></p>
                            </div>
                            <div className="col-6  pt-2 pt-sm-0">
                                <p className='V_label2 mb-0'>Status</p>
                            </div>
                            <div className="col-6 pt-2 pt-sm-0">
                                <p>: <span className='ms-2 V_label1'>Active</span></p>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>

            {/* -================= Delete Subscription Sell Modal ==================*/}

            <Modal show={removeSubscriptionSell} onHide={() => setRemoveSubscriptionSell(false)} size="md" aria-labelledby="contained-modal-title-vcenter " className='text-light ds_role_delete_modal' centered>
                <Modal.Body >
                    <div className='text-center'>
                        <h4 className='mt-4'>Delete</h4>
                        <p className='ds_role_text'>Are you sure you want to delete Subscription Sell?</p>
                        <div className='mt-5 mb-5'>
                            <button className='ds_delete_cancel' onClick={() => setRemoveSubscriptionSell(false)}>Cancel</button>
                            <button className='ds_delete_yes'>Yes</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div >
    )
}

export default SubscriptionSell