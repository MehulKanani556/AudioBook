import React, { useEffect, useState } from 'react'
import '../../CSS/CoinMaster.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CoinLabelData } from '../../Toolkit/Slices/CoinLabelSlice';
import { getSingleCoinMaster, UpdateCoinMaster } from '../../Toolkit/Slices/CoinMasterSlice'
import { useFormik } from 'formik';
import { coinMasterSchema } from '../Formik';

const EditCoinMaster = () => {
   const [toggle, setToggle] = useState(false)
   const [redioVal, setRedioVal] = useState("Active")
   const [subCheck, setSubCheck] = useState(true)
   const navigate = useNavigate();
   const labelData = useSelector((state) => state.coinLabel.coinLaData);
   const dispatch = useDispatch();
   const singleData = useSelector((state) => state.coinMaster.singleCoinMaster)
   console.log('slider', singleData)
   const { id } = useParams();
   useEffect(() => {
      dispatch(CoinLabelData());
      dispatch(getSingleCoinMaster(id))
   }, [id])
   console.log('')
   const coinMasterVal = {
      coin: "",
      payment: "",
      freeCoin: "",
      labelID: "",
      isoneTime: "",
      validTill: "",
      status: "",
   };
   useEffect(() => {
      coinMasterFormik.setValues({
         coin: singleData[0]?.coin,
         payment: singleData[0]?.payment,
         freeCoin: singleData[0]?.freeCoins,
         labelID: singleData[0]?.labelId,
         isoneTime: singleData[0]?.isOneTime,
         validTill: singleData[0]?.validTill,
         status: singleData[0]?.status,
      })
      setRedioVal(singleData[0]?.status)
   }, [singleData])
   // const singleCoinMaster = 
   const coinMasterFormik = useFormik({
      initialValues: coinMasterVal,
      validationSchema: coinMasterSchema,
      onSubmit: (values) => {

         dispatch(UpdateCoinMaster({coinMasterData:values,id:id})).then((response)=>{
                console.log(response.payload.success)
                if(response.payload.success){
                  navigate('/admin/coinmaster')
               }
              })
      }
   })


   return (
      <div className='ds_dash_master'>
         <div className='ds_dash_main'>
            <div className="ds_dash_inner">
               <div>
                  <h4 className="text-light pt-4 mb-0">Edit Coin Master</h4>
               </div>
               <form action="" onSubmit={coinMasterFormik.handleSubmit}>
                  <div className="row pt-2">
                     <div className="col-xl-6 col-lg-6 mt-4">
                        <div>
                           <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Coins</label>
                           <input type='text' name='coin' value={coinMasterFormik.values.coin}
                              onChange={coinMasterFormik.handleChange}
                              className="form-control ds_role_input" />
                           <p className='text-danger mb-0 text-start ps-1 pt-1 text-capitalize' style={{ fontSize: "14px" }}>{coinMasterFormik.errors.coin}</p>
                        </div>
                     </div>
                     <div className="col-xl-6 col-lg-6 mt-4">
                        <div>
                           <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Payment</label>
                           <input type='text' name='payment' value={coinMasterFormik.values.payment}
                              onChange={coinMasterFormik.handleChange}
                              className="form-control ds_role_input" />
                           <p className='text-danger mb-0 text-start ps-1 pt-1 text-capitalize' style={{ fontSize: "14px" }}>{coinMasterFormik.errors.payment}</p>
                        </div>
                     </div>
                     <div className="col-xl-6 col-lg-6 mt-4">
                        <div>
                           <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Free Coins</label>
                           <input type='text' name='freeCoin' value={coinMasterFormik.values.freeCoin}
                              onChange={coinMasterFormik.handleChange}
                              className="form-control ds_role_input" />
                           <p className='text-danger mb-0 text-start ps-1 pt-1 text-capitalize' style={{ fontSize: "14px" }}>{coinMasterFormik.errors.freeCoin}</p>
                        </div>
                     </div>
                     <div className="col-xl-6 col-lg-6 mt-4">
                        <div>
                           <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Label ID</label>
                           <select type='text' name='labelID' value={coinMasterFormik.values.labelID}
                              onChange={coinMasterFormik.handleChange}
                              className="form-control ds_role_input" >
                              <option>select Label</option>
                              {labelData.map((ele, id) => {
                                 return (
                                    <option value={ele._id}>{ele.labelName}</option>
                                 )
                              })}
                           </select>
                           <p className='text-danger mb-0 text-start ps-1 pt-1 text-capitalize' style={{ fontSize: "14px" }}>{coinMasterFormik.errors.labelID}</p>
                        </div>
                     </div>
                     <div className="col-xl-6 col-lg-6 mt-4">
                        <div>
                           <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">is one time</label>
                           <input type="time" name='isoneTime' value={coinMasterFormik.values.isoneTime}
                              onChange={coinMasterFormik.handleChange}
                              className="form-control ds_role_input" />
                           <p className='text-danger mb-0 text-start ps-1 pt-1 text-capitalize' style={{ fontSize: "14px" }}>{coinMasterFormik.errors.isoneTime}</p>
                        </div>
                     </div>
                     <div className="col-xl-6 col-lg-6 mt-4">
                        <div>
                           <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Valid till</label>
                           <input type='date' name='validTill' value={coinMasterFormik.values.validTill}
                              onChange={coinMasterFormik.handleChange}
                              className="form-control ds_role_input" />
                           <p className='text-danger mb-0 text-start ps-1 pt-1 text-capitalize' style={{ fontSize: "14px" }}>{coinMasterFormik.errors.validTill}</p>
                        </div>
                     </div>
                     <div className="col-xl-6 col-lg-6 mt-4">
                        <div>
                           <label htmlFor="exampleInputEmail1" className="form-label ds_role_text">Status</label>
                           <div className='select-wrapper position-relative'>
                              <div className='ds_sub_select' onClick={() => { setToggle(!toggle); }}>{redioVal}</div>
                              {toggle && (<div className='ds_sub_select_box'>
                                 <div className="form-check mb-3" onClick={() => { setRedioVal("Active"); setToggle(false); coinMasterFormik.setValues({ ...coinMasterFormik.values, status: "Active" }); }}>
                                    <input className="form-check-input ds_sub_check" type="radio" value="Active" checked={redioVal === "Active" && subCheck ? true : false} />
                                    <label className="form-check-label" htmlFor="exampleRadios1">
                                       Active
                                    </label>
                                 </div>
                                 <div className="form-check" onClick={() => { setRedioVal("Block"); setToggle(false); coinMasterFormik.setValues({ ...coinMasterFormik.values, status: "Block" }); }}>
                                    <input className="form-check-input ds_sub_check" type="radio" value="Block" checked={redioVal === "Block" && subCheck ? true : false} />
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
                  <div className='text-center mt-5 pt-lg-5 mb-lg-0 pb-4'>
                     <button type='submit' className='ds_role_save'>Save</button>
                     <button className='ds_sub_cancel'>Clear</button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   )
}

export default EditCoinMaster
