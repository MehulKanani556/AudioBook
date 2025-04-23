import React, { useEffect, useRef, useState } from "react";
import "../CSS/login.css";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { LoginSchema } from "./Formik";
import { LoginAdmin } from "../Toolkit/Slices/LoginSlices";

const Login = () => {
  const [toggle, setToggle] = useState(false);
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [inputType, setInputType] = useState("password");
  const [inputType1, setInputType1] = useState("password");
  const [pageToggle, setPageToggle] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [otp, setOtp] = useState(["", "", "", ""]); // Stores the OTP input values
  const inputRefs = useRef([]); // Ref to manage input focus

  useEffect(() => {
    if (token) {
      navigate("/layout/dashboard", { replace: true });
    }
  }, [token, navigate]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Allow only digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace and move to previous input
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Clear OTP fields when "Resend" is clicked
  const handleResend = () => {
    setOtp(["", "", "", ""]);
    inputRefs.current[0].focus(); // Focus back to the first input
  };

  const Values = {
    email: "",
    password: "",
  };

  const LoginFromik = useFormik({
    initialValues: Values,
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      dispatch(LoginAdmin(values))
        .then(() => {
          navigate("/layout/dashboard", { replace: true });
        })
        .catch((error) => {
          console.error("Login failed:", error);
        });
    },
  });

  return (
    <>
      <section
        className={`V_login_back ${
          pageToggle === "login" ? "d-block" : "d-none"
        }`}
      >
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-xl-4 col-lg-5 col-md-7 col-10 text-white V_back text-center p-sm-5 p-4">
            <form onSubmit={LoginFromik.handleSubmit}>
              <h2 className="">Sign in</h2>
              <input
                type="text"
                name="email"
                value={LoginFromik.values.email}
                onChange={LoginFromik.handleChange}
                onBlur={LoginFromik.handleBlur}
                placeholder="Enter email"
                className="V_input ps-4 mt-4 mt-sm-5 "
              />
              <p
                className="text-danger mb-0 text-start ps-1 pt-1"
                style={{ fontSize: "14px" }}
              >
                {LoginFromik.errors.email}
              </p>
              <div className="position-relative mt-4 mt-sm-5">
                <input
                  type={inputType}
                  name="password"
                  value={LoginFromik.values.password}
                  onChange={LoginFromik.handleChange}
                  onBlur={LoginFromik.handleBlur}
                  placeholder="Password"
                  className="V_input ps-4 "
                />
                <p
                  className="text-danger mb-0 text-start ps-1 pt-1"
                  style={{ fontSize: "14px" }}
                >
                  {LoginFromik.errors.password}
                </p>

                {toggle ? (
                  <IoIosEye
                    className=" V_eye ds_cursor"
                    onClick={() => {
                      setToggle(false);
                      setInputType("password");
                    }}
                  />
                ) : (
                  <IoIosEyeOff
                    className=" V_eye ds_cursor"
                    onClick={() => {
                      setToggle(true);
                      setInputType("text");
                    }}
                  />
                )}
              </div>
              <div
                className="text-end pt-2 V_forgot ds_cursor"
                onClick={() => {
                  setPageToggle(true);
                  setPageToggle("password");
                }}
              >
                Forgot Password?{" "}
              </div>
              <button type="submit" className="V_signup_btn mt-4 mt-sm-5">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </section>

      <section
        className={`V_login_back2 ${
          pageToggle === "password" ? "d-block " : "d-none"
        }`}
      >
        <div className="row justify-content-center align-items-center h-100 ">
          <div className="col-xl-4 col-lg-5 col-md-7 col-10 text-white V_back text-center p-sm-5 p-4">
            <h2 className="">Forgot Password</h2>
            <p className="mt-3 V_P_class">
              Enter your mail to change your password.
            </p>
            <input
              type="text"
              placeholder="Enter email"
              className="V_input ps-4 my-4 my-sm-5 "
            />
            <button
              className="V_signup_btn mt-4 mt-sm-5"
              onClick={() => {
                setPageToggle(true);
                setPageToggle("otp");
              }}
            >
              Send OTP
            </button>
          </div>
        </div>
      </section>

      <section
        className={`V_login_back2 ${
          pageToggle === "otp" ? "d-block" : "d-none"
        }`}
      >
        <div className="row justify-content-center align-items-center h-100 ">
          <div className="col-xl-4 col-lg-5 col-md-7 col-10 text-white V_back text-center p-sm-5 p-4">
            <h2 className="">Email Verification</h2>
            <p className="mt-3 V_P_class">
              Code has been successfully sent to example@gmail.com
            </p>
            <div className="d-flex justify-content-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  className="V_otp my-3 text-center"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              ))}
            </div>
            <button
              className="V_signup_btn mt-4 mt-sm-5"
              onClick={() => {
                setPageToggle(true);
                setPageToggle("reset");
              }}
            >
              Verify
            </button>
            <p className="mt-3 V_P_class">
              Didn’t receive code?{" "}
              <span className="V_resend" onClick={handleResend}>
                Resend
              </span>
            </p>
          </div>
        </div>
      </section>

      <section
        className={`V_login_back2 ${
          pageToggle === "reset" ? "d-block" : "d-none"
        }`}
      >
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-xl-4 col-lg-5 col-md-7 col-10 text-white V_back text-center p-sm-5 p-4">
            <h2 className="">Reset Password</h2>
            <p className="mt-3">Reset your password here!</p>

            <div className="position-relative mt-4 mt-sm-5">
              <input
                type={inputType1}
                placeholder="Password"
                className="V_input ps-4 "
              />

              {toggle1 ? (
                <IoIosEye
                  className=" V_eye ds_cursor"
                  onClick={() => {
                    setToggle1(false);
                    setInputType1("password");
                  }}
                />
              ) : (
                <IoIosEyeOff
                  className=" V_eye ds_cursor"
                  onClick={() => {
                    setToggle1(true);
                    setInputType1("text");
                  }}
                />
              )}
            </div>
            <div className="position-relative mt-4 mt-sm-5">
              <input
                type={inputType}
                placeholder="Password"
                className="V_input ps-4 "
              />

              {toggle2 ? (
                <IoIosEye
                  className=" V_eye ds_cursor"
                  onClick={() => {
                    setToggle2(false);
                    setInputType("password");
                  }}
                />
              ) : (
                <IoIosEyeOff
                  className=" V_eye ds_cursor"
                  onClick={() => {
                    setToggle2(true);
                    setInputType("text");
                  }}
                />
              )}
            </div>
            {/* <div className='text-end pt-2 V_forgot'>Forgot Password? </div> */}
            <button className="V_signup_btn mt-5">Reset Password</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
