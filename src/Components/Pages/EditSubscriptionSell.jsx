import React, { useState } from 'react'
import '../../CSS/Review.css';


const EditSubscriptionSell = () => {

    const [toggle, setToggle] = useState(false);
    const [redioVal, setRedioVal] = useState("Active");
    const [subAdd, setSubAdd] = useState(false)

    return (
        <>
            <div className="ds_dash_master">
                <div className='ds_dash_main'>
                    <div className='ds_dash_inner'>
                        <div>
                            <h2 className="text-light pt-4 mb-0">Edit Subscription Sell</h2>
                        </div>

                        <div>
                            <div className="row py-5 ">
                                <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                                    <label className='V_label'>Subscription Plan ID</label>
                                    <input type="text" className='V_input_text_for_all mt-1 mt-md-2 ' />
                                </div>
                                <div className="col-12 col-sm-6  pt-2 pt-md-3">
                                    <label className='V_label'>User ID</label>
                                    <input type="text" className='V_input_text_for_all mt-1 mt-md-2' />
                                </div>
                                <div className="col-12 col-sm-6  pt-2 pt-md-3">
                                    <label className='V_label'>Expiry Date</label>
                                    <input type="text" className='V_input_text_for_all mt-1 mt-md-2' />
                                </div>
                                <div className="col-12 col-sm-6  pt-2 pt-md-3">
                                    <label className='V_label'>Amount</label>
                                    <input type="text" className='V_input_text_for_all mt-1 mt-md-2' />
                                </div>
                                <div className="col-12 col-sm-6  pt-2 pt-md-3">
                                    <label className='V_label'>Payment ID</label>
                                    <input type="text" className='V_input_text_for_all mt-1 mt-md-2' />
                                </div>
                                <div className="col-12 col-sm-6 pt-2 pt-md-3">
                                    <div>
                                        <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Status</label>
                                        <div className='select-wrapper position-relative'>
                                            <div className='ds_sub_select1' onClick={() => setToggle(!toggle)}>{redioVal}</div>
                                            {toggle && (<div className='ds_sub_select_box'>
                                                <div className="form-check mb-3" onClick={() => { setRedioVal("Active"); setToggle(false) }}>
                                                    <input className="form-check-input ds_sub_check" type="radio" name="exampleRadios" id="exampleRadios1" value="Active" checked={redioVal === "Active" && subAdd ? true : false} />
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
                                    <button className='ds_role_save'>Save</button>
                                    <button className='ds_sub_cancel' onClick={() => setSubAdd(false)}>Clear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditSubscriptionSell