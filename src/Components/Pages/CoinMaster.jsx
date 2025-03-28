import React from 'react'
import pen from '../../Images/dhruvin/pancil.svg'
import trash from '../../Images/dhruvin/trash.svg'
import eye from '../../Images/dhruvin/eye_icon.svg'
import { Link } from 'react-router-dom'
import '../../CSS/CoinMaster.css'

const CoinMaster = () => {
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
                         <button className='ds_role_btn' ><i className="fa-solid fa-plus me-2"></i> Add</button>
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
                          <tr>
                            <td>01</td>
                            <td>Coin Name</td>
                            <td>₹99</td>
                            <td>Coin Name</td>
                            <td>Label ID</td>
                            <td>03:31</td>
                            <td>20/09/02020</td>
                            <td>
                               <span className='ds_sub_active'>Active</span>
                            </td>
                            <td>
                            <span className='ds_sub_eye ds_cursor me-2'  >
                                <img src={eye} alt=""  />
                            </span>
                              <span className='ds_role_icon ds_cursor me-2' >
                                <img src={pen} alt=""  />
                              </span>
                              <span className='ds_role_icon ds_cursor' >
                                <img src={trash} alt="" />
                              </span>
                            </td>
                          </tr>
    
                          <tr>
                            <td>01</td>
                            <td>Coin Name</td>
                            <td>₹99</td>
                            <td>Coin Name</td>
                            <td>Label ID</td>
                            <td>03:31</td>
                            <td>20/09/02020</td>
                            <td>
                               <span className='ds_sub_block'>Block</span>
                            </td>
                            <td>
                            <span className='ds_sub_eye ds_cursor me-2'  >
                                <img src={eye} alt=""  />
                            </span>
                              <span className='ds_role_icon ds_cursor me-2' >
                                <img src={pen} alt=""  />
                              </span>
                              <span className='ds_role_icon ds_cursor' >
                                <img src={trash} alt="" />
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                   </div>
                </div>
        </div>
    </div>
  )
}

export default CoinMaster
