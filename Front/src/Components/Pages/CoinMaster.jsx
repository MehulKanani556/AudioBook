import React, { useEffect, useState } from 'react'
import pen from '../../Images/dhruvin/pancil.svg'
import trash from '../../Images/dhruvin/trash.svg'
import eye from '../../Images/dhruvin/eye_icon.svg'
import { Link, useNavigate } from 'react-router-dom'
import '../../CSS/CoinMaster.css'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getCoinMaster } from '../../Toolkit/Slices/CoinMasterSlice'

const CoinMaster = () => {

 const navigate = useNavigate()
 const [currentPage, setCurrentPage] = useState(1);
 const [coinEye, setCoinEye] = useState(false)
 const [coinRemove, setCoinRemove] = useState(false)
 const [currentData,setCurrentData] = useState([]);

//  backend implementation code here
const dispatch = useDispatch();
const coinMasterData = useSelector((state) => state.coinMaster.coinMaster);
const itemPerPage =10;
var totalPages = Math.ceil(coinMasterData.length / itemPerPage);


useEffect(() => {
  dispatch(getCoinMaster())
}, [])


// pagination code handling
useEffect(() => {
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const paginatedData = coinMasterData.slice(startIndex, endIndex);
  setCurrentData(paginatedData);
}, [currentPage, coinMasterData]);


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
    <div className='ds_dash_master'>
        <div className='ds_dash_main'>
            <div className="ds_dash_inner">
                <div className='d-flex justify-content-between align-items-center'>
                        <div>
                           <h4 className="text-light pt-4 mb-0">Coin Master</h4>
                           <p><Link to="/layout/dashboard" className='ds_head_txt ds_role_link text-decoration-none'>Dashboard /</Link> <span className='text-light'>Coin Master</span></p>
                        </div>
                       <div>
                         <button className='ds_role_btn' onClick={()=>navigate("/layout/addcoinmaster")} ><i className="fa-solid fa-plus me-2"></i> Add</button>
                       </div>
                    </div>
    
                    <div className='ds_role_bg mt-2'>
                    <div className='ds_table_wrapper overflow-auto'>
                      <table className='w-100 text-light ds_coin_master'>
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Coins</th>
                            <th>Payment</th>
                            <th>Free Coins</th>
                            <th>Label ID </th>
                            <th>is one time(Boolen)</th>
                            <th>Valid till</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {currentData.map((ele,ind)=>{
                          return(
                            <tr>
                            <td>{((currentPage - 1) * 10) +( ind + 1 )}</td>
                            <td>{ele.coin}</td>
                            <td>₹{ele.payment}</td>
                            <td>{ele.freeCoins}</td>
                            <td>{ele.labelId}</td>
                            <td>{ele.isOneTime}</td>
                            <td>{ele.validTill}</td>
                            <td>
                               <span className='ds_sub_active'>{ele.status}</span>
                            </td>
                            <td>
                            <span className='ds_sub_eye ds_cursor me-2' onClick={()=> setCoinEye(true)} >
                                <img src={eye} alt=""  />
                            </span>
                              <span className='ds_role_icon ds_cursor me-2' onClick={()=> navigate("/layout/editcoinmaster")} >
                                <img src={pen} alt=""  />
                              </span>
                              <span className='ds_role_icon ds_cursor' onClick={()=> setCoinRemove(true)}>
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


         {/* ******************* Coin Master Details ************* */}
         <Modal show={coinEye} onHide={()=> setCoinEye(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" className='text-light ds_coin_master_detail' centered>
          <Modal.Header className='border-0' >
            <Modal.Title id="contained-modal-title-vcenter" className='w-100'>
               <div className='d-flex justify-content-between align-items-center w-100'>
                  <div>
                     Coin Master Details
                  </div>
                  <i className="fa-solid fa-xmark ds_cursor" onClick={()=> setCoinEye(false)}></i>
               </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="row">
                 <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                   <div className='d-flex justify-content-between mb-2'>
                      <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>Coins</h5>
                      <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                   </div>
                   <div className='d-flex justify-content-between mb-2'>
                      <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>Payment</h5>
                      <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                   </div>
                   <div className='d-flex justify-content-between mb-2'>
                      <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>Free Coins</h5>
                      <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                   </div>
                   <div className='d-flex justify-content-between mb-2'>
                      <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>Label ID</h5>
                      <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                   </div>
                   <div className='d-flex justify-content-between mb-2'>
                      <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>is one time</h5>
                      <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                   </div>
                   <div className='d-flex justify-content-between mb-2'>
                      <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>Valid till</h5>
                      <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                   </div>
                   <div className='d-flex justify-content-between mb-2'>
                      <h5 className='ds_role_text ds_coin_master_text' style={{fontWeight:"300"}}>Status</h5>
                      <h5 className='ds_role_text ds_coin_master_text'>:</h5>
                   </div>
                 </div>
                 <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                   <div>
                      <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >Coin Name</h5>
                      <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >₹99</h5>
                      <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >Coin Name</h5>
                      <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >Label ID</h5>
                      <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >03:31</h5>
                      <h5 className='text-light mb-3 ds_coin_master_text' style={{fontWeight:"400"}} >20/09/02020</h5>
                      <h5 className='text-light ds_coin_master_text' style={{fontWeight:"400"}} >Active</h5>
                   </div>
                 </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        {/* **************** Delete Coin **************** */}
        <Modal show={coinRemove} onHide={()=> setCoinRemove(false)} size="md" aria-labelledby="contained-modal-title-vcenter " className='text-light ds_role_delete_modal' centered>
         <Modal.Body >
            <div className='text-center'>
               <h4 className='mt-4'>Delete</h4>
               <p className='ds_role_text'>Are you sure you want to delete Subscription ?</p>
               <div className='mt-5 mb-5'>
                 <button className='ds_delete_cancel' onClick={()=> setCoinRemove(false)}>Cancel</button>
                 <button className='ds_delete_yes'>Yes</button>
               </div>
            </div>
         </Modal.Body>
       </Modal>
    </div>
  )
}

export default CoinMaster
