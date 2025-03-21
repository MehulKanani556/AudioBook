import React, { useState } from 'react';
import '../CSS/login.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { PiEyeLight } from 'react-icons/pi';
import { PiEyeSlash } from 'react-icons/pi';

const Login = () => {
  const [modalShow, setModalShow] = useState(true);
  const [modalShow1, setModalShow1] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const init = {
    email: "",
    password: ""
  }

  const validate = Yup.object({
    email: Yup.string().email().required("Enter Email"),
    password: Yup.string().required("Enter Password")
  })

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: init,
    validationSchema: validate,
    onSubmit: (values) => {
      console.log(values)
    }
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }


  const forgotPassword = () => {
    setModalShow(false);
    setModalShow1(true);
    
  }

  return (
    <>
      <section className='V_login_back'>
        <div className='V_sign_in_1_modal'>
          <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='mb-0'
          >
            <div className="text-white">
              <h1 className='text-center py-4 py-sm-5 V_sign_in'>Sign in</h1>
              <form onSubmit={handleSubmit}>
                <div className='text-center mb-4'>
                  <input 
                    type="email" 
                    name='email' 
                    onChange={handleChange} 
                    onBlur={handleBlur} 
                    value={values.email} 
                    placeholder='Enter email' 
                    className='V_input_1 border-0 ps-2' 
                  />
                  <div>{(errors.email && touched.email) && <span className='text-danger'>{errors.email}</span>}</div>
                </div>
                <div className='justify-content-between d-flex V_input_1 mx-auto border-0'>
                  <div>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      name='password' 
                      onChange={handleChange} 
                      onBlur={handleBlur} 
                      value={values.password} 
                      placeholder='Password' 
                      className='V_password bg-transparent border-0 ps-2' 
                    />
                  </div>
                  <div className='text-end pe-3' onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                    {showPassword ? 
                      <PiEyeSlash className='V_icon_1'/> : 
                      <PiEyeLight className='V_icon_1'/>
                    }
                  </div>
                </div>
                <div className='text-center'>{(errors.password && touched.password) && <span className='text-danger'>{errors.password}</span>}</div>
                <div className="text-danger text-end mx-auto pt-2 V_sign_in_1_modal" onClick={forgotPassword}>Forgot Password?</div>
                <div className='my-4 my-sm-5 text-center'>
                  <button type="submit" className='py-2 V_submit_1 V_sign_in_1_modal'>Sign in</button>
                </div>
              </form>
            </div>
          </Modal>
        </div>




    
          <Modal
            show={modalShow1}
            onHide={() => setModalShow1(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='mb-0'
          >
            <div className="text-white">
              <h1 className='text-center pt-4 pt-sm-5 V_forgot_pwd'>Forgot Password</h1>
              <p className='pb-4 pb-sm-5 text-center V_sub_forgot'>Enter your mail to change your password.</p>
              <form onSubmit={handleSubmit}>
                <div className='text-center mb-4'>
                  <input 
                    type="email" 
                    name='email' 
                    onChange={handleChange} 
                    onBlur={handleBlur} 
                    value={values.email} 
                    placeholder='Enter email' 
                    className='V_input_1 border-0 ps-3' 
                  />
                  <div>{(errors.email && touched.email) && <span className='text-danger'>{errors.email}</span>}</div>
                </div>
                <div className='my-4 my-sm-5 text-center'>
                  <button type="submit" className='py-2 V_submit_1 V_sign_in_1_modal'>Send OTP</button>
                </div>
              </form>
            </div>
          </Modal>

      </section>
    </>
  )
}

export default Login