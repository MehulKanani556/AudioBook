import langs from "langs";
import React, { useState } from "react";
import { editUserMasterSchema } from "../Formik";
import { useFormik } from "formik";

const EditUserMaster = () => {
  const [toggle, setToggle] = useState(false);
  const [redioVal, setRedioVal] = useState("Active");
  const [subCheck, setSubCheck] = useState(true);

  const [toggle2, setToggle2] = useState(false);
  const [redioVal2, setRedioVal2] = useState("Active");
  const [subCheck2, setSubCheck2] = useState(true);

  const language = langs.all();

  const editUserMasterVal = {
    email: "",
    phone: "",
    password: "",
    roleId: "",
    bio: "",
    age: "",
    occupation: "",
    studentVerificationStatus: redioVal,
    studentIdImage: "",
    coins: "",
    language: "",
    image: "",
    status: redioVal2,
  };

  const editUserMasterFormik = useFormik({
    initialValues: editUserMasterVal,
    enableReinitialize: true,
    validationSchema: editUserMasterSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="ds_dash_master">
      <div className="ds_dash_main">
        <div className="ds_dash_inner">
          <div>
            <h4 className="text-light pt-4 mb-0">Edit User Master</h4>
          </div>
          <form onSubmit={editUserMasterFormik.handleSubmit}>
            <div className="row pt-2">
              <div className="col-xl-6 col-lg-6 mt-4">
                <div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label ds_role_text"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control ds_role_input"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="email"
                    value={editUserMasterFormik.values.email}
                    onChange={editUserMasterFormik.handleChange}
                    onBlur={editUserMasterFormik.handleBlur}
                  />
                  <p
                    className="text-danger mb-0 text-start ps-1 pt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {editUserMasterFormik.errors.email}
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 mt-4">
                <div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label ds_role_text"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    className="form-control ds_role_input"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="phone"
                    value={editUserMasterFormik.values.phone}
                    onChange={editUserMasterFormik.handleChange}
                    onBlur={editUserMasterFormik.handleBlur}
                  />
                  <p
                    className="text-danger mb-0 text-start ps-1 pt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {editUserMasterFormik.errors.phone}
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 mt-4">
                <div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label ds_role_text"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control ds_role_input"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="password"
                    value={editUserMasterFormik.values.password}
                    onChange={editUserMasterFormik.handleChange}
                    onBlur={editUserMasterFormik.handleBlur}
                  />
                  <p
                    className="text-danger mb-0 text-start ps-1 pt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {editUserMasterFormik.errors.password}
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 mt-4">
                <div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label ds_role_text"
                  >
                    Role ID
                  </label>
                  <input
                    type="text"
                    className="form-control ds_role_input"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="roleId"
                    value={editUserMasterFormik.values.roleId}
                    onChange={editUserMasterFormik.handleChange}
                    onBlur={editUserMasterFormik.handleBlur}
                  />
                  <p
                    className="text-danger mb-0 text-start ps-1 pt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {editUserMasterFormik.errors.roleId}
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 mt-4">
                <div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label ds_role_text"
                  >
                    Bio
                  </label>
                  <input
                    type="text"
                    className="form-control ds_role_input"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="bio"
                    value={editUserMasterFormik.values.bio}
                    onChange={editUserMasterFormik.handleChange}
                    onBlur={editUserMasterFormik.handleBlur}
                  />
                  <p
                    className="text-danger mb-0 text-start ps-1 pt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {editUserMasterFormik.errors.bio}
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 mt-4">
                <div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label ds_role_text"
                  >
                    Age
                  </label>
                  <input
                    type="text"
                    className="form-control ds_role_input"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="age"
                    value={editUserMasterFormik.values.age}
                    onChange={editUserMasterFormik.handleChange}
                    onBlur={editUserMasterFormik.handleBlur}
                  />
                  <p
                    className="text-danger mb-0 text-start ps-1 pt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {editUserMasterFormik.errors.age}
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 mt-4">
                <div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label ds_role_text"
                  >
                    Occupation
                  </label>
                  <input
                    type="text"
                    className="form-control ds_role_input"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="occupation"
                    value={editUserMasterFormik.values.occupation}
                    onChange={editUserMasterFormik.handleChange}
                    onBlur={editUserMasterFormik.handleBlur}
                  />
                  <p
                    className="text-danger mb-0 text-start ps-1 pt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {editUserMasterFormik.errors.occupation}
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 mt-4">
                <div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label ds_role_text"
                  >
                    student_verification_status
                  </label>
                  <div className="select-wrapper position-relative">
                    <div
                      className="ds_sub_select"
                      onClick={() => setToggle(!toggle)}
                    >
                      {redioVal}
                    </div>
                    {toggle && (
                      <div className="ds_sub_select_box">
                        <div
                          className="form-check mb-3"
                          onClick={() => {
                            setRedioVal("Active");
                            setToggle(false);
                          }}
                        >
                          <input
                            className="form-check-input ds_sub_check"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios1"
                            value="Active"
                            checked={
                              redioVal === "Active" && subCheck ? true : false
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios1"
                          >
                            Active
                          </label>
                        </div>
                        <div
                          className="form-check"
                          onClick={() => {
                            setRedioVal("Block");
                            setToggle(false);
                          }}
                        >
                          <input
                            className="form-check-input ds_sub_check"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios2"
                            value="Block"
                            checked={
                              redioVal === "Block" && subCheck ? true : false
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios2"
                          >
                            Block
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 mt-4">
                <div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label ds_role_text"
                  >
                    student_ID_image
                  </label>
                  <input
                    type="text"
                    className="form-control ds_role_input"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="studentIdImage"
                    value={editUserMasterFormik.values.studentIdImage}
                    onChange={editUserMasterFormik.handleChange}
                    onBlur={editUserMasterFormik.handleBlur}
                  />
                  <p
                    className="text-danger mb-0 text-start ps-1 pt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {editUserMasterFormik.errors.studentIdImage}
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 mt-4">
                <div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label ds_role_text"
                  >
                    Coins
                  </label>
                  <input
                    type="text"
                    className="form-control ds_role_input"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="coins"
                    value={editUserMasterFormik.values.coins}
                    onChange={editUserMasterFormik.handleChange}
                    onBlur={editUserMasterFormik.handleBlur}
                  />
                  <p
                    className="text-danger mb-0 text-start ps-1 pt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {editUserMasterFormik.errors.coins}
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 mt-4">
                <div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label ds_role_text"
                  >
                    Language
                  </label>
                  <select
                    className="ds_role_input w-100"
                    name="language"
                    value={editUserMasterFormik.values.language}
                    onChange={editUserMasterFormik.handleChange}
                    onBlur={editUserMasterFormik.handleBlur}
                  >
                    <option value="" selected>
                      select
                    </option>
                    {language.map((element, index) => {
                      return <option key={index}>{element?.name}</option>;
                    })}
                  </select>
                  <p
                    className="text-danger mb-0 text-start ps-1 pt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {editUserMasterFormik.errors.language}
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 mt-4">
                <div className="position-relative">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label ds_role_text"
                  >
                    Image
                  </label>
                  <input
                    type="text"
                    className="form-control ds_role_input"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  <input
                    type="file"
                    className="ds_add_master_choose"
                    name="image"
                    value={editUserMasterFormik.values.image}
                    onChange={editUserMasterFormik.handleChange}
                    onBlur={editUserMasterFormik.handleBlur}
                  />
                  <p
                    className="text-danger mb-0 text-start ps-1 pt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {editUserMasterFormik.errors.image}
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 mt-4">
                <div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label ds_role_text"
                  >
                    Status
                  </label>
                  <div className="select-wrapper position-relative">
                    <div
                      className="ds_sub_select"
                      onClick={() => setToggle2(!toggle2)}
                    >
                      {redioVal2}
                    </div>
                    {toggle2 && (
                      <div className="ds_sub_select_box">
                        <div
                          className="form-check mb-3"
                          onClick={() => {
                            setRedioVal2("Active");
                            setToggle2(false);
                          }}
                        >
                          <input
                            className="form-check-input ds_sub_check"
                            type="radio"
                            name="exampleRadios1"
                            id="exampleRadios3"
                            value="Active"
                            checked={
                              redioVal2 === "Active" && subCheck2 ? true : false
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios3"
                          >
                            Active
                          </label>
                        </div>
                        <div
                          className="form-check"
                          onClick={() => {
                            setRedioVal2("Block");
                            setToggle2(false);
                          }}
                        >
                          <input
                            className="form-check-input ds_sub_check"
                            type="radio"
                            name="exampleRadios1"
                            id="exampleRadios4"
                            value="Block"
                            checked={
                              redioVal2 === "Block" && subCheck2 ? true : false
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios4"
                          >
                            Block
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-2 pt-lg-5 pt-4 mb-lg-0 pb-4">
              <button type="submit" className="ds_role_save">
                Save
              </button>
              <button className="ds_sub_cancel">Clear</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserMaster;
