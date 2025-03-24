import React, { useRef, useState } from 'react';
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
  const [modalShowOTP, setModalShowOTP] = useState(false);
  const [modalShowPWD, setModalShowPWD] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [values1, setValues1] = useState({ newPassword: "", confirmPassword: "" });
  

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


  const handleChange2 = (e) => {
    setValues1({ ...values, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }
  const togglePasswordVisibility1 = () => {
    setShowConPassword(!showConPassword);
  }


  const handleSubmit1 = (e) => {
    e.preventDefault();
  
  };


  const forgotPassword = () => {
    setModalShow(false);
    setModalShow1(true);
  }

  const handleOTP = () => {
    setModalShow(false);
    setModalShow1(false);
    setModalShowOTP(true);
  }


  const resetPassword = () => {
    setModalShow(false);
    setModalShow1(false);
    setModalShowOTP(false);
    setModalShowPWD(true);
  }


  const otpLength = 4;
  const [otp, setOtp] = useState(new Array(otpLength).fill(""));
  const inputRefs = useRef([]);

  const handleChange1 = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };




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
                    className='V_input_1  ps-2'
                  />
                  <div>{(errors.email && touched.email) && <span className='text-danger'>{errors.email}</span>}</div>
                </div>
                <div className='justify-content-between d-flex V_input_1 mx-auto'>
                  <div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name='password'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder='Password'
                      className='V_password  bg-transparent border-0 ps-2'
                    />
                  </div>
                  <div className='text-end pe-3' onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                    {showPassword ?
                      <PiEyeSlash className='V_icon_1' /> :
                      <PiEyeLight className='V_icon_1' />
                    }
                  </div>
                </div>
                <div className='text-center'>{(errors.password && touched.password) && <span className='text-danger'>{errors.password}</span>}</div>
                <p className="text-danger text-end mx-auto pt-2 V_sign_in_1_modal" onClick={forgotPassword}>Forgot Password?</p>
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
                  className='V_input_1 ps-3'
                />
              </div>
              <div className='my-4 my-sm-5 text-center'>
                <button type="submit" className='py-2 V_submit_1 V_sign_in_1_modal' onClick={handleOTP}>Send OTP</button>
              </div>
            </form>
          </div>
        </Modal>




        <Modal
          show={modalShowOTP}
          onHide={() => setModalShow1(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className='my-3 my-md-5'
        >
          <div className="text-white">
            <h1 className='text-center pt-4 pt-sm-5 V_forgot_pwd'>Email Verification</h1>
            <p className='pb-4 pb-sm-5 text-center V_sub_forgot'>Code has been successfully sent to example@gmail.com</p>
            <form onSubmit={handleSubmit}>
              <div className='text-center mb-5'>
                <div className='d-flex justify-content-between mx-auto'>
                  <div className='V_sign_in_1_modal_otp '>
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        className="V_input_otp mx-2"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange1(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(el) => (inputRefs.current[index] = el)}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className='my-4 mt-sm-5 mb-sm-2 text-center'>
                <button type="submit" className='py-2 V_submit_1 V_sign_in_1_modal' onClick={resetPassword}>Verify</button>
              </div>
              <p className='V_resend text-center mb-3 mb-sm-5' >Didn’t receive code? <span className='V_resend_otp'> Resend</span></p>
            </form>
          </div>
        </Modal>




        <Modal
          show={modalShowPWD}
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className='mb-0'
        >
          <div className="text-white">
            <h1 className='text-center pt-4 pt-sm-5 V_sign_in'>Reset Password</h1>
            <p className='pb-4 pb-sm-5 text-center V_sub_forgot'>Code has been successfully sent to example@gmail.com</p>
            <form onSubmit={handleSubmit1}>
              <div className='text-center mb-4'>
                <div className='justify-content-between d-flex V_input_1 mx-auto'>
                  <div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name='newPassword'
                      onChange={handleChange2}
                      value={values1.newPassword}
                      placeholder='Enter New Password'
                      className='V_password  bg-transparent border-0 ps-2'
                    />
                  </div>
                  <div className='text-end pe-3' onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                    {showPassword ?
                      <PiEyeSlash className='V_icon_2' /> :
                      <PiEyeLight className='V_icon_2' />
                    }
                  </div>
                </div>
              </div>
              <div className='justify-content-between d-flex V_input_1 mx-auto'>
                <div>
                  <input
                    type={showConPassword ? "text" : "password"}
                    name='confirmPassword'
                    onChange={handleChange2}
                    value={values1.confirmPassword}
                    placeholder='Confirm Password'
                    className='V_password  bg-transparent border-0 ps-2'
                  />
                </div>
                <div className='text-end pe-3' onClick={togglePasswordVisibility1} style={{ cursor: 'pointer' }}>
                  {showConPassword ?
                    <PiEyeSlash className='V_icon_1' /> :
                    <PiEyeLight className='V_icon_1' />
                  }
                </div>
              </div>
              <div className='my-4 my-sm-5 text-center'>
                <button type="submit" className='py-2 V_submit_1 V_sign_in_1_modal'>Reset Password</button>
              </div>
            </form>
          </div>
        </Modal>


      </section>
    </>
  )
}

export default Login