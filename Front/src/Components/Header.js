import React, { useEffect, useState } from "react";
import React, { use, useEffect, useRef, useState } from "react";
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
import { changePassAdmin, getSingleAdmin } from "../Toolkit/Slices/EditProfileSlice";
import { changePassAdmin } from "../Toolkit/Slices/EditProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Close from "../Images/Parth/close_button.png"
import { getReview } from "../Toolkit/Slices/reviewSlice";

const Header = ({ setOffToggle }) => {
  const [toggle, setToggle] = useState(false);
  const [profileToggle, setProfileToggle] = useState(false);
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [passwordText, setPasswordText] = useState("password");
  const [passwordText2, setPasswordText2] = useState("password");
  const [passwordText3, setPasswordText3] = useState("password");
  const [logOut, setLogOut] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [selectData, setselectData] = useState();
  const [searchModal, setsearchModal] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const reviews = useSelector((state) => state.review.review || []); // fallback to [] in case it's undefined

  const notification = reviews
    .slice() // make a shallow copy to avoid mutating Redux state
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // sort by newest
    .slice(0, 3); // take top 3

  console.log('notification', notification);
  const navigate = useNavigate();
  const API_URL = "http://localhost:4000/api";

  const dispatch = useDispatch();

  const getAdminData = useSelector((state) => state.editProfile?.getAdmin);
  useEffect(() => {
    dispatch(getSingleAdmin());
  }, []);

  const admin = getAdminData?.[0]
  console.log("new created" ,admin);
  

  useEffect(() => {
    dispatch(getReview());
  }, [])
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

  const handleSearch = async (value) => {
    console.log('searchData', value);
    if (value.length > 0) {
      setsearchModal(true);
      try {
        const response = await axios.get(`${API_URL}/globalSearch?query=` + value,);

        console.log('hey', response.data.data);
        setSearchData(response.data.data)
      } catch (error) {
        if (error.status === 404) {
          console.error("Get Coin Label Error:", error.status);
          var data = [];
          return data;
        }
        console.error("LoginAdmin Error:", error.message);
      }
    }
    else {
      setsearchModal(false);
    }
  }


  // for chnaging date format
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };
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
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              />
              <div className="ds_search">
                <img src={search} alt="" />
              </div>
              {searchModal && (
                <div className="sp_search_box">
                  {Object.values(searchData).every((val) => val.length === 0) ? (
                    <p className="text-center text-muted py-5 ">Data not found</p>
                  ) : (
                    Object.entries(searchData).map(([key, value]) =>
                      value.length > 0 && (
                        <div key={key} className="mb-3">
                          <h5 className="p-3">{key}</h5>
                          <ul className="list-unstyled">
                            {value.map((item, idx) => (
                              <li
                                key={idx}
                                className=""
                                onClick={() => {
                                  setViewModal(true);
                                  setselectData({ ...item, key });
                                }}
                              >
                                {key === "roles"
                                  ? item?.roleName
                                  : key === "users"
                                    ? item?.firstName
                                    : key === "reviews"
                                      ? item?.review
                                      : key === "homeLabels"
                                        ? item?.labelName
                                        : item?.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    )
                  )}
                </div>
              )}
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
                {admin?.image ? <img src={`http://localhost:4000/${admin?.image}`} alt="" className="ds_profile_img_main ds_cursor" onClick={() => {  setProfileToggle(!profileToggle);   setToggle(false); }}/> : <img src={profile} alt="" className="ds_profile_img ds_cursor" onClick={() => {  setProfileToggle(!profileToggle);   setToggle(false); }}/>}
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
                  {notification.length > 0 ?
                    <div className="">
                      {notification.map((item) => (
                        <div className="px-4 py-3" key={item._id}>
                          <h5 className="text-light">{item?.userData?.[0]?.firstName}</h5>
                          <p className="ds_head_txt ds_lh mb-1" style={{ fontSize: '12px' }} >{item.review}</p>
                          <p className="ds_head_text" style={{ fontSize: '14px' }}>{formatDate(item.createdAt)}</p>
                          <div className="ds_border"></div>
                        </div>
                      ))}
                    </div>
                    :
                    <div className="">
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
                  }
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


        {/* =================++++++++++++ selectData view modal */}
        {console.log(selectData)}
        <div className=''>
          <Modal
            show={viewModal}
            onHide={() => setViewModal(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            className='text-white V_modal_width '
            centered>
            <Modal.Header className='V_modal_header text-capitalize'>
              <Modal.Title id="contained-modal-title-vcenter" className='px-md-5 w-100' >
                <div className="d-flex justify-content-between ">
                  <div>
                    {selectData?.key} Details
                  </div>
                  <div className='ms-auto ds_cursor' onClick={() => setViewModal(false)}>
                    <img src={Close} alt="" />
                  </div>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="  px-md-5 text-capitalize">
                {selectData && (
                  Object.entries(selectData).map(([key, value]) => (
                    (key !== '_id' && key !== 'password' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'key' && key !== 'coinMaster' && key !== 'subScriptionSellId') && (
                      <div className="row" key={key}>
                        <div className="col-6 pt-2 pt-sm-0">
                          <p className='V_label2 mb-0'>{key}</p>
                        </div>
                        <div className="col-6 pt-2 pt-sm-0">
                          <p>:
                            {(key === 'sampleFile' || key === 'image' || key === 'generImage' || key === 'crewImage') ? (
                              <img src={`http://localhost:4000/${String(value)}`} alt={value} className='ms-2 V_home_corousel_image' />
                            ) : (key === 'user') ? (
                              <span className='ms-2 V_label1 text-break'>
                                {value?.firstName || 'N/A'}
                              </span>
                            ) : Array.isArray(value) ? (
                              value.map((item, idx) => (
                                <span key={idx} className='ms-2 V_label1 text-break'>
                                  {key === 'roleData' ? item?.roleName : item?.name || String(item)}
                                  {idx < value.length - 1 && ', '}
                                </span>
                              ))
                            ) : (typeof value === 'object' && value !== null) ? (
                              <span className='ms-2 V_label1 text-break'>
                                {key === 'roleData' ? value?.roleName : value?.name || JSON.stringify(value)}
                              </span>
                            ) : (
                              <span className='ms-2 V_label1 text-break'>
                                {(key === 'price' || key === 'amount') ? `₹ ${String(value)}` : String(value)}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    )
                  ))
                )}
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Header;
