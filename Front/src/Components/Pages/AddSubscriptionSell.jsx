import React, { useState } from 'react'
import '../../CSS/Review.css';
import { useFormik } from 'formik';
import '../../CSS/Subscription.css'

const AddSubscriptionSell = () => {

    const [toggle, setToggle] = useState(false);
    const [redioVal, setRedioVal] = useState("Active");
    const [subAdd, setSubAdd] = useState(false)

    const addSubSellVal = {
        subPlanId:"",
        userId:"",
        expiryDate:"",
        amount:"",
        paymentId:"",
        status:redioVal
    }

    const AddSubSellFormik = useFormik({
        initialValues:addSubSellVal,
        onSubmit:(values , action)=>{
           
        }
    })

    return (
        <>
            <div className="ds_dash_master">
                <div className='ds_dash_main'>
                    <div className='ds_dash_inner'>
                        <div>
                            <h4 className="text-light pt-4 mb-0">Add Subscription Sell</h4>
                        </div>

                        <form onSubmit={AddSubSellFormik.handleSubmit}>
                            <div className="row pt-3 pb-5 ">
                                <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                                    <label className='V_label'>Subscription Plan ID</label>
                                    <input type="text" name='subPlanId' value={AddSubSellFormik.values.subPlanId} onChange={AddSubSellFormik.handleChange} onBlur={AddSubSellFormik.handleBlur} className='V_input_text_for_all mt-1 mt-md-2 ' />
                                </div>
                                <div className="col-12 col-sm-6  pt-2 pt-md-3">
                                    <label className='V_label'>User ID</label>
                                    <input type="text" name='userId' value={AddSubSellFormik.values.userId} onChange={AddSubSellFormik.handleChange} onBlur={AddSubSellFormik.handleBlur} className='V_input_text_for_all mt-1 mt-md-2' />
                                </div>
                                <div className="col-12 col-sm-6  pt-2 pt-md-3">
                                    <label className='V_label'>Expiry Date</label>
                                    <input type="date" name='expiryDate' value={AddSubSellFormik.values.expiryDate} onChange={AddSubSellFormik.handleChange} onBlur={AddSubSellFormik.handleBlur} className='V_input_text_for_all ds_date_icon mt-1 mt-md-2' />
                                </div>
                                <div className="col-12 col-sm-6  pt-2 pt-md-3">
                                    <label className='V_label'>Amount</label>
                                    <input type="text" name='amount' value={AddSubSellFormik.values.amount} onChange={AddSubSellFormik.handleChange} onBlur={AddSubSellFormik.handleBlur} className='V_input_text_for_all mt-1 mt-md-2' />
                                </div>
                                <div className="col-12 col-sm-6  pt-2 pt-md-3">
                                    <label className='V_label'>Payment ID</label>
                                    <input type="text" name='paymentId' value={AddSubSellFormik.values.paymentId} onChange={AddSubSellFormik.handleChange} onBlur={AddSubSellFormik.handleBlur} className='V_input_text_for_all mt-1 mt-md-2' />
                                </div>
                                <div className="col-12 col-sm-6 pt-2 pt-md-3">
                                    <div>
                                        <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Status</label>
                                        <div className='select-wrapper position-relative'>
                                            <div className='ds_sub_select1' onClick={() => setToggle(!toggle)}>{redioVal}</div>
                                            {toggle && (<div className='ds_sub_select_box'>
                                                <div className="form-check mb-3" onClick={() => { setRedioVal("Active"); setToggle(false) }}>
                                                    <input className="form-check-input ds_sub_check" type="radio"   id="exampleRadios1" value="Active" checked={redioVal === "Active" && subAdd ? true : false} />
                                                    <label className="form-check-label" htmlFor="exampleRadios1">
                                                        Active
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={() => { setRedioVal("Block"); setToggle(false) }}>
                                                    <input className="form-check-input ds_sub_check" type="radio" name="exampleRadios" id="exampleRadios2" value="Block" checked={redioVal === "Block" && subAdd ? true : false} />
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
                                    <button className='ds_sub_cancel' onClick={() => setSubAdd(false)}>Clear</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddSubscriptionSell