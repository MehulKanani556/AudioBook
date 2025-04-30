import React, { useState } from "react";
import "../CSS/Header.css";
import search from "../Images/dhruvin/search.svg";
import bell from "../Images/dhruvin/bell.svg";
import profile from "../Images/dhruvin/Profile.svg";
import cancel from "../Images/dhruvin/cancel.svg";
import noti from "../Images/dhruvin/notification.png";
import pen from "../Images/dhruvin/white_pen.svg";
import lock from "../Images/dhruvin/lock.svg";
import logout from "../Images/dhruvin/log_out.svg";
import { Modal } from "react-bootstrap";
import "../CSS/Header.css";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { changePassSchema } from "./Formik";
import { changePassAdmin } from "../Toolkit/Slices/EditProfileSlice";
import { useDispatch } from "react-redux";

const Header = ({ setOffToggle }) => {
  const [toggle, setToggle] = useState(false);
  const [profileToggle, setProfileToggle] = useState(false);
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [passwordText, setPasswordText] = useState("password");
  const [passwordText2, setPasswordText2] = useState("password");
  const [passwordText3, setPasswordText3] = useState("password");
  const [logOut, setLogOut] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const changePassval = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const changePassFormik = useFormik({
    initialValues: changePassval,
    validationSchema: changePassSchema,
    onSubmit: (values) => {
      dispatch(changePassAdmin(values));
    },
  });

  return (
    <div>
      <div className="ds_header_img">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-md-none d-block">
            <h3 className="text-light text-center pt-3 ms-sm-4 ms-2 ds_head_logo">
              LOGO
            </h3>
          </div>
          <div>
            <div className="position-relative ms-sm-3 ms-1">
              <input
                type="text"
                className="ds_header_input"
                placeholder="Search.."
              />
              <div className="ds_search">
                <img src={search} alt="" />
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center mt-2 position-relative">
            <div className="ds_noti_bell">
              <img
                src={bell}
                alt=""
                className="ds_cursor ds_noti_img"
                onClick={() => {
                  setToggle(true);
                  setProfileToggle(false);
                }}
              />
            </div>
            <div className="ds_noti_bell">
              <img
                src={profile}
                alt=""
                className="ds_profile_img ds_cursor"
                onClick={() => {
                  setProfileToggle(!profileToggle);
                  setToggle(false);
                }}
              />
            </div>
            <div className="d-md-none d-block">
              <i
                className="fa-solid fa-bars text-light fs-4 me-sm-3 me-2"
                onClick={() => setOffToggle(true)}
              ></i>
            </div>

            {toggle === true && (
              <div className="ds_notifi">
                <div>
                  <div className="d-flex justify-content-between px-4 py-3">
                    <h6 className="text-light mb-0">Notification</h6>
                    <div>
                      <img
                        src={cancel}
                        alt=""
                        className="ds_cursor"
                        onClick={() => setToggle(false)}
                      />
                    </div>
                  </div>
                  <div className="ds_border"></div>
                  <div className="d-none">
                    <div className="px-4 py-3">
                      <h5 className="text-light">Lorem Ipsum</h5>
                      <p className="ds_head_txt ds_lh">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                      <p className="ds_head_text">24 Aug 2024, 14:24</p>
                      <div className="ds_border"></div>
                    </div>
                    <div className="px-4 pt-1">
                      <h5 className="text-light">Lorem Ipsum</h5>
                      <p className="ds_head_txt ds_lh">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                      <p className="ds_head_text">24 Aug 2024, 14:24</p>
                      <div className="ds_border"></div>
                    </div>
                    <div className="px-4 pt-3">
                      <h5 className="text-light">Lorem Ipsum</h5>
                      <p className="ds_head_txt ds_lh">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                      <p className="ds_head_text">24 Aug 2024, 14:24</p>
                      <div className="ds_border"></div>
                    </div>
                  </div>
                </div>

                <div className="d-non">
                  <div className="ds_notification">
                    <div className="d-flex justify-content-center align-items-center h-100">
                      <div className="text-center">
                        <img src={noti} alt="" width="50%" />
                        <h5 className="text-light">No notifications</h5>
                        <p className="ds_head_text mx-xl-5 px-5 ds_lh">
                          There is no notification to show right now.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {profileToggle && (
              <div className="ds_profile">
                <div className="p-3">
                  <div
                    className="d-flex align-items-center ds_cursor"
                    onClick={() => navigate("/admin/profile")}
                  >
                    <img
                      src={pen}
                      alt=""
                      className="me-3 align-self-baseline mt-1"
                    />
                    <p className="text-light">Edit Profile</p>
                  </div>
                  <div
                    className="d-flex align-items-center ds_cursor"
                    onClick={() => setPasswordToggle(true)}
                  >
                    <img
                      src={lock}
                      alt=""
                      className="me-3 align-self-baseline mt-1"
                    />
                    <p className="text-light">Change Password</p>
                  </div>
                  <div
                    className="d-flex align-items-center ds_cursor"
                    onClick={() => setLogOut(true)}
                  >
                    <img
                      src={logout}
                      alt=""
                      className="me-3 align-self-baseline mt-1"
                    />
                    <p className="text-light mb-0">Logout</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* *************** Forgot Password ************** */}
        <Modal
          show={passwordToggle}
          className="ds_head_modal"
          onHide={() => setPasswordToggle(false)}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body className="ds_header_password p-4">
            <div className="px-3 pt-3 pb-3">
              <h5 className="text-center text-white">Change Password</h5>
              <form onSubmit={changePassFormik.handleSubmit}>
                <div className="mt-4 pt-2">
                  <div>
                    <div className="position-relative">
                      <input
                        type={passwordText}
                        className="ds_profile_input w-100 py-2"
                        name="oldPassword"
                        value={changePassFormik.values.oldPassword}
                        onChange={changePassFormik.handleChange}
                        onBlur={changePassFormik.handleBlur}
                        placeholder="Old Password"
                      />
                      <p
                        className="text-danger mb-0 text-start ps-1 pt-1"
                        style={{ fontSize: "14px" }}
                      >
                        {changePassFormik.errors.oldPassword}
                      </p>
                      {passwordText === "password" ? (
                        <IoIosEyeOff
                          onClick={() => setPasswordText("text")}
                          className="text-light ds_head_eye ds_cursor"
                        />
                      ) : (
                        <IoIosEye
                          onClick={() => setPasswordText("password")}
                          className="text-light ds_head_eye ds_cursor"
                        />
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="position-relative">
                      <input
                        type={passwordText2}
                        className="ds_profile_input w-100 py-2"
                        name="newPassword"
                        value={changePassFormik.values.newPassword}
                        onChange={changePassFormik.handleChange}
                        onBlur={changePassFormik.handleBlur}
                        placeholder="Enter New Password"
                      />
                      <p
                        className="text-danger mb-0 text-start ps-1 pt-1"
                        style={{ fontSize: "14px" }}
                      >
                        {changePassFormik.errors.newPassword}
                      </p>
                      {passwordText2 === "password" ? (
                        <IoIosEyeOff
                          onClick={() => setPasswordText2("text")}
                          className="text-light ds_head_eye ds_cursor"
                        />
                      ) : (
                        <IoIosEye
                          onClick={() => setPasswordText2("password")}
                          className="text-light ds_head_eye ds_cursor"
                        />
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="position-relative">
                      <input
                        type={passwordText3}
                        className="ds_profile_input w-100 py-2"
                        name="confirmPassword"
                        value={changePassFormik.values.confirmPassword}
                        onChange={changePassFormik.handleChange}
                        onBlur={changePassFormik.handleBlur}
                        placeholder="Enter New Password"
                      />
                      <p
                        className="text-danger mb-0 text-start ps-1 pt-1"
                        style={{ fontSize: "14px" }}
                      >
                        {changePassFormik.errors.confirmPassword}
                      </p>
                      {passwordText3 === "password" ? (
                        <IoIosEyeOff
                          onClick={() => setPasswordText3("text")}
                          className="text-light ds_head_eye ds_cursor"
                        />
                      ) : (
                        <IoIosEye
                          onClick={() => setPasswordText3("password")}
                          className="text-light ds_head_eye ds_cursor"
                        />
                      )}
                    </div>
                  </div>

                  <div className="mt-5 pt-1 mb-3">
                    <button className="ds_role_btn w-100">
                      Reset Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>

        {/* *************** Forgot Password ************** */}
        <Modal
          show={logOut}
          className="ds_head_modal"
          onHide={() => setLogOut(false)}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body className="ds_header_password py-5 px-3">
            <div>
              <h5 className="text-center text-white">Logout</h5>
              <p
                className="text-center"
                style={{ color: "rgba(198, 198, 198, 1)" }}
              >
                Are you sure you want to Logout?
              </p>
              <div className="text-center mt-5 mb-2">
                <button
                  className="ds_role_cancel me-4"
                  onClick={() => setLogOut(false)}
                >
                  Cancel
                </button>
                <button
                  className="ds_log_yes"
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/")
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Header;
