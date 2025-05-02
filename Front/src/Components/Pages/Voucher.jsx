import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import pen from '../../Images/dhruvin/pancil.svg'
import trash from '../../Images/dhruvin/trash.svg'
import eye from '../../Images/dhruvin/eye_icon.svg'
import { Button, Modal } from 'react-bootstrap'
import "../../CSS/Review.css"
import Close from "../../Images/Parth/close_button.png"
import { useDispatch, useSelector } from 'react-redux'
import { deleteVoucher, getVoucher } from '../../Toolkit/Slices/VoucherSlice'

const Voucher = () => {
    const navigate = useNavigate();

    const [viewVouchers, setViewVouchers] = useState(false);
    const [removeVouchers, setRemoveVouchers] = useState(false);
    const [currentData, setCurrentData] = useState([]);
    const [deleteId, setDeleteId] = useState();
    const [selectData,setSelectData] = useState(null);
    // user connection code here
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getVoucher())
    }, [])
    var voucherData = useSelector((state) => state.voucher.vouchers)
    console.log('vouch', voucherData);
    const itemPerPage = 10;
    var totalPages = Math.ceil(voucherData?.length / itemPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    const handleDelete = () => {
        console.log('deleteId', deleteId)
        dispatch(deleteVoucher(deleteId)).then((response) => {
            console.log(response);
            if (response.payload.success) {
                setRemoveVouchers(false);
                dispatch(getVoucher())
            }
        })
    }

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemPerPage;
        const endIndex = startIndex + itemPerPage;
        const paginatedData = voucherData?.slice(startIndex, endIndex);
        setCurrentData(paginatedData);
    }, [currentPage, voucherData]);


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
                            <h4 className="text-light pt-4 mb-0">Vouchers</h4>
                            <p><Link to="/layout/dashboard" className='ds_head_txt ds_role_link text-decoration-none'>Dashboard /</Link> <span className='text-light'>Vouchers</span></p>
                        </div>
                        <div>
                            <button className='V_review_btn' onClick={() => navigate('/admin/addVouchers')} ><i className="fa-solid fa-plus me-2"></i> Add</button>
                        </div>
                    </div>

                    <div className='V_review_bg mt-2'>
                        <div className='ds_user_master_scroll overflow-auto'>
                            <table className='w-100 text-light V_review_table  text-nowrap text-capitalize' style={{ minWidth: "1800px" }}>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Description </th>
                                        <th>Code</th>
                                        <th>Discount</th>
                                        {/* <th>Coin Master ID</th> */}
                                        <th>Subscription ID</th>
                                        <th>Valid till</th>
                                        <th>For Student</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData?.map((ele, ind) => {
                                        return (
                                            <tr>
                                                <td>{((currentPage - 1) * 10) + (ind + 1)}</td>
                                                <td>{ele?.name || '-'}</td>
                                                <td>{ele?.description?.slice(0, 10) || '-'}...</td>
                                                <td>{ele?.code || '-'}</td>
                                                <td>{ele?.discount || '-'}</td>
                                                {/* <td>{ele?.coinMaster?.[0]?.name || ele.coinMasterId}</td> */}
                                                <td>{ele?.subScriptionSell?.[0]?.name || '-'}</td>
                                                <td>{ele?.validTill || '-'}</td>
                                                <td>{ele?.forStudent || '-'}</td>
                                                <td>
                                                    <span className={ele.status === 'Active' ? 'ds_sub_active' : 'ds_sub_block'}>{ele?.status}</span>
                                                </td>
                                                <td className=''>
                                                    <span className='ds_sub_eye ds_cursor me-2' onClick={() => { setViewVouchers(true);setSelectData(ele)}} >
                                                        <img src={eye} alt="" />
                                                    </span>
                                                    <span className='ds_role_icon ds_cursor me-2' onClick={() => navigate('/admin/editvouchers/' + ele._id)} >
                                                        <img src={pen} alt="" />
                                                    </span>
                                                    <span className='ds_role_icon ds_cursor' onClick={() => { setRemoveVouchers(true); setDeleteId(ele?._id) }} >
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







            {/* ==========    View Vouchers Modal    ========== */}
            <div className=''>
                <Modal
                    show={viewVouchers}
                    onHide={() => setViewVouchers(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    className='text-white V_modal_width '
                    centered>
                    <Modal.Header className='V_modal_header'>
                        <Modal.Title id="contained-modal-title-vcenter" className='px-md-5 w-100' >
                            <div className="d-flex justify-content-between ">
                                <div>
                                    Vouchers Details
                                </div>
                                <div className='ms-auto ds_cursor' onClick={() => setViewVouchers(false)}>
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
                                <p>: <span className='ms-2 V_label1'>{selectData?.name || '-'}</span></p>
                            </div>
                            <div className="col-6  pt-2 pt-sm-0">
                                <p className='V_label2 mb-0'>Description</p>
                            </div>
                            <div className="col-6 pt-2 pt-sm-0">
                                <p>: <span className='ms-2 V_label1'>{selectData?.description || '-'}</span></p>
                            </div>
                            <div className="col-6  pt-2 pt-sm-0">
                                <p className='V_label2 mb-0'>Code</p>
                            </div>
                            <div className="col-6 pt-2 pt-sm-0">
                                <p>: <span className='ms-2 V_label1'>{selectData?.code || '-'}</span></p>
                            </div>
                            <div className="col-6  pt-2 pt-sm-0">
                                <p className='V_label2 mb-0'>Discount</p>
                            </div>
                            <div className="col-6 pt-2 pt-sm-0">
                                <p>: <span className='ms-2 V_label1'>₹{selectData?.discount || '-'}</span></p>
                            </div>
                            {/* <div className="col-6  pt-2 pt-sm-0">
                                <p className='V_label2 mb-0'>Coin Master ID</p>
                            </div>
                            <div className="col-6 pt-2 pt-sm-0">
                                <p>: <span className='ms-2 V_label1'>5845</span></p>
                            </div> */}
                            <div className="col-6  pt-2 pt-sm-0">
                                <p className='V_label2 mb-0'>Subscription ID</p>
                            </div>
                            <div className="col-6 pt-2 pt-sm-0">
                                <p>: <span className='ms-2 V_label1'>{selectData?.subScriptionSell?.[0]?.name || '-'}</span></p>
                            </div>
                            <div className="col-6  pt-2 pt-sm-0">
                                <p className='V_label2 mb-0'>Valid till</p>
                            </div>
                            <div className="col-6 pt-2 pt-sm-0">
                                <p>: <span className='ms-2 V_label1'>{selectData?.validTill || '-'}</span></p>
                            </div>
                            <div className="col-6  pt-2 pt-sm-0">
                                <p className='V_label2 mb-0'>For Student</p>
                            </div>
                            <div className="col-6 pt-2 pt-sm-0">
                                <p>: <span className='ms-2 V_label1'>{selectData?.forStudent || '-'}</span></p>
                            </div>
                            <div className="col-6  pt-2 pt-sm-0">
                                <p className='V_label2 mb-0'>Status</p>
                            </div>
                            <div className="col-6 pt-2 pt-sm-0">
                                <p>: <span className='ms-2 V_label1'>{selectData?.status}</span></p>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>

            {/* -================= Delete Vouchers Modal ==================*/}

            <Modal show={removeVouchers} onHide={() => setRemoveVouchers(false)} size="md" aria-labelledby="contained-modal-title-vcenter " className='text-light ds_role_delete_modal' centered>
                <Modal.Body >
                    <div className='text-center'>
                        <h4 className='mt-4'>Delete</h4>
                        <p className='ds_role_text'>Are you sure you want to delete Vouchers?</p>
                        <div className='mt-5 mb-5'>
                            <button className='ds_delete_cancel' onClick={() => setRemoveVouchers(false)}>Cancel</button>
                            <button className='ds_delete_yes' onClick={handleDelete}>Yes</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div >
    )
}


export default Voucher