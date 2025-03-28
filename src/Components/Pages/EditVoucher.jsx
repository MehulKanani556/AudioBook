import React, { useState } from 'react'
import '../../CSS/Review.css';

const EditVoucher = () => {

    const [toggle, setToggle] = useState(false);
    const [redioVal, setRedioVal] = useState("5845");
    const [toggle1, setToggle1] = useState(false);
    const [redioVal1, setRedioVal1] = useState("Active");
    const [subAdd, setSubAdd] = useState(false)

    return (
        <>
            <div className="ds_dash_master">
                <div className='ds_dash_main'>
                    <div className='ds_dash_inner'>
                        <div>
                            <h2 className="text-light pt-4 mb-0">Edit Vouchers</h2>
                        </div>

                        <div>
                            <div className="row py-5 ">
                                <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                                    <label className='V_label'>Name</label>
                                    <input type="text" className='V_input_text_for_all mt-1 mt-md-2 ' />
                                </div>
                                <div className="col-12 col-sm-6  pt-2 pt-md-3">
                                    <label className='V_label'>Description</label>
                                    <input type="text" className='V_input_text_for_all mt-1 mt-md-2' />
                                </div>
                                <div className="col-12 col-sm-6  pt-2 pt-md-3">
                                    <label className='V_label'>Code</label>
                                    <input type="text" className='V_input_text_for_all mt-1 mt-md-2' />
                                </div>
                                <div className="col-12 col-sm-6  pt-2 pt-md-3">
                                    <label className='V_label'>Discount</label>
                                    <input type="text" className='V_input_text_for_all mt-1 mt-md-2' />
                                </div>
                                <div className="col-12 col-sm-6 pt-2 pt-md-3">
                                    <div>
                                        <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Coin Master ID</label>
                                        <div className='select-wrapper position-relative'>
                                            <div className='ds_sub_select1' onClick={() => setToggle(!toggle)}>{redioVal}</div>
                                            {toggle && (<div className='ds_sub_select_box'>
                                                <div className="form-check mb-3" onClick={() => { setRedioVal("5845"); setToggle(false) }}>
                                                    <input className="form-check-input ds_sub_check" type="radio" name="exampleRadios" id="exampleRadios1" value="5845" checked={redioVal === "5845" && subAdd ? true : false} />
                                                    <label className="form-check-label" htmlFor="exampleRadios1">
                                                        5845
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={() => { setRedioVal("5849"); setToggle(false) }}>
                                                    <input className="form-check-input ds_sub_check" type="radio" name="exampleRadios" id="exampleRadios2" value="5849" checked={redioVal === "5849" && subAdd ? true : false} />
                                                    <label className="form-check-label" htmlFor="exampleRadios2">
                                                        5849
                                                    </label>
                                                </div>
                                            </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6  pt-2 pt-md-3">
                                    <label className='V_label'>Subscription ID</label>
                                    <input type="text" className='V_input_text_for_all mt-1 mt-md-2' />
                                </div>
                                <div className="col-12 col-sm-6  pt-2 pt-md-3">
                                    <label className='V_label'>Valid till</label>
                                    <input type="text" className='V_input_text_for_all mt-1 mt-md-2' />
                                </div>
                                <div className="col-12 col-sm-6  pt-2 pt-md-3">
                                    <label className='V_label'>For Student</label>
                                    <input type="text" className='V_input_text_for_all mt-1 mt-md-2' />
                                </div>
                                <div className="col-12 col-sm-6 pt-2 pt-md-3">
                                    <div>
                                        <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Coin Master ID</label>
                                        <div className='select-wrapper position-relative'>
                                            <div className='ds_sub_select1' onClick={() => setToggle1(!toggle1)}>{redioVal1}</div>
                                            {toggle1 && (<div className='ds_sub_select_box'>
                                                <div className="form-check mb-3" onClick={() => { setRedioVal1("Active"); setToggle1(false) }}>
                                                    <input className="form-check-input ds_sub_check" type="radio" name="exampleRadios" id="exampleRadios1" value="Active" checked={redioVal1 === "Active" && subAdd ? true : false} />
                                                    <label className="form-check-label" htmlFor="exampleRadios1">
                                                        Active
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={() => { setRedioVal1("Block"); setToggle1(false) }}>
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

export default EditVoucher