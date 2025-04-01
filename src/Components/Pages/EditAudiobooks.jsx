import React, { useState } from 'react'
import '../../CSS/Review.css';


const EditAudiobooks = () => {
    const [toggle, setToggle] = useState(false);
    const [redioVal, setRedioVal] = useState("English");
    const [subAdd, setSubAdd] = useState(false);
    const [fileName, setFileName] = useState("No file chosen");

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setFileName(file ? file.name : "No file chosen");
    };

    return (
        <>
            <div className="ds_dash_master">
                <div className='ds_dash_main'>
                    <div className='ds_dash_inner'>
                        <div>
                            <h2 className="text-light pt-4 mb-0">Edit Audio Book</h2>
                        </div>

                        <div>
                            <div className="row py-5 ">
                                <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                                    <label className='V_label'>Genre ID</label>
                                    <input type="text" className='V_input_text_for_all mt-1 mt-md-2 ' />
                                </div>
                                <div className="col-12 col-sm-6  pt-2 pt-md-3">
                                    <label className='V_label'>Name</label>
                                    <input type="text" className='V_input_text_for_all mt-1 mt-md-2' />
                                </div>
                                <div className="col-12 col-sm-6  pt-2 pt-md-3">
                                    <label className='V_label'>Description</label>
                                    <input type="text" className='V_input_text_for_all mt-1 mt-md-2' />
                                </div>
                                <div className="col-12 col-sm-6 pt-2 pt-md-3">
                                    <div>
                                        <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Sample File</label>

                                        <div class="custom-input-group ">
                                            <input type="text" class="custom-text" placeholder="" value={fileName} readonly />
                                            <label for="fileInput" class="custom-button">CHOOSE</label>
                                            <input type="file" id="fileInput" class="custom-file-input " onChange={handleFileChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6  pt-2 pt-md-3">
                                    <label className='V_label'>Tags</label>
                                    <input type="text" className='V_input_text_for_all mt-1 mt-md-2' />
                                </div>
                                <div className="col-12 col-sm-6 pt-2 pt-md-3">
                                    <div>
                                        <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Language</label>
                                        <div className='select-wrapper position-relative'>
                                            <div className='ds_sub_select1' onClick={() => setToggle(!toggle)}>{redioVal}</div>
                                            {toggle && (<div className='ds_sub_select_box'>
                                                <div className="form-check mb-3" onClick={() => { setRedioVal("English"); setToggle(false) }}>
                                                    <input className="form-check-input ds_sub_check" type="radio" name="exampleRadios" id="exampleRadios1" value="English" checked={redioVal === "English" && subAdd ? true : false} />
                                                    <label className="form-check-label" htmlFor="exampleRadios1">
                                                        English
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={() => { setRedioVal("Franch"); setToggle(false) }}>
                                                    <input className="form-check-input ds_sub_check" type="radio" name="exampleRadios" id="exampleRadios2" value="Franch" checked={redioVal === "Franch" && subAdd ? true : false} />
                                                    <label className="form-check-label" htmlFor="exampleRadios2">
                                                        Franch
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
                                    <button className='ds_sub_cancel' onClick={() => {setSubAdd(false); setFileName("No File Choosen")}}>Clear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditAudiobooks