import React, { useEffect, useState } from 'react'
import '../../CSS/Review.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { voucherSchema } from '../Formik';
import { getAllSubscriptionData } from '../../Toolkit/Slices/SubscriptionSlice';
import { addVoucher } from '../../Toolkit/Slices/VoucherSlice';

function AddVoucher() {

    const [toggle, setToggle] = useState(false);
    const [redioVal, setRedioVal] = useState("5845");
    const [toggle1, setToggle1] = useState(false);
    const [redioVal1, setRedioVal1] = useState("Active");
    const [subAdd, setSubAdd] = useState(false)

    const navigate = useNavigate();
    const subscriptionData = useSelector((state) => state.subscription.subscription);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllSubscriptionData());
    }, [])
    const voucherVal = {
        name: "",
        description: "",
        code: "",
        discount: "",
        subscriptionId: "",
        validTill: "",
        forStudent: "",
        status: "Active",
    };

    const voucherFormik = useFormik({
        initialValues: voucherVal,
        validationSchema: voucherSchema,
        onSubmit: (values) => {
            dispatch(addVoucher(values)).then((response) => {
                console.log(response.payload.success)
                if (response.payload.success) {
                    navigate('/admin/voucher')
                }
                else{
                    alert('something gone wrong ! try again.')
                }
            })
        }
    })

    return (
        <>
            <div className="ds_dash_master">
                <div className='ds_dash_main'>
                    <div className='ds_dash_inner'>
                        <div>
                            <h2 className="text-light pt-4 mb-0">Add Vouchers</h2>
                        </div>
                        <form onSubmit={voucherFormik.handleSubmit} noValidate>
                            <div className="row py-5">
                                <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                                    <label className='V_label'>Name</label>
                                    <input type="text" name='name' value={voucherFormik.values.name}
                                        onChange={voucherFormik.handleChange} className='V_input_text_for_all mt-1 mt-md-2 ' />
                                    <p className='text-danger mb-0 text-start ps-1 pt-1 text-capitalize' style={{ fontSize: "14px" }}>{voucherFormik.errors.name}</p>
                                </div>
                                <div className="col-12 col-sm-6  pt-2 pt-md-3">
                                    <label className='V_label'>Description</label>
                                    <input type="text" name='description' value={voucherFormik.values.description}
                                        onChange={voucherFormik.handleChange} className='V_input_text_for_all mt-1 mt-md-2' />
                                    <p className='text-danger mb-0 text-start ps-1 pt-1 text-capitalize' style={{ fontSize: "14px" }}>{voucherFormik.errors.description}</p>

                                </div>
                                <div className="col-12 col-sm-6  pt-2 pt-md-3">
                                    <label className='V_label'>Code</label>
                                    <input type="text" name='code' value={voucherFormik.values.code}
                                        onChange={voucherFormik.handleChange} className='V_input_text_for_all mt-1 mt-md-2' />
                                    <p className='text-danger mb-0 text-start ps-1 pt-1 text-capitalize' style={{ fontSize: "14px" }}>{voucherFormik.errors.code}</p>

                                </div>
                                <div className="col-12 col-sm-6  pt-2 pt-md-3">
                                    <label className='V_label'>Discount</label>
                                    <input type="text" name='discount' value={voucherFormik.values.discount}
                                        onChange={voucherFormik.handleChange} className='V_input_text_for_all mt-1 mt-md-2' />
                                    <p className='text-danger mb-0 text-start ps-1 pt-1 text-capitalize' style={{ fontSize: "14px" }}>{voucherFormik.errors.discount}</p>
                                </div>
                                {/* <div className="col-xl-6 col-lg-6 mt-4">
                                    <div>
                                        <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Label ID</label>
                                        <select type='text' name='labelID' value={voucherFormik.values.labelID}
                                            onChange={voucherFormik.handleChange}
                                            className="form-control ds_role_input" >
                                            <option>select Label</option>
                                            {labelData.map((ele, id) => {
                                                return (
                                                    <option value={ele._id}>{ele.labelName}</option>
                                                )
                                            })}
                                        </select>
                                        <p className='text-danger mb-0 text-start ps-1 pt-1 text-capitalize' style={{ fontSize: "14px" }}>{voucherFormik.errors.labelID}</p>
                                    </div>
                                </div> */}
                                <div className="col-xl-6 col-lg-6 mt-4">
                                    <div>
                                        <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Subscription ID</label>
                                        <select type='text' name='subscriptionId' value={voucherFormik.values.subscriptionId}
                                            onChange={voucherFormik.handleChange}
                                            className="form-control ds_role_input" >
                                            <option value='' disabled> Select Subscription ID</option>
                                            {subscriptionData.map((ele, id) => {
                                                return (
                                                    <option key={ele._id} value={ele._id}>{ele.name}</option>
                                                )
                                            })}
                                        </select>
                                        <p className='text-danger mb-0 text-start ps-1 pt-1 text-capitalize' style={{ fontSize: "14px" }}>{voucherFormik.errors.subscriptionId}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6  pt-2 pt-md-3">
                                    <label className='V_label'>Valid till</label>
                                    <input type="date" name='validTill' value={voucherFormik.values.validTill}
                                        onChange={voucherFormik.handleChange} className='V_input_text_for_all mt-1 mt-md-2' />
                                    <p className='text-danger mb-0 text-start ps-1 pt-1 text-capitalize' style={{ fontSize: "14px" }}>{voucherFormik.errors.validTill}</p>
                                </div>
                                <div className="col-12 col-sm-6  pt-2 pt-md-3">
                                    <label className='V_label'>For Student</label>
                                    <input type="text" name='forStudent' value={voucherFormik.values.forStudent}
                                        onChange={voucherFormik.handleChange} className='V_input_text_for_all mt-1 mt-md-2' />
                                    <p className='text-danger mb-0 text-start ps-1 pt-1 text-capitalize' style={{ fontSize: "14px" }}>{voucherFormik.errors.forStudent}</p>
                                </div>
                                <div className="col-12 col-sm-6 pt-2 pt-md-3">
                                    <div>
                                        <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Status</label>
                                        <div className='select-wrapper position-relative'>
                                            <div className='ds_sub_select1' onClick={() => setToggle1(!toggle1)}>{redioVal1}</div>
                                            {toggle1 && (<div className='ds_sub_select_box'>
                                                <div className="form-check mb-3" onClick={() => {
                                                    setRedioVal1("Active");
                                                    setToggle1(false);
                                                    voucherFormik.setFieldValue('status', 'Active'); // <-- important
                                                }}>
                                                    <input className="form-check-input ds_sub_check" type="radio" name="exampleRadios" id="exampleRadios1" value="Active" checked={redioVal1 === "Active" && subAdd ? true : false} />
                                                    <label className="form-check-label" htmlFor="exampleRadios1">
                                                        Active
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={() => {
                                                    setRedioVal1("Block");
                                                    setToggle1(false);
                                                    voucherFormik.setFieldValue('status', 'Block'); // <-- important
                                                }}>
                                                    <input className="form-check-input ds_sub_check" type="radio" name="exampleRadios" id="exampleRadios2" value="Block" checked={redioVal1 === "Block" && subAdd ? true : false} />
                                                    <label className="form-check-label" htmlFor="exampleRadios2">
                                                        Block
                                                    </label>
                                                </div>
                                            </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-5 mb-3 pb-5 '>
                                <div className='text-center'>
                                    <button type='submit' className='ds_role_save'>Save</button>
                                    <button type='button' className='ds_sub_cancel' onClick={() => setSubAdd(false)}>Clear</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddVoucher