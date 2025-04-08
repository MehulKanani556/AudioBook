import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import '../../CSS/Profile.css'
import profile from '../../Images/dhruvin/profile_main.png'
import { FiUpload } from 'react-icons/fi'

const EditProfile = () => {

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
      fileInputRef.current.click(); 
    };
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
    };

  return (
    <div className='ds_dash_master'>
      <div className='ds_dash_main'>
         <div className='ds_dash_inner'>
            <div>
               <h4 className="text-light pt-4 mb-0">Edit Profile</h4>
               <p><Link to="/layout/dashboard"  className='ds_head_txt ds_role_link text-decoration-none'>Dashboard /</Link> <span className='text-light'>Edit Profile</span></p>
            </div>

            <div className='ds_profile_inner p-sm-5 p-4'>
               <div className='d-flex flex-wrap justify-content-between align-items-center'>
                  <div className='d-flex align-items-center '>
                     <div className='ds_profile_box text-center me-4'>
                       <img src={profile} alt="" className='mt-3' style={{width:"75%"}}/>
                     </div>
                     <div>
                       <h5 className='text-light mb-0'>Johan Patel</h5>
                       <p className='text-light'>johanpatel@gmail.com</p>
                     </div>
                  </div>
                  <div className='mt-4'>
                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange}/>
                    <button onClick={handleButtonClick} className='ds_profile_img_btn'><FiUpload /> <span className='ds_profile_text'>Upload image</span></button>
                  </div>
               </div>
               <div>
                  <div className="row mt-3">
                    <div className="col-xl-6 col-lg-6 mt-4 ">
                      <div className=''>
                         <label for="exampleInputEmail1" class="form-label ds_role_text">First Name</label>
                         <input type="email" class="form-control ds_profile_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                       </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 mt-4 ">
                      <div className=''>
                         <label for="exampleInputEmail1" class="form-label ds_role_text">Last Name</label>
                         <input type="email" class="form-control ds_profile_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                       </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 mt-4 ">
                      <div className=''>
                         <label for="exampleInputEmail1" class="form-label ds_role_text">Email</label>
                         <input type="email" class="form-control ds_profile_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                       </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 mt-4 ">
                      <div className=''>
                         <label for="exampleInputEmail1" class="form-label ds_role_text">Mobile No.</label>
                         <input type="email" class="form-control ds_profile_input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                       </div>
                    </div>
                  </div>
                  <div className='mt-5 pt-lg-4'>
                    <button className='ds_role_save'>Save</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}

export default EditProfile
