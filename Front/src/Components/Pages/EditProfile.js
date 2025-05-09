import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../CSS/Profile.css";
import profile from "../../Images/dhruvin/profile_main.png";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { editProfileSchema } from "../Formik";
import {
  editProfileAdmin,
  getSingleAdmin,
} from "../../Toolkit/Slices/EditProfileSlice";

const EditProfile = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [file, setFile] = useState("")
  const [imageFile, seImageFile] = useState("")

  const getAdminData = useSelector((state) => state.editProfile?.getAdmin);
  useEffect(() => {
    dispatch(getSingleAdmin());
  }, []);


  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
    const imageUrl = URL.createObjectURL(file);
      editProfileFormik.setValues({
        ...editProfileFormik.values,
        image: file,
      });
      console.log("HIHIHI" , imageUrl);
      seImageFile(imageUrl)
      setFile(file)
    }
  };

  const admin = getAdminData?.[0] || {};
  // console.log("hihi" , admin);
  
  const editProfileVal = {
    firstName: admin.firstName || "",
    lastName: admin.lastName || "",
    email: admin.email || "",
    mobileNo: admin.mobileNo || "",
    image: file ? file : admin?.image || profile ,
  };

  const editProfileFormik = useFormik({
    initialValues: editProfileVal,
    enableReinitialize: true,
    validationSchema: editProfileSchema,
    onSubmit: (values) => {
      dispatch(editProfileAdmin(values));
      setFile("")
      seImageFile("")
    },
  });

  return (
    <div className="ds_dash_master">
      <div className="ds_dash_main">
        <div className="ds_dash_inner">
          <div>
            <h4 className="text-light pt-4 mb-0">Edit Profile</h4>
            <p>
              <Link
                to="/layout/dashboard"
                className="ds_head_txt ds_role_link text-decoration-none"
              >
                Dashboard /
              </Link>{" "}
              <span className="text-light">Edit Profile</span>
            </p>
          </div>

          <div className="ds_profile_inner p-sm-5 p-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center">
              <div className="d-flex align-items-center ">
                {
                  imageFile ? <div className="ds_profile_box text-center me-4">
                                 <img src={imageFile} alt="" className="h-100"  style={{ width: "100%" , borderRadius:"50%" , objectFit:"cover"}}/>
                             </div> 
                     : editProfileFormik?.values?.image ? (<div className="ds_profile_box text-center me-4">
                    <img src={`${editProfileFormik?.values?.image ? `http://localhost:4000/${editProfileFormik?.values?.image}` : profile }  `} alt="" className="h-100"  style={{ width: "100%" , borderRadius:"50%" , objectFit:"cover"}}/>
                  </div>) : (<div className="ds_profile_box text-center me-4">
                       <img src={profile} alt="" className="mt-3" style={{ width: "75%" }}/>
                  </div>)
                }
                <div>
                  <h5 className="text-light mb-0">
                    {admin.firstName} {admin.lastName}
                  </h5>
                  <p className="text-light">{admin.email}</p>
                </div>
              </div>
              <div className="mt-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <button
                  onClick={handleButtonClick}
                  className="ds_profile_img_btn"
                >
                  <FiUpload />{" "}
                  <span className="ds_profile_text">Upload image</span>
                </button>
              </div>
            </div>
            <div>
              <form onSubmit={editProfileFormik.handleSubmit}>
                <div className="row mt-3">
                  <div className="col-xl-6 col-lg-6 mt-4 ">
                    <div className="">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label ds_role_text"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control ds_profile_input"
                        id="firstName"
                        aria-describedby="emailHelp"
                        name="firstName"
                        value={editProfileFormik.values.firstName}
                        onChange={editProfileFormik.handleChange}
                        onBlur={editProfileFormik.handleBlur}
                      />
                      <p
                        className="text-danger mb-0 text-start ps-1 pt-1"
                        style={{ fontSize: "14px" }}
                      >
                        {editProfileFormik.errors.firstName}
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 mt-4 ">
                    <div className="">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label ds_role_text"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control ds_profile_input"
                        id="lastName"
                        aria-describedby="emailHelp"
                        name="lastName"
                        value={editProfileFormik.values.lastName}
                        onChange={editProfileFormik.handleChange}
                        onBlur={editProfileFormik.handleBlur}
                      />
                      <p
                        className="text-danger mb-0 text-start ps-1 pt-1"
                        style={{ fontSize: "14px" }}
                      >
                        {editProfileFormik.errors.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 mt-4 ">
                    <div className="">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label ds_role_text"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control ds_profile_input"
                        id="email"
                        aria-describedby="emailHelp"
                        name="email"
                        value={editProfileFormik.values.email}
                        onChange={editProfileFormik.handleChange}
                        onBlur={editProfileFormik.handleBlur}
                      />
                      <p
                        className="text-danger mb-0 text-start ps-1 pt-1"
                        style={{ fontSize: "14px" }}
                      >
                        {editProfileFormik.errors.email}
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 mt-4 ">
                    <div className="">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label ds_role_text"
                      >
                        Mobile No.
                      </label>
                      <input
                        type="text"
                        className="form-control ds_profile_input"
                        id="mobileNo"
                        aria-describedby="emailHelp"
                        name="mobileNo"
                        value={editProfileFormik.values.mobileNo}
                        onChange={editProfileFormik.handleChange}
                        onBlur={editProfileFormik.handleBlur}
                      />
                      <p
                        className="text-danger mb-0 text-start ps-1 pt-1"
                        style={{ fontSize: "14px" }}
                      >
                        {editProfileFormik.errors.mobileNo}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 pt-lg-4">
                  <button type="submit" className="ds_role_save">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
